import React, { useState, useEffect} from 'react';
import { FiHome, FiFilm, FiTv, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getTodobusqueda,getTodoFillClean,getTodobusquedaAdm,getTodoFillCleanAdm, fetchCartContent} from "../../redux/actions"
import Logo from '../../assets/Logo.ico.png';
import './navbar.css';



const Navbar = ({ isScrolled }) => {

  
  const data = useParams();

  console.log(data);

  const [busqueda, setBusqueda] = useState({
    search: '',
  });
  const dispatch = useDispatch();
  const navegate = useNavigate();

  const isAdmin = useSelector((state) => state.isAdmin); // Cambia esto según tu estado actual
  
  
  const nombre = localStorage.getItem('name')
  const foto = localStorage.getItem('foto')
  const user = localStorage.getItem('email')
  
  const links = [
    { name: 'Home', link: '/home', icon: <FiHome /> },
    { name: 'Peliculas', link: '/peliculas', icon: <FiFilm /> },
    { name: 'Series', link: '/series', icon: <FiTv /> },
  ];
  
  // const admin = localStorage.getItem("email");
  const admin = "moviesplay@gmail.com"
  console.log(admin);
  
  if (admin == "moviesplay@gmail.com") {
    links.push({ name: 'Dashboard', link: '/DashboardAdmin/content1', icon: <FiUser /> });
  } //para que aparezca solo en admin
  
  const busquedaNav = () => {
    if (busqueda.search) {
      dispatch(getTodobusqueda(busqueda.search));

      if(data.contentId == "content2"
      ){
        dispatch(getTodobusquedaAdm(busqueda.search));
        

      }else{
        
      navegate('/home'); // redirigir a una página de resultados de búsqueda
      
    }
    } else {
      dispatch(getTodoFillClean());
      dispatch(getTodoFillCleanAdm());
        
    }
  };
  
  const changeHandle = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    
    setBusqueda({
      ...busqueda,
      [property]: value,
    });
  };
  
  const cerrarSesion = () => {
    localStorage.clear();
  };
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  
  //Contador del carrito
  // useEffect(()=>{
  //   dispatch(fetchCartContent(user))
  // },[dispatch]);
  // const carrito = useSelector((state) => state.carrito)  ;
  // const contadorDelCarrito = (carrito.Multimedia?.length || 0) + (carrito.Series?.length || 0);
  
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">
        <img src={Logo} alt="logo.ico.png" />
        </Link>
      </div>
      <div className="nav-items">
        {links.map((link) => (
          <Link to={link.link} className="nav-item" key={link.name}>
            {link.icon} {link.name}
          </Link>
        ))}
        <input
          type="search"
          placeholder="Buscar..."
          name="search"
          value={busqueda.search}
          onChange={changeHandle}
        />
        <div className="nav-item">
          <FiSearch onClick={busquedaNav} />
        </div>
        <div className="nav-item">
          <Link to="/purchase-detail">
            <FiShoppingCart />
          </Link>
          <span className="cart-count">{'('}{0}{')'}</span>
        </div>
        <div>
          <img src={foto} alt="" className='logo-foto' />
          <h5 className='nav-name'>{nombre}</h5>
        </div>
        <div className={`nav-item profile ${showProfileMenu ? 'active' : ''}`} onClick={toggleProfileMenu}>
          <FiUser />
          <div className={`profile-menu ${showProfileMenu ? 'show' : ''}`}>
            <Link to="/profile" >Perfil</Link>
            <Link to='/'> 
            <button onClick={cerrarSesion}>Cerrar Sesion</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






