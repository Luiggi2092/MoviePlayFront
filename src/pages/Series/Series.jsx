import React from 'react'
// import data from '../../data'
import style from './series.module.css'
import Card from '../../components/CardSerie/Card'
import Navbar from "../../components/Navbar/Navbar"
import { useDispatch,useSelector} from "react-redux"
import { useState,useEffect } from "react";
import {getGeneros, getSeries, getSeriesPage, getGenerosSeries, getPrecioSeries, getAlfaSeries} from "../../redux/actions";
import Footer from '../../components/Footer/Footer'

const Series = () => {

  const dispatch = useDispatch();

  const listaGenero = useSelector(state=> state.Generos.data);
  const series = useSelector(state => state.Series)

  const [cat, setCat] = useState('')
  const [precio, setPrecio] = useState('')
  const [alfa, setAlfa] = useState('') 


  const [isScrolled, setIsScrolled] = useState(false)
  window.onscroll = () => {
  setIsScrolled(window.pageYOffset === 0 ? false : true);
  return () => (window.onscroll = null);
  }



  useEffect(()=> {
      dispatch(getGeneros()); 
      dispatch(getSeries())
  },[])

  

  const handlePreviousPage = () => { 
    dispatch(getSeriesPage(1))
  };

  const handleNextPage = () => {
    dispatch(getSeriesPage(2))
  };

  const handleGen = (event) => {
    if (event.target.value === 'Restaurar') dispatch(getSeries())
    else dispatch(getGenerosSeries(event.target.value))
  }

  const handlePrecio = (event) => {
    if (event.target.value === 'Restaurar') dispatch(getSeries())
    else dispatch(getPrecioSeries(event.target.value))
  }

  const handleAlfa = (event) => {
    if (event.target.value === 'Restaurar') dispatch(getSeries())
    else dispatch(getAlfaSeries(event.target.value))
  }

  return (
    <section className={style.containerMax}>
      
      <Navbar isScrolled={isScrolled} /> 
      
      <h1>Todas las series</h1>
      
      <div className={style.filters}>
        
        <div>
          <span>Categoría</span>
          <select onChange={handleGen}>
              <option defaultChecked hidden>Seleccionar</option>
              <option value="Restaurar">Restaurar</option>
              {listaGenero?.map((gen,index)=>{
                return <option key={index} value={gen.name}>{gen.name}</option>
              })}
          </select>
        </div>
        
        <div>
          <span>Precio</span>
          <select onChange={handlePrecio}>
            <option defaultChecked hidden>Seleccionar</option>
            <option value="Restaurar">Restaurar</option>
            <option value='up'>Min - Max</option>
            <option value='down'>Max - Min</option>
          </select>
        </div>
        
        <div>
          <span>Ordenamiento</span>
          <select onChange={handleAlfa}>
            <option defaultChecked hidden>Seleccionar</option>
            <option value="Restaurar">Restaurar</option>
            <option value='up'>A - Z</option>
            <option value='down'>Z - A</option>
          </select>
        
        </div>
      
      </div>
      
      <div className={style.Container}>
      
        <div className={style.serieContainer}>

          {
            series?.map((element, index) => (
              <Card key={index} id={index} image={element.image} />
          ))}

        </div>

        <div className={style.divPaginado}>
          <button className={style.elementoB} onClick={() => handlePreviousPage(1)}>Anterior</button> 
          <button className={style.elementoB} onClick={() => handleNextPage(2)}>Siguiente</button>
        </div>
        
      </div>
      
      <Footer/>
      
    </section>
  )
}

export default Series