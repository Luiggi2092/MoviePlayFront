import React from 'react'
import data from '../../data'
import style from './series.module.css'
import Card from '../../components/CardSerie/Card'
import { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar"

import Footer from '../../components/Footer/Footer'

const Series = () => {

  const series = data

  const [isScrolled, setIsScrolled] = useState(false)

        window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
        }

  return (
    <section className={style.containerMax}>
      <Navbar isScrolled={isScrolled} /> 
      <h1>Todas las series</h1>
      <div className={style.filters}>
        <div>
          <span>Categoría</span>
          <select>
            <option>Select categoria</option>
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
        <div className={style.paginado}>paginado</div>
        </div>

        <div className="divPaginado">

          <button className="elementoB button">Anterior</button>
          
          <p className='pPaginado'>1</p>
          <p className='pPaginado'>2</p>
          <p className='pPaginado'>3</p>
          
          <button className="elementoB button">Siguiente</button>
        
        </div>
      </div>
      <Footer/>
      </section>
  )
}

export default Series