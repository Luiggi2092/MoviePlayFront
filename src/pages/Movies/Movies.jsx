import React from 'react'
import style from './movies.module.css'
import Card from '../../components/CardMovie/CardMovie';
import data from '../../data';

const Movies = () => {

  const peliculas = data
  

  return (
    <section className={style.containerMax}>
      <h1 className={style.allmovies}>Todas las peliculas</h1>
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
        <div className={style.peliculaContainer}>
          {peliculas.map(({ id, image }) => (
          <Card key={id} id={id} image={image} />
          ))}
        <div className={style.paginado}>paginado</div>
        </div>
      </div>
      
    </section>
  )
}

export default Movies