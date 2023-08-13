import React, { useState } from 'react'
import { Link,Outlet,useNavigate } from "react-router-dom"
import { FaShoppingCart } from 'react-icons/fa';
import { getTodobusqueda,getTodoFillClean, bloquearAcceso } from '../../redux/actions';
import { useDispatch,useSelector} from "react-redux"
import useLocalStorage from '../../useLocalStorage';
import './navbar.css'
import Logo from "../../assets/Logo.ico.png"



const Navbar = ({ isScrolled }) => {

  const cartCount = useSelector((state) => state.cartCount)

const [busqueda,setbusqueda] = useState({
       search:""
}); 
const dispatch = useDispatch();
const buq = useSelector(state => state.TodoFill);
const navegate = useNavigate();

const links = [
  { name: "Home", link: "/home" },
  { name: "Movies", link: "/movies" },
  { name: "Series", link: "/series" },
  { name: "Dashboard", link: "/DashboardAdmin/content1"}
  
];


  const busquedanav = ()=> {
      if(busqueda.search){
          dispatch(getTodobusqueda(busqueda.search));
      }else{
          dispatch(getTodoFillClean());
      } 
      
      navegate("/home");
  }


  const ChangeHandle =(e)=> {
      const property = e.target.name;
      const value = e.target.value;

      setbusqueda({...busqueda
                ,[property]:value})


  }

  const cerrarSesion = () => {
    localStorage.clear()
    dispatch(bloquearAcceso())
  }

  const nombre = localStorage.getItem('name')
  const foto = localStorage.getItem('foto')


  return (

    <main>
      
      <div> 
        
        <nav className={`flex ${isScrolled ? "scrolled nav" : "nav"} nav`} >
        
        <div className="left flex a-center">
        
        <div className="brand flex a-center j-center">
          <img src={Logo} alt='logo.ico.png'/>    
        </div>

      <ul className='links flex'>
        {links.map(({name, link})=> {

          return(

          <li key={name}><Link to={link}>{name}</Link></li>
        );
      })}
      </ul>
      
      </div>
        
        <div className='buqNav'>
        
          <input type='search' placeholder='Buscar...' name="search" onChange={ChangeHandle}/>
        
          <button onClick={busquedanav} className='BotSearch'>
              
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        
        </div>
      
      <div className="shopping-cart">
      
        <Link to="/purchase-detail">
            <FaShoppingCart />
            <span className="cart-count">{'('}{cartCount}{')'}</span>
        </Link>

        <div className='usuario'>
            <p className='NombreUser'>{nombre}</p>
            <img src={foto} alt='' className='imgUser' />
        </div>
        <Link to='/'>
              <button className='buttonCerreSesionNav' onClick={cerrarSesion}>Cerrar Sesion</button>
            </Link>
      </div>
      
    </nav>
      
    </div>
      
    <Outlet/>
  </main>
)
}

export default Navbar;