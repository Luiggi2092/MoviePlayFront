import style from './card.module.css'
import { Link } from 'react-router-dom'
import {addToCartAndSaveDetailsMovie} from '../../redux/actions'
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"

const Card = ({image, id, price, name}) => {

    const user = 'marcos@gmail.com'

    const dispatch = useDispatch();
    const savesId = useSelector(state => state.idSaves)
    const contador = useSelector(state => state.cartCount)
    const objetosdeMovies = useSelector(state => state.savedProductsMovies)
    const propiedades = {image, id, price , name}

    const handleclick = () => {
        dispatch(addToCartAndSaveDetailsMovie(propiedades, user)) 
    }

    

    console.log(savesId)
    console.log(contador)
    console.log(objetosdeMovies)

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