import style from './card.module.css'
import { Link } from 'react-router-dom'

const Card = ({image,id}) => {

    console.log(image);
    console.log(id);

    return(
        <Link to={`/moviesdetail/${id}`}>
        <div className={style.containerMax}>
            <img src={image}/>
        </div>
        </Link>
    )
}

export default Card