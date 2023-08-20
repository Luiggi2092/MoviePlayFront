import style from './card.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { addToCartAndSaveDetailsMovie, fetchCartContent, todosLosProductosXidUser,removeFromCartAndRemoveDetailsMovie } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Card = ({ image, id, price, name }) => {
    const user = localStorage.getItem('email');
    const dispatch = useDispatch();
    const propiedades = { image, id, price, name };
    const carrito = useSelector(state => state.carrito)
    const compras = useSelector(state => state.productosComprados)
    // console.log(compras)

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
    
    useEffect(() => {
        dispatch(fetchCartContent(user))
    }, [])

    useEffect(() => {
        dispatch(todosLosProductosXidUser(1))
    },[])

    return (
        <div className={style.containerMax}>
            <Link to={`/moviesdetail/${id}`}>
                <img src={image} className={style.image} alt={`Movie ${id}`} />
            </Link>
            <div className={style.iconsContainer}>
                <FontAwesomeIcon icon={faStar} className={style.icon} />
                <FontAwesomeIcon icon={faThumbsUp} className={style.icon} />
                <FontAwesomeIcon icon={faThumbsDown} className={style.icon} />
                
            </div>
            <button className={style.agg} onClick={handleclick}>
                ${price} - Agregar al Carrito
            </button>
        </div>
    );
};

export default Card;
