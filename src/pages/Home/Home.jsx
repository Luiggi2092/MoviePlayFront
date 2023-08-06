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
      <div >
      <SliderShow/>
      
      <div className='main'>
        
            <div>
         <button onClick={handleModalMovie} className='CreateNew'>Nueva Pelicula</button>
         <Modal openModal={openModal} cambiarEstado={setOpenModal}></Modal>
         <button onClick={handleModalSerie} className='CreateNew'>Nueva Serie</button>
              <div className='modal'>
              <ModalCreateSerie  openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie}></ModalCreateSerie>
              </div>
            </div>
            <div>
              <h3 className='h3peliculas'>Peliculas y Series Online</h3>
            </div>
         <div className='containerCard'>
         {listaTodo?.map(( hom, index ) => (
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
