import style from './CardCar.module.css'

const CardCar = (props) => {
    return(
        <div className={style.container}>
            <img src={props.image} className={style.image} />
            <h4>{props.name}</h4>
            <h4>${props.price}</h4>
            <span>item #{props.id}</span>
            <button>Eliminar</button>
        </div>
    )
}

export default CardCar