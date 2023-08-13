import style from './CardCar.module.css'
import { removeFromCartAndRemoveDetailsSerie, removeFromCartAndRemoveDetailsMovie} from '../../redux/actions'
import { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux'


const reload = () => {
    window.location.reload(false);
}
const CardCar = (props) => {

    const dispatch = useDispatch()


    const handleClick = () => {
        if(props.tipo === 'serie'){

                const updatedSavedProducts = JSON.parse(localStorage.getItem('idSavesSeries')) || [];;
                localStorage.setItem('savedSeries', JSON.stringify(updatedSavedProducts)); // Actualizar LocaleStore 
                dispatch(removeFromCartAndRemoveDetailsSerie(props.id))           

        }
        if(props.tipo === 'movie'){

                const updatedSavedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
                localStorage.setItem('savedProducts', JSON.stringify(updatedSavedProducts)); // Actualizar LocaleStore  
                dispatch(removeFromCartAndRemoveDetailsMovie(props.id))
        }
        reload()
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