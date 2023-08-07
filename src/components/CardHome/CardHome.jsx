import style from './CardHome.module.css'
import cardMovie from "../../components/CardMovie/CardMovie"
import { Link } from 'react-router-dom'

const CardHome = ({image,id,tipo}) => {

     console.log(tipo);

    return(
        <>
        
        <Link to={tipo =="Peliculas" ? `/moviesdetail/${id}`: `/detailSeries/${id}`}>
        <div className={style.containerMax}>
            <img src={image}/>
        </div>
        </Link>
        </>
    )
}


export default CardHome;