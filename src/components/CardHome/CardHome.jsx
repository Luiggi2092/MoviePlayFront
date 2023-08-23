import style from './CardHome.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTheaterMasks, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import cardMovie from '../../components/CardMovie/CardMovie';
import { addToCartAndSaveDetailsMovie, toggleFavorite, rateMovie } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const CardHome = ({ image, id, tipo, price }) => {

    const user = localStorage.getItem('email');
    const dispatch = useDispatch();
    const propiedades = { image, id, price, name };

    const isFavorite = useSelector(state => state.favoriteMovies.includes(id));
    const rating = useSelector(state => state.movieRatings[id] || 0);

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
        <div>
            <Link to={tipo === 'Peliculas' ? `/moviesdetail/${id}` : `/detailSeries/${id}`}>
                <div className={style.containerMax}>
                    <img className={style.image} src={image} alt={`Movie or series ${id}`} />
                </div>
            </Link>
            <div className={style.iconsContainer}>
                <FontAwesomeIcon
                    icon={faHeartPulse} 
                    className={style.icon}
                    onClick={handleFavoriteClick}
                    style={{ color: isFavorite ? 'red' : 'blue' }}
                />
            </div>
            <button className={style.agg} onClick={handleclick}>
                ${price} - Agregar al Carrito
            </button>
        </div>
    )
}
export default CardHome;
