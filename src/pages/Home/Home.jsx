import React, {useState,useEffect} from 'react'
import "./home.css"
import SliderShow from '../../components/SliderShow/SliderShow'
import CardMov from '../../components/CardMovie/CardMovie'
import CardSer from '../../components/CardSerie/Card'
import data from '../../data'
import {getTodo,getTodoFillClean} from "../../redux/actions"
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
  const [cantCard,setCanCard] = useState(12);
  const dispatch = useDispatch();
  const listaTodo = useSelector(state=> state.Todo)
  const buq = useSelector(state => state.TodoFill);

  
  useEffect(()=> {
     dispatch(getTodoFillClean());
     dispatch(getTodo());
  },[])



  const handleModalMovie = () => {
    setOpenModal(!openModal);
  }

  const handleModalSerie = () => {
   setOpenModalSerie(!openModalSerie)
  }

  const AmpliarCards = ()=> {
    setCanCard(15);
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
          
         {buq.length > 0 ? buq.map(( hom, index ) => (
          <CardMov key={index} id={hom.id} image={hom.image} tipo={hom.tipo} />
          )) : listaTodo?.map(( hom, index ) => (
          <CardMov key={index} id={hom.id} image={hom.image} tipo={hom.tipo} />
          )).slice(0,cantCard)}
            
      <button className='Mostrar' onClick={AmpliarCards}>Mostrar Mas</button>
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
