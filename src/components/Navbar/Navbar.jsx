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