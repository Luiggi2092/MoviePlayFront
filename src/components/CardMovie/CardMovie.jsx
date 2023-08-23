import style from './card.module.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { addToCartAndSaveDetailsMovie, toggleFavorite, rateMovie, removeFromCartAndRemoveDetailsMovie } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Card = ({ id, image, price, name, movieRating }) => {
    const user = localStorage.getItem('email');
    const carrito = useSelector(state => state.carrito);
    const compras = useSelector(state => state.productosComprados);
    const multimedia = carrito.Multimedia;
    const peliculas = compras.peliculas;
    const isAddedToCart = multimedia && multimedia.some(producto => producto.peliculasXcarro.multimediaId === id);
    const isPurchased = peliculas && peliculas.some(producto => producto.id === id);
    const [peliculaAgregada, setPeliculaAgregada] = useState(isAddedToCart)
    const dispatch = useDispatch();
    const [lediClick,setleDiClick] = useState(false);
    const propiedades = { id, price, name };

    //const isFavorite = useSelector(state => state.favoriteMovies.includes(id));
    const rating = useSelector(state => state.movieRatings[id] || 0);

    let emai = localStorage.getItem('email')


    const [form,setForm]= useState({
          email: "",
          idMovie: ""
    })


    useEffect(()=> {
         
            
        setForm({...form,email:emai,idMovie:id})
        setleDiClick(false)
        

    },[] )

    const handleFavoriteClick = () => {
        //dispatch(toggleFavorite(id));
       // setleDiClick(true)
        if(form.email &&
           form.idMovie){
             dispatch(AgregarAFavoritos(form))
           }else{
              console.log("algo paso");
           }

    };

    const handleRating = newRating => {
        dispatch(rateMovie(id, newRating)); // Actualiza la calificación en el estado
    };

    const handleclick = () => {
        if (peliculaAgregada) {
            dispatch(removeFromCartAndRemoveDetailsMovie(id, user));
            setPeliculaAgregada(false)
            Swal.fire({
                title: `Artículo eliminado del carrito`,
                icon: 'success'
            });
        } else {
            // Producto no en el carrito ni comprado, agregar al carrito
            dispatch(addToCartAndSaveDetailsMovie(propiedades, user));
            setPeliculaAgregada(true)
            Swal.fire({
                title: `Artículo agregado al carrito`,
                icon: 'success'
            });
        }
    };

    useEffect(() => {
    dispatch(fetchCartContent(user))
    }, [isAddedToCart])

    return (
        <div className={style.containerMax}>
            <Link to={`/moviesdetail/${id}`}>
                <img src={image} className={style.image} alt={`Movie ${id}`} />
            </Link>
            <div className={style.iconsContainer}>
                <FontAwesomeIcon
                    icon={faHeartPulse}
                    className={style.icon}
                    onClick={handleFavoriteClick}
                    //style={/*{ color: isFavorite ? 'red' : 'blue' }*/}
                />
            </div>
            {isPurchased ? ( // Si es comprado, muestra "Ver Película"
            <Link to={`/moviesdetail/${id}`}>
                <button className={style.ver}>Ver Pelicula</button>
            </Link>
            ) : (
                <button
                className={peliculaAgregada  ? style.quitar : style.agg}// Usa className condicionalmente
                onClick={handleclick}
                >
            {peliculaAgregada  ? 'Quitar del Carrito' : `$${price} - Agregar al Carrito`}
                </button>
            )}
            </div>
    );
};

export default Card;


