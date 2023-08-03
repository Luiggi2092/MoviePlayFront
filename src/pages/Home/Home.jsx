import React from 'react'
import "./home.css"
import SliderShow from '../../components/SliderShow/SliderShow'
import styled from "styled-components"
import { useState } from 'react'
import Modal from "../../components/ModalCreateMovie/ModalCreateMovie"
import ModalCreateSerie from "../../components/ModalCreateSerie/ModalCreateSerie";
import Navbar from "../../components/Navbar/Navbar"
const Home = () => {
  
  
  const [openModal, setOpenModal] = useState(false);
  const [openModalSerie,setOpenModalSerie] = useState(false);

  
  const handleModalMovie = () => {
    setOpenModal(!openModal);
  }

  const handleModalSerie = () => {
   setOpenModalSerie(!openModalSerie)
  }

  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  

  return (
    <div>
      <Navbar isScrolled={isScrolled} /> 
    <div className="containerHome">
      <div className="main">
      <SliderShow/>
      <div className='busqueda'>
          <h2>Busca tus peliculas y series favoritas</h2> 
          <input type='search'/>
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </button>
      </div>
      <div className='peliculas'>
         <h3 className='h3peliculas'>Peliculas Online</h3>
         <button onClick={handleModalMovie}>Nueva Pelicula</button>
         <Modal openModal={openModal} cambiarEstado={setOpenModal}></Modal>
         <button className='Mostrar'><a>Ver mas Peliculas</a></button>
      </div>
      <div className='series'>
         <h3 className='h3series'>Series Online</h3>
         <button onClick={handleModalSerie}>Nueva Serie</button>
         <ModalCreateSerie openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie}></ModalCreateSerie>
         <button className='Mostrar'><a>Ver mas Series</a></button>  
      </div>
      <div className='piedePagina'>
         
      </div>

      </div>
    </div>
      
    </div>
    
  )
}

const Title = styled.h1`
  font-size: 18px;
  font-weight:700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;


export default Home;
