import React from 'react'
import style from './movies.module.css'

const Movies = () => {
  return (
    <section className={style.containerMax}>
      <div className={style.filters}>
        <div>
          <span>Categoria</span>
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
      <div className={style.cardContainer}>
        <h1>Aqui van las peliculas</h1>
        <div>paginado</div>
      </div>
      
    </section>
  )
}

export default Movies