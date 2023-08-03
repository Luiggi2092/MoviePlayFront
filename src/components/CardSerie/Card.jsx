import style from './card.module.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
  return (
    <Link to={`/detailSeries/${props.id}`}>
      <div className={style.containerMax}>
        <img src={props.image} alt="Serie Poster" />
      </div>
    </Link>
  );
};

export default Card;
