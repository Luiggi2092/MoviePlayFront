import style from './card.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeartPulse } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de pulgar arriba
import { toggleFavoritSerie, rateMovie,AgregarAFavoritos, EliminarFav } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAndSaveDetailsSerie, removeFromCartAndRemoveDetailsSerie, todosLosProductosXidUser, fetchCartContent} from '../../redux/actions';
import Swal from 'sweetalert2';
import useFetch from '../../assets/useFetch';

const Card = ({ image, id, price, name, calif }) => {
  const user = localStorage.getItem('email');
  const dispatch = useDispatch();
  const propiedades = { image, id, price, name };
  const [activo,setActivo] = useState(false);


  const [form,setForm] = useState({
       email: "",
       idSerie:""
  })


  const isFavorite = useSelector(state => state.favoriteSeries.includes(id));
  const [rating, setRating] = useState(0);

  const handleFavoriteClick = () => {
    dispatch(toggleFavoritSerie(id));

      setForm({
        ...form,
        email:user,
        idSerie:id
      })

      if(!isFavorite){
          
        setActivo(true);

     }else{
         setActivo(false);
     }


  };


  console.log(isFavorite);

   useEffect(()=> {
       if(activo){
        dispatch(AgregarAFavoritos(form));  
       }else{
         dispatch(EliminarFav(user,null,form.idSerie))  
       }
      
        

   },[isFavorite])




  const handleRating = newRating => {
    dispatch(rateMovie(id, newRating)); // Actualiza la calificación en el estado
  };


  const idUser = localStorage.getItem('id')
  const carrito = useSelector(state => state.carrito)
  const compras = useSelector(state => state.productosComprados)
  const seriesCarrito = carrito.Series
  const seriesCompradas = compras.series
  const isAddedToCart = seriesCarrito && seriesCarrito.some(producto => producto.seriesXcarro.serieId === id);
  const isPurchased = seriesCompradas && seriesCompradas.some(producto => producto.id === id);
  const [serieAgregada, setSerieAgregada] = useState(isAddedToCart)


  //console.log(isFavorite);

  const handleclick = () => {
    if (serieAgregada) {
      dispatch(removeFromCartAndRemoveDetailsSerie(id, user));
      setSerieAgregada(false)
      Swal.fire({
        title: `Artículo eliminado del carrito`,
        icon: 'success'
      });

    } else {
      // Producto no en el carrito ni comprado, agregar al carrito
      dispatch(addToCartAndSaveDetailsSerie(propiedades, user));      
      setSerieAgregada(true)
      Swal.fire({
        title: `Artículo agregado al carrito`,
        icon: 'success'
      });
    }
  };
  
  //use Effect
 useEffect(() => {
  dispatch(fetchCartContent(user))
 }, [isAddedToCart])


  return (
    <div className={style.containerMax}>
      <Link to={`/detailSeries/${id}`}>
        <img src={image} className={style.image} alt={`Movie ${id}`} />
      </Link>
      <div className={style.iconsContainer}>
        <FontAwesomeIcon
          icon={faHeartPulse} // Cambio a icono de pulgar arriba
          className={style.icon}
          onClick={handleFavoriteClick}
          style={{ color: isFavorite ? 'red' : 'blue' }}
        />
        {
        <div className={style.rating}>
          {calif == 0 ?<></>: [1, 2, 3, 4, 5].map(value => (
            <FontAwesomeIcon
              key={value}
              icon={faStar}
              className={style.ratingStar}
              style={{ color: value <= calif ? '#f1d237' : '#d3d3d3' }}
            />
          ))}
        </div>
        }
      </div>
      {isPurchased ? ( // Si es comprado, muestra "Ver Película"
      <Link to={`/detailSeries/${id}`}>
        <button className={style.ver}>Ver Serie</button>
      </Link>
    ) : (
      <button
        className={serieAgregada  ? style.quitar : style.agg}// Usa className condicionalmente
        onClick={handleclick}
      >
        {serieAgregada  ? 'Quitar del Carrito' : `$${price} - Agregar al Carrito`}
      </button>
    )}
    </div>
  );
};

export default Card;




