const CardCar = (props) => {
    return(
        <div>
            <img src={props.image} />
            <h2>{props.price}</h2>
            <button>Eliminar</button>
        </div>
    )
}

export default CardCar