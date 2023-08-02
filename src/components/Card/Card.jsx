import style from './card.module.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return(
        <Link to={`/moviesdetail/${props.id}`}>
        <div className={style.containerMax}>
            <img src={props.image}/>
        </div>
        </Link>
    )
}

export default Card