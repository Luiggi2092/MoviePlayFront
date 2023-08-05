import style from './CardHome.module.css'
import { Link } from 'react-router-dom'

const CardHome = ({image,id}) => {


    return(
        <Link to={`/moviesdetail/${id}`}>
        <div className={style.containerMax}>
            <img src={image}/>
        </div>
        </Link>
    )
}


export default CardHome;