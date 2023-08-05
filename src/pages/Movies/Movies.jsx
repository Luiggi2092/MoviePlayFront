import React, {useState,useEffect} from 'react'
import style from './movies.module.css'
import Card from '../../components/CardMovie/CardMovie';
import {getMovies} from "../../redux/actions"
import {useSelector,useDispatch} from "react-redux"
import data from '../../data';
import Navbar from "../../components/Navbar/Navbar"
import Footer from '../../components/Footer/Footer';

const Movies = () => {

  const peliculas = data

  const dispatch = useDispatch();
  const listaMovie = useSelector(state=> state.Media);
  
  
  useEffect(()=> {
       dispatch(getMovies());
  },[])


  listaMovie.data?.map((e,index)=> {
       console.log(e);
   })

  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }
  

  return (
  
    <section className={style.containerMax}>
      <Navbar isScrolled={isScrolled} /> 
      <h1 className={style.allmovies}>Todas las peliculas</h1>
      <div className={style.filters}>
        <div>
            <span>Categoría</span>
            <select className={style.select1}>
              <option>Select categoria</option>
          </select>
        </div>
        <div>
          <span>Año</span>
          <select className={style.select1}>
              <option className={style.p1}>Select año</option>
          </select>
        </div>
        <div>
          <span>Puntuación</span>
            <select className={style.select1}>
              <option className={style.p1}>Select Puntuación</option>
          </select>
        </div>
        <div>
          <span>Ordenamiento</span>
            <select className={style.select1}>
              <option className={style.p1}>select Ordenamiento</option>
          </select>
        </div>
      </div>
      <div className={style.Container}>
        <div className={style.peliculaContainer}>
          {listaMovie.data?.map((image, index) => (
            
            <Card key={index} id={image.id} image={image.image} />
          ))}
          <div className={style.paginado}>paginado</div>
        </div>
      </div>
      <Footer/>
    </section>
   
  )
}

export default Movies