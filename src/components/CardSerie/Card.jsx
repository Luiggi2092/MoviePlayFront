import style from './card.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de pulgar arriba
import { toggleFavorite, rateMovie } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAndSaveDetailsSerie, removeFromCartAndRemoveDetailsSerie, todosLosProductosXidUser, fetchCartContent} from '../../redux/actions';
import Swal from 'sweetalert2';
import useFetch from '../../assets/useFetch';

const Card = ({ image, id, price, name }) => {
  // const user = localStorage.getItem('email');
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


  const user = localStorage.getItem('email');
  const idUser = localStorage.getItem('id')
  const carrito = useSelector(state => state.carrito)
  const compras = useSelector(state => state.productosComprados)
  const seriesCarrito = carrito.Series
  const seriesCompradas = compras.series
  const isAddedToCart = seriesCarrito && seriesCarrito.some(producto => producto.seriesXcarro.serieId === id);
  const isPurchased = seriesCompradas && seriesCompradas.some(producto => producto.id === id);
  const [buttonStateAdd, setButtonStateAdd] = useState(false);
  const [buttonStateRemove, setButtonStateRemove] = useState(false);
  const [serieAgregada, setSerieAgregada] = useState(isAddedToCart)

  const handleclick = () => {
    if (isAddedToCart) {
      dispatch(removeFromCartAndRemoveDetailsSerie(id, user));
      setButtonStateRemove(true)
      setButtonStateAdd(false)
      setSerieAgregada(false)
      Swal.fire({
        title: `Artículo eliminado del carrito`,
        icon: 'success'
      });

    } else {
      // Producto no en el carrito ni comprado, agregar al carrito
      dispatch(addToCartAndSaveDetailsSerie(propiedades, user));
      setButtonStateAdd(true)
      setButtonStateRemove(false)
      setSerieAgregada(true)
      Swal.fire({
        title: `Artículo agregado al carrito`,
        icon: 'success'
      });

    }
  };

  

  useEffect(() => {
    if (buttonStateAdd) {
      dispatch(todosLosProductosXidUser(idUser)).then(() => {
        dispatch(fetchCartContent(user));
        setButtonStateRemove(false);
      });
    }
  }, [buttonStateAdd]);

  useEffect(() => {
    if(buttonStateRemove){      
      dispatch(todosLosProductosXidUser(idUser))
      dispatch(fetchCartContent(user))
      setButtonStateAdd(false)
    }

  },[buttonStateRemove])


  return (
    <div className={style.containerMax}>
      <Link to={`/detailSeries/${id}`}>
        <img src={image} className={style.image} alt={`Movie ${id}`} />
      </Link>
      <div className={style.iconsContainer}>
        <FontAwesomeIcon
          icon={faThumbsUp} // Cambio a icono de pulgar arriba
          className={style.icon}
          onClick={handleFavoriteClick}
          style={{ color: isFavorite ? 'red' : 'blue' }}
        />
        {/* <div className={style.rating}>
          {[1, 2, 3, 4, 5].map(value => (
            <FontAwesomeIcon
              key={value}
              icon={faStar}
              className={style.ratingStar}
              style={{ color: value <= rating ? 'yellow' : 'blue' }}
              onClick={() => handleRating(value)}
            />
          ))}
        </div> */}
      </div>
      {isPurchased ? ( // Si es comprado, muestra "Ver Película"
      <Link to={`/detailSeries/${id}`}>
        <button className={style.ver}>Ver Serie</button>
      </Link>
    ) : (
      <button
        className={serieAgregada && isAddedToCart ? style.quitar : style.agg}// Usa className condicionalmente
        onClick={handleclick}
      >
        {isAddedToCart && serieAgregada ? 'Quitar del Carrito' : `$${price} - Agregar al Carrito`}
      </button>
    )}
    </div>
  );
};

export default Card;




