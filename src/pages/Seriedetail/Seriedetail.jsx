import data from "../../data";
import { useParams } from "react-router-dom";
import style from './seriedetail.module.css'

const SerieDetail = () => {

    const series = data
    
      const {id} = useParams()
      const serie = series.find(Element => Element.id == id)

    return (
        <section className='sectionDetailSerie'>
             
             <div className={style.detailsContainer}>
                <div className={style.nameContainer}>
                <h1 className={style.name}>{serie.original_title} </h1>
                <h1 className={style.name}>- 2023</h1>
                </div>

                <section className={style.section}>
                <div className={style.image}>
                <img src={serie.image}/>
                </div>
                <div className={style.info}>
                    <div>
                        <span>Sipnosis</span>
                        <p>{serie.overview}</p>
                    </div>
                    <div>
                        <span>Raiting</span>
                        <p>{serie.popularity}%</p>
                    </div>
                    <div>
                        <span>Actores</span>
                        <p>{serie.actors.join(', ')}</p>
                    </div>
                    <div>
                        <span>Director</span>
                        <p>{serie.autor}</p>
                    </div>
                </div>
                </section>

                <div className={style.botonContainer}>
                    <button>$4.99</button>
                </div>
                
            </div>

            <div className={style.divContainerTC}>
                <div className={style.divTemp}>
                    <p >TEMPORADA</p>
                    <select className={style.selectDetail}>
                        <option>Temporada 1</option>
                    </select>
                </div>
                <div className={style.divCap}>
                    <p >CAPITULO</p>
                    <select className={style.selectDetail}>
                        <option>Catipulo 1</option>
                    </select>
                </div>
            </div>

            <div className={style.divVideo}>
                <img className={style.imgSeries} src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
            </div>

        </section>
    )
}

export default SerieDetail