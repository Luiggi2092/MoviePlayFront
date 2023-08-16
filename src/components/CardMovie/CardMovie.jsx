import style from './card.module.css'
import { Link } from 'react-router-dom'
import {addToCartAndSaveDetailsMovie} from '../../redux/actions'
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"
import Swal from 'sweetalert2'

const reload = () => {
    window.location.reload(false);
}

const Card = ({image, id, price, name}) => {

    const user = localStorage.getItem('email')
    const dispatch = useDispatch();
    const propiedades = {image, id, price , name}

    const handleclick = () => {
        dispatch(addToCartAndSaveDetailsMovie(propiedades, user)) 

        Swal.fire({
            title:`Artículo agregado al carrito`,
             icon:'success'});
        
             setTimeout(() => {
                window.location.reload(false);
            }, 1500); // 1.5 segundos
    }

    


    return(
        <div className={style.containerMax}>
            <Link to={`/moviesdetail/${id}`}>
            <img src={image} className={style.image}/>
        </Link>
        <button className={style.agg}  onClick={handleclick}>${price} - Agregar al Carrito</button>
        </div>
    )
}

export default Card