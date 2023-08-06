import React from 'react'
import data from '../../data'
import style from './series.module.css'
import Card from '../../components/CardSerie/Card'
import Navbar from "../../components/Navbar/Navbar"
import { useDispatch,useSelector} from "react-redux"
import { useState,useEffect } from "react";
import {getGeneros} from "../../redux/actions";
import Footer from '../../components/Footer/Footer'

const Series = () => {

  const series = data

  const dispatch = useDispatch();
  const listaGenero = useSelector(state=> state.Generos.data);

  const [isScrolled, setIsScrolled] = useState(false)

        window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
        }

  useEffect(()=> {
      dispatch(getGeneros()); 

  },[])

  return (
    <section>
      <Navbar isScrolled={isScrolled} /> 
      <h1>Todas las series</h1>
      <div className={style.filters}>
        <div>
          <span>Categoría</span>
          <select>
              <option>Seleccione</option>
                  {listaGenero?.map((gen,index)=>{
                      return <option key={index}>{gen.name}</option>
                })}
          </select>
        </div>
        <div>
          <span>Año</span>
          <select>
            <option>Select año</option>
          </select>
        </div>
        <div>
          <span>Puntuación</span>
          <select>
            <option>Select Puntuación</option>
          </select>
        </div>
        <div>
          <span>Ordenamiento</span>
          <select>
            <option>select Ordenamiento</option>
          </select>
        
        </div>
      </div>
      <div className={style.Container}>
        <div className={style.serieContainer}>
          {series.map(({ id, image }) => (
          <Card key={id} id={id} image={image} />
          ))}
        </div>

        {/* <div className="divPaginado"> */}
          <div className={style.paginado}>
            
          <button className={style.button}>Anterior</button>
          
          <p className={style.paginado}>1</p>
          <p className={style.paginado}>2</p>
          <p className={style.paginado}>3</p>
          
          <button className={style.button}>Siguiente</button>
        </div>
      </div>
      {/* </div> */}
      <Footer/>
      </section>
  )
}

export default Series