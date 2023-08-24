import React, { useState, useEffect} from 'react';
import { FiHome, FiFilm, FiTv, FiSearch, FiShoppingCart, FiUser, FiStar } from 'react-icons/fi';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getTodobusqueda,getTodoFillClean,getTodobusquedaAdm,getTodoFillCleanAdm, fetchCartContent, getUserAdmin,getTodoBusqedaAdmSeries} from "../../redux/actions"
import Logo from '../../assets/Logo.ico.png';
import './navbar.css';



const Navbar = ({ isScrolled }) => {

  
  const data = useParams();

  const [busqueda, setBusqueda] = useState({
    search: '',
  });
  const dispatch = useDispatch();
  const navegate = useNavigate();

  const isAdmin = useSelector((state) => state.isAdmin); // Cambia esto según tu estado actual
  
  const profileImage = localStorage.getItem('profileImage') || "default-profile-image-url";
  const nombre = localStorage.getItem('name')
  const foto = localStorage.getItem('foto')
  const user = localStorage.getItem('email')

  
  
  const links = [
    { name: 'Home', link: '/home', icon: <FiHome /> },
    { name: 'Películas', link: '/peliculas', icon: <FiFilm /> },
    { name: 'Series', link: '/series', icon: <FiTv /> },
    { name: 'Favoritos', link: '/favoritos', icon: <FiStar /> },
  ];
  
  const admin = localStorage.getItem("rol");
  const email = localStorage.getItem("email");
  
  if (admin == "Administrador" || email == "moviesplay@gmail.com") {
    links.push({ name: 'Dashboard', link: '/DashboardAdmin/content1', icon: <FiUser /> });
  } //para que aparezca solo en admin
  
  const busquedaNav = () => {
    if (busqueda.search) {
      dispatch(getTodobusqueda(busqueda.search));

      if(data.contentId == "content2"){
        
        dispatch(getTodobusquedaAdm(busqueda.search));
        
        dispatch(getTodoFillCleanAdm());

      } else if (data.contentId == "content4") {
        
        dispatch(getUserAdmin(busqueda.search)) 
        
      
      } else if (data.contentId == "content3"){
         
        dispatch(getTodoBusqedaAdmSeries(busqueda.search))
        
        dispatch(getTodoFillCleanAdm());

      } else{
        
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
  
  useEffect(()=>{
    dispatch(fetchCartContent(user))
  },[dispatch]);

const carrito = useSelector((state) => state.carrito);
const [contadorDelCarrito, setContadorDelCarrito] = useState(0);

useEffect(() => {
  const totalItems = (carrito.Multimedia?.length || 0) + (carrito.Series?.length || 0);
  setContadorDelCarrito(totalItems);
}, [carrito]);
  
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
          <span className="cart-count">{'('}{contadorDelCarrito}{')'}</span>
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
            <button onClick={cerrarSesion}>Cerrar Sesión</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





