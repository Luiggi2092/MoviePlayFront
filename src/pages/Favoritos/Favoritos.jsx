import React, { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import CardMov from '../../components/CardMovie/CardMovie';
import CardSer from '../../components/CardSerie/Card';
import style from './favoritos.module.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import {ObtenerFavoritos} from "../../redux/actions"
import Footer from '../../components/Footer/Footer'
import Navbar from './../../components/Navbar/Navbar';

const Favoritos = () => {

  const favorites = useSelector(state => state.GETFAV);
  //const favoriteSeries = useSelector(state => state.GETFAVSER);
    
  //const movieRatings = useSelector(state => state.OBFAV);
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  const dispatch = useDispatch();
  //const allFavorites = [...new Set([...storedFavorites, ...favoriteMovies])];

  const email= localStorage.getItem('email')
  
  useEffect(()=> {
    dispatch(ObtenerFavoritos(email))
  },[favorites])



  //const isFavorite = useSelector(state => state.favoriteMovies.includes(id));
  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }


  return (
    <>
      <Navbar isScrolled={isScrolled} />
    <div className={style.favorites}>
      
      <h1 className={style.h1Fav}>Favoritos</h1>
      <Link className={style.barra} to="/home"> ← </Link> 
      <div className={style.containFav}>
      {favorites?.map(( hom, index ) => (
            hom.tipo == "Pelicula" ?
          <CardMov key={index} id={hom.id} image={hom.image} tipo={hom.tipo} price={hom.price} calif={hom.calificacion}/>:
          <CardSer key={index} id={hom.id} image={hom.image} tipo={hom.tipo} price={hom.price} calif={hom.calificacion}/>
          )) }
      </div> 
    </div>
      <Footer />
    </>

  );
};

export default Favoritos
