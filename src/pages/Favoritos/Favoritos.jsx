import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import CardMovie from '../../components/CardMovie/CardMovie';
import Card from '../../components/CardSerie/Card';
import style from './favoritos.module.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Favoritos = () => {

  const favoriteMovies = useSelector(state => state.favoriteMovies);
  const movieRatings = useSelector(state => state.movieRatings);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
    }
  }, []);

  return (
    <div className={style.favorites}>
      <h1 className={style.h1Fav}>Mi Lista</h1>
      <Link className={style.barra} to="/home">←</Link> 
      <div className={style.containFav}>
        <Slider {...settings}>
          {favoriteMovies.map(movieId => (
            <div key={movieId} className={style.cardSlide}>
              <CardMovie id={movieId} movieId={movieId} rating={movieRatings[movieId]} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Favoritos
