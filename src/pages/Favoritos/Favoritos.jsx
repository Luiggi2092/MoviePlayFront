import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import CardMovie from '../../components/CardMovie/CardMovie';
import Card from '../../components/CardSerie/Card';
import style from './favoritos.module.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import {ObtenerFavoritos} from "../../redux/actions"

const Favoritos = () => {

  const favoriteMovies = useSelector(state => state.GETFAV);
  const favoriteSeries = useSelector(state => state.GETFAVSER);
    
  //const movieRatings = useSelector(state => state.OBFAV);
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  const dispatch = useDispatch();
  //const allFavorites = [...new Set([...storedFavorites, ...favoriteMovies])];

  const email= localStorage.getItem('email')
  
  useEffect(()=> {
    dispatch(ObtenerFavoritos(email))
  },[])



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };



  //const isFavorite = useSelector(state => state.favoriteMovies.includes(id));
  


  return (
    <div className={style.favorites}>
      <h1 className={style.h1Fav}>Favoritos</h1>
      <Link className={style.barra} to="/home"> ← </Link> 
      <div className={style.containFav}>
        <h3>Movies</h3>
          {favoriteMovies?.map((movieId,index) => (
            <div key={index} className={style.cardSlide}>
              <CardMovie id={movieId.favsMoviesXUser.MultimediaId} image={movieId.image} tipo={movieId.tipo} price={movieId.price}    />
            </div>
          ))}
         <h3>Series</h3> 
          {favoriteSeries?.map((SerieId,index) => (
            <div key={index} className={style.cardSlide}>
            <Card id={SerieId.uid} image={SerieId.image} price={SerieId.price}></Card>

            </div>
          ))}
          
      </div>
    </div>
  );
};

export default Favoritos
