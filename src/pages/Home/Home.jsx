import React, {useState,useEffect} from 'react'
import "./home.css"
import SliderShow from '../../components/SliderShow/SliderShow'
import Card from '../../components/CardHome/CardHome'
import data from '../../data'
import {getTodo} from "../../redux/actions"
import { useSelector,useDispatch } from 'react-redux'
import styled from "styled-components"
import Modal from "../../components/ModalCreateMovie/ModalCreateMovie"
import ModalCreateSerie from "../../components/ModalCreateSerie/ModalCreateSerie";
import Navbar from "../../components/Navbar/Navbar"
import Footer from '../../components/Footer/Footer'

const Home = () => {
  
  
  const series = data
  
  const [openModal, setOpenModal] = useState(false);
  const [openModalSerie,setOpenModalSerie] = useState(false);
  const dispatch = useDispatch();
  const listaTodo = useSelector(state=> state.Todo)
  const buq = useSelector(state => state.TodoFill);

  
  useEffect(()=> {
     dispatch(getTodo());
  },[])


  console.log(listaTodo);

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
      {/* <div className='busqueda'>
          <h2>Busca tus peliculas y series favoritas</h2> 
          <input type='search'/>
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </button>
      </div> */}
      <div className='peliculas'>
         <h3 className='h3peliculas'>Peliculas y Series Online</h3>
         <button onClick={handleModalMovie} className='CreateNew'>Nueva Pelicula</button>
         <Modal openModal={openModal} cambiarEstado={setOpenModal}></Modal>
         <button onClick={handleModalSerie} className='CreateNew'>Nueva Serie</button>
         <ModalCreateSerie openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie}></ModalCreateSerie>
         <div className='containerCard'>
         {buq.length > 0 ? buq.map(( hom, index ) => (
          <Card key={index} id={hom.id} image={hom.image} />
          )) : listaTodo?.map(( hom, index ) => (
          <Card key={index} id={hom.id} image={hom.image} />
          ))}
          
        <button className='Mostrar'><a>Mostrar Mas</a></button>  
        </div>
      </div>
      </div>
    </div>
      <Footer/>
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
