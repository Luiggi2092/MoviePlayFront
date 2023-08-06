import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaShoppingCart } from 'react-icons/fa';
import './navbar.css'
import Logo from "../../assets/Logo.ico.png"



const Navbar = ({ isScrolled }) => {
 
const links = [
  { name: "Home", link: "/home" },
  { name: "Movies", link: "/movies" },
  { name: "Series", link: "/series" },
  
];

  return (

<div>
<nav className={`flex ${isScrolled ? "scrolled" : ""}`} >
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
          <div className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </div>
          <input type="search" placeholder="Buscar..." />
        </div>
<div className="shopping-cart">
  <Link to="/purchase-detail">
      <FaShoppingCart />
  </Link>
</div>
</nav>
</div>
)
}

export default Navbar;