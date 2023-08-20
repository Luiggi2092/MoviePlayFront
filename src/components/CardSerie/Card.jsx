import style from './card.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de pulgar arriba
import { addToCartAndSaveDetailsMovie, toggleFavorite, rateMovie } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Card = ({ image, id, price, name }) => {
  const user = localStorage.getItem('email');
  const dispatch = useDispatch();
  const propiedades = { image, id, price, name };

  const isFavorite = useSelector(state => state.favoriteMovies.includes(id));
  const [rating, setRating] = useState(0);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  const handleRating = newRating => {
    dispatch(rateMovie(id, newRating)); // Actualiza la calificación en el estado
  };

  const handleclick = () => {
    dispatch(addToCartAndSaveDetailsMovie(propiedades, user));

    Swal.fire({
      title: `Artículo agregado al carrito`,
      icon: 'success'
    });

    setTimeout(() => {
      window.location.reload(false);
    }, 1500); // 1.5 segundos
  };

  return (
    <div className={style.containerMax}>
      <Link to={`/moviesdetail/${id}`}>
        <img src={image} className={style.image} alt={`Movie ${id}`} />
      </Link>
      <div className={style.iconsContainer}>
        <FontAwesomeIcon
          icon={faThumbsUp} // Cambio a icono de pulgar arriba
          className={style.icon}
          onClick={handleFavoriteClick}
          style={{ color: isFavorite ? 'red' : 'blue' }}
        />
        <div className={style.rating}>
          {[1, 2, 3, 4, 5].map(value => (
            <FontAwesomeIcon
              key={value}
              icon={faStar}
              className={style.ratingStar}
              style={{ color: value <= rating ? 'yellow' : 'blue' }}
              onClick={() => handleRating(value)}
            />
          ))}
        </div>
      </div>
      <button className={style.agg} onClick={handleclick}>
        ${price} - Agregar al Carrito
      </button>
    </div>
  );
};

export default Card;




