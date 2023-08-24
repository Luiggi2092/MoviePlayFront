// import data from "../../data";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch,useSelector} from "react-redux"
import {getSeriesID, deleteSerieId, getSeriesTempCat, addToCartAndSaveDetailsSerie, removeFromCartAndRemoveDetailsSerie, fetchCartContent, todosLosProductosXidUser} from "../../redux/actions";
import ReactPlayer from 'react-player/youtube'
import Swal from 'sweetalert2'
import { FaStar } from "react-icons/fa"
import style from './seriedetail.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeartPulse } from '@fortawesome/free-solid-svg-icons';

const SerieDetail = () => {


    const dispatch = useDispatch();
     
    const {id} = useParams()
    const user = localStorage.getItem('email')

    const [temporadaSelect, setTemporadaSelect] = useState(1)
    const [capituloSelect, setCapituloSelect] = useState(1)

    const serie = useSelector(state => state.SerieID);
    const url = useSelector(state => state.UrlSerie);
    const actores = useSelector(state => state.ActoresSeries)
    const generos = useSelector(state => state.generos)
    // const temporada = useSelector(state => state.temporadaSerie)
    // const capitulo = useSelector(state => state.catipuloSerie)
    const tituloepi = useSelector(state => state.tituloEpisodio)
    const cantidadTemporada = useSelector(state => state.cantidadTemporadas)
    const capitulo = useSelector(state => state.cantidadCapitulos)
    const propiedades = {image:serie.image, id:+id, price:serie.price, name:serie.titulo}
    const carrito = useSelector(state => state.carrito)
    const compras = useSelector(state => state.productosComprados)
    const seriesCarrito = carrito.Series
    const seriesCompradas = compras.series
    const isAddedToCart = seriesCarrito && seriesCarrito.some(producto => producto.seriesXcarro.serieId === +id);   
    const isPurchased = seriesCarrito && seriesCompradas.some(producto => producto.id === +id)
    const [serieAgregada, setSerieAgregada] = useState(isAddedToCart)
    const idUser = localStorage.getItem('id')
    
    const [hoverValue,setHovervalue] = useState(undefined)

    const stars = Array(5).fill(0);



    const handleclick = () => {
        if (serieAgregada) {
            dispatch(removeFromCartAndRemoveDetailsSerie(id, user));
            setSerieAgregada(false)
            Swal.fire({
                title: `Artículo eliminado del carrito`,
                icon: 'success'
            });
        } else {
            // Producto no en el carrito ni comprado, agregar al carrito
            dispatch(addToCartAndSaveDetailsSerie(propiedades, user));
            setSerieAgregada(true)
            Swal.fire({
                title: `Artículo agregado al carrito`,
                icon: 'success'
            });    
        }
    };
    

 
    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
    }
    
    const handleTemporada = (event) => {
        setTemporadaSelect(event.target.value)
       
        dispatch(getSeriesTempCat(id, event.target.value, capituloSelect))
    }

    const handleCapitulo = (event) => {
        setCapituloSelect(event.target.value)

        dispatch(getSeriesTempCat(id, temporadaSelect, event.target.value))
    }

    

    useEffect(() => {
        dispatch(getSeriesID(id));
        dispatch(fetchCartContent(user));
        dispatch(deleteSerieId());
        dispatch(todosLosProductosXidUser(idUser))
    }, [dispatch])


    return (
        <section>
             <Navbar isScrolled={isScrolled} /> 
             <div className={style.detailsContainer}>
                <div className={style.nameContainer}>
                    <h1 className={style.name}>{serie?.titulo} </h1>
                </div>

                <section className={style.section}>
                <div className={style.image}>
                <img src={serie.image}/>
                </div>
                
                <div className={style.info}>
                    <div className={style.info}>
                        <div>
                            <span>Año de estreno</span>
                            <p>{serie?.yearEstreno}</p>
                        </div>
                        <div>
                            <span>Descripción</span>
                            <p>{serie?.descripcion}</p>
                        </div>
                        <div>
                            <span>Actores</span>
                            <p>{actores}</p>
                        </div>
                        <div>
                            <span>Géneros</span>
                            <p>{generos}</p>

                        </div>
                        <div>
                            <span>Calificación</span>
                            <div>
                            {
                                <div className={style.rating}>
                                {serie.promCal == 0 ?<p>Aún no hay calificaciones</p>: [1, 2, 3, 4, 5].map(value => (
                                    <FontAwesomeIcon
                                    key={value}
                                    icon={faStar}
                                    className={style.ratingStar}
                                    style={{ color: value <= serie.promCal ? '#f1d237' : '#d3d3d3' }}
                                    />
                                ))}
                                </div>
                             }
                            </div>
                        </div>
                        <div>
                            <span>Título del Episodio</span>
                            <p>{tituloepi}</p>
                        </div>
                    </div>
                </div>
                </section>

                {serieAgregada? (
                    <div className={style.botonContainer}>
                    <button onClick={handleclick} className={style.quitar}>Quitar del carrito</button>
                    </div>
                ):isPurchased? (
                    null
                ): (
                    <div className={style.botonContainer}>
                    <button onClick={handleclick} className={style.button}>${serie.price} - Agregar al carrito</button>
                    </div>
                )}
                
            </div>
 
            <div className={style.divContainerTC}>
                <div className={style.divTemp}>
                    <p>TEMPORADA</p>
                    <select className={style.selectDetail} value={temporadaSelect} onChange={handleTemporada}>      
                        {
                            cantidadTemporada?.map((t) => (<option key={t} value={t}>Temporada {t}</option>))
                        }
                    </select>
                </div>
                <div className={style.divCap}>
                    <p >CAPÍTULO</p>
                    <select className={style.selectDetail} value={capituloSelect} onChange={handleCapitulo}>
                        {
                            capitulo?.map((c) => <option key={c} value={c}>Capitulo {c}</option>)
                        }
                    </select> 
                </div>
            </div>

            <div className={style.divVideo}>
                <ReactPlayer height={500} width={1550} style={{margin:'0 15%',maxWidth:"100%"}} 
                    url={
                        url
                    } controls={true} />
            </div>

            <div className={style.contenedores}>
                { serie.Reviews && serie.Reviews.map((e,index)=>{
                     return <div className={style.comentarios} key={index}>
                            <div className={style.imagen} key={index}>
                               <img src="https://static.vecteezy.com/system/resources/previews/008/844/895/non_2x/user-icon-design-free-png.png" width={30} height={30} />
                            </div>
                            <div>
                           <p>{e.Usuario.nombre}  {e.Usuario.apellido}</p>
                            <div className={style.stars} key={index}>
                            {stars.map((_,index) => {
                                
                         return (
                            <FaStar key={index}
                                    size={10}
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer"

                                    }}
                                    color={(hoverValue || e.calificacion) > index ? "orange": "white"}/>

                         )
                         
                      })}
                            </div>
                           <p className={style.coment}>{e.comentario}</p>
                           </div>
                     </div>  
                })}
            </div>

            <Footer />
        </section>
    )
}

export default SerieDetail