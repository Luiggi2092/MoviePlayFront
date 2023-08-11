import React, {useState,useEffect} from 'react'
import "./home.css"
import SliderShow from '../../components/SliderShow/SliderShow'
import CardMov from '../../components/CardMovie/CardMovie'
import CardSer from '../../components/CardSerie/Card'
import data from '../../data'
import {getTodo,getTodoFillClean} from "../../redux/actions"
import { useSelector,useDispatch } from 'react-redux'
import styled from "styled-components"
import Navbar from "../../components/Navbar/Navbar"
import Footer from '../../components/Footer/Footer'
import Loading from "../../components/Loading/Loading";


const Home = () => {
  
  
  const series = data
  
  const [cantCard,setCanCard] = useState(12);
  const dispatch = useDispatch();
  const [showMoreButton, setShowMoreButton] = useState(true);
  const listaTodo = useSelector(state=> state.Todo)
  const buq = useSelector(state => state.TodoFill);


  
  useEffect(()=> {
     dispatch(getTodoFillClean());
     dispatch(getTodo());
  },[])




  const AmpliarCards = ()=> {
    setCanCard(15);
    setShowMoreButton(false)
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
              <h3 className='h3peliculas'>Peliculas y Series Online</h3>
            </div>
         <div className='containerCard'>
          
         {buq.length > 0 ? buq.map(( hom, index ) => (
          hom.tipo == "Pelicula" ?
          <CardMov key={index} id={hom.id} image={hom.image} tipo={hom.tipo} />:
          <CardSer key={index} id={hom.id} image={hom.image} tipo={hom.tipo}/>
          )) : listaTodo?.map(( hom, index ) => (
            hom.tipo == "Pelicula" ?
          <CardMov key={index} id={hom.id} image={hom.image} tipo={hom.tipo} />:
          <CardSer key={index} id={hom.id} image={hom.image} tipo={hom.tipo}/>
          )).slice(0,cantCard)}
          {listaTodo.length == 0 && <Loading/>}
            
          {showMoreButton && <button className='Mostrar' onClick={AmpliarCards}>Mostrar Mas</button>}
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
