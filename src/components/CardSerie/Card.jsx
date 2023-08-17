import style from './card.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faStar } from '@fortawesome/free-solid-svg-icons';
import { addToCartAndSaveDetailsSerie } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const Card = ({ id, image, price, name }) => {
  const dispatch = useDispatch();
  const propiedades = { image, id, price, name };
  const user = localStorage.getItem('email');

  const handleclick = () => {
    dispatch(addToCartAndSaveDetailsSerie(propiedades, user));

    Swal.fire({
      title: `Artículo agregado al carrito`,
      icon: 'success'
    });

    setTimeout(() => {
      window.location.reload(false);
    }, 1500); // 1.5 segundos
  };

  return (
    <div className={style.containerMax}>
      <Link to={`/detailSeries/${id}`}>
        <img src={image} alt="Serie Poster" className={style.image} />
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

