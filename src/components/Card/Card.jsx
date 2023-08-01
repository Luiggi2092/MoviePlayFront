import style from './card.module.css'

const Card = (props) => {
    return(
        <div className={style.containerMax}>
            <img src={props.image}/>
        </div>
    )
}

export default Card