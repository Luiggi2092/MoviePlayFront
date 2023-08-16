import style from './CardCar.module.css'
import { removeFromCartAndRemoveDetailsMovie} from '../../redux/actions'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'


const reload = () => {
    window.location.reload(false);
}

const CardCar = (props) => {

    const dispatch = useDispatch()


    const handleClick = () => {    
        
        dispatch(removeFromCartAndRemoveDetailsMovie(props.id))        

        Swal.fire({
            title:`Artículo eliminado carrito`,
             icon:'success'});
        
             setTimeout(() => {
                window.location.reload(false);
            }, 1500); // 1.5 segundos      
    }

    return(
        <div className={style.container}>
            <img src={props.image} className={style.image} />
            <div className={style.containerName}>
            <h4 className={style.name}>{props.name}</h4>
            </div>
            <div className={style.priceContainer}>
            <h4 className={style.price}>${props.price}</h4>
            </div>
            <div className={style.containerBoton}>
            <button className={style.boton} onClick={handleClick}>Eliminar</button>
            </div>
        </div>
    )
}

export default CardCar