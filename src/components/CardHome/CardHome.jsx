import style from './CardHome.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import cardMovie from '../../components/CardMovie/CardMovie';

const CardHome = ({ image, id, tipo, price }) => {
    console.log(tipo);

    return (
        <>
            <Link to={tipo === 'Peliculas' ? `/moviesdetail/${id}` : `/detailSeries/${id}`}>
                <div className={style.containerMax}>
                    <img className={style.image} src={image} alt={`Movie or series ${id}`} />
                </div>
            </Link>
            <div className={style.iconsContainer}>
                <FontAwesomeIcon icon={faStar} className={style.icon} />
                <FontAwesomeIcon icon={faThumbsUp} className={style.icon} />
                <FontAwesomeIcon icon={faThumbsDown} className={style.icon} />
            </div>
        </>
    );
};

export default CardHome;
