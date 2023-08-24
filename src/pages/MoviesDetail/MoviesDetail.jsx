import { useParams } from "react-router-dom"
import React, { useState,useEffect } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import style from './moviesDetail.module.css'
import {getMoviexid, clearMovieId, addToCartAndSaveDetailsMovie, fetchCartContent, todosLosProductosXidUser, removeFromCartAndRemoveDetailsMovie} from "../../redux/actions"
import Footer from "../../components/Footer/Footer";
import { useSelector,useDispatch } from "react-redux"
import { FaStar } from "react-icons/fa"
import ReactPlayer from 'react-player/youtube'
import Swal from 'sweetalert2'
import { formToJSON } from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeartPulse } from '@fortawesome/free-solid-svg-icons';


const MoviesDetail = () => {
    
      const {id} = useParams()
      const user = localStorage.getItem('email')
      const dispatch = useDispatch();
      const peliculaid = useSelector(state=> state.MovieId)
      const [isScrolled, setIsScrolled] = useState(false)
      const propiedades = {image:peliculaid.image, id:+id, price:peliculaid.price , name:peliculaid.name}
      const carrito = useSelector(state => state.carrito)
      const compras = useSelector(state => state.productosComprados)
      const multimedia = carrito.Multimedia
      const peliculas = compras.peliculas
      const idUser = localStorage.getItem('id')
      const isAddedToCart = multimedia && multimedia.some(producto => producto.peliculasXcarro.multimediaId === +id);
      const isPurchased = peliculas && peliculas.some(producto => producto.id === +id);
      const [Currentvalue,setCurrentValue] = useState(0);
      const [array,setarray] = useState(0);
      const [hoverValue,setHovervalue] = useState(undefined);
      
      const stars = Array(5).fill(0);



      const [peliculaAgregada, setPeliculaAgregada] = useState(isAddedToCart)  

    const handleclick = () => {
        if (peliculaAgregada) {
            dispatch(removeFromCartAndRemoveDetailsMovie(id, user));
            setPeliculaAgregada(false)
            Swal.fire({
                title: `Artículo eliminado del carrito`,
                icon: 'success'
            });
        
        } else {
            // Producto no en el carrito ni comprado, agregar al carrito
            dispatch(addToCartAndSaveDetailsMovie(propiedades, user));
            setPeliculaAgregada(true)
            Swal.fire({
                title: `Artículo agregado al carrito`,
                icon: 'success'
            });
        }
    };

      useEffect(()=> {
          dispatch(getMoviexid(id));

          dispatch(clearMovieId());
          dispatch(fetchCartContent(user))
          dispatch(todosLosProductosXidUser(idUser))

          
    },[dispatch]) 

   


    return(
        <section className={style.max}>
        <div>
            <Navbar isScrolled={isScrolled} />
            <div className={style.detailsContainer}>
                <div className={style.nameContainer}>
                <h1 className={style.name1}>{peliculaid.name}</h1>
                <h1 className={style.name1}></h1>
                </div>

                <section className={style.section}>
                <div className={style.image}>
                <img src={peliculaid.image}/>
                </div>
                <div className={style.info}>
                    <div>
                        <span>Sinopsis</span>
                        <p>{peliculaid.description}</p>
                    </div>                    
                    <div>
                        <span>Género</span>
                        <p>
                        {peliculaid.Genres &&
                        peliculaid.Genres.map((genre) => genre.name).join(', ')}
                        </p>
                        
                    </div>
                    <div>
                        <span>Duración</span>
                        <p>{peliculaid.time} minutos</p>
                    </div>
                    <div>
                            <span>Calificación</span>
                            <div>
                            {
                                <div className={style.rating}>
                                {peliculaid.promCal == 0 ?<p>Aún no hay calificaciones</p>: [1, 2, 3, 4, 5].map(value => (
                                    <FontAwesomeIcon
                                    key={value}
                                    icon={faStar}
                                    className={style.ratingStar}
                                    style={{ color: value <= peliculaid.promCal ? '#f1d237' : '#d3d3d3' }}
                                    />
                                ))}
                                </div>
                             }
                            </div>
                        </div>
                    
                </div>
                </section>
                {peliculaAgregada? (
                    <div className={style.botonContainer}>
                    <button onClick={handleclick} className={style.quitar}>Quitar del carrito</button>
                    </div>
                ):isPurchased? (
                    null
                ): (
                    <div className={style.botonContainer1}>
                    <button onClick={handleclick} className={style.button1}>${peliculaid.price} - Agregar al carrito</button>
                    </div>
                )}
                
            </div>
            <div className={style.peliculaContainer}>
                <ReactPlayer height={400} width={1450} style={{margin:'0 15%',maxWidth:"100%"}} url={peliculaid.linkVideo} controls={true}/>
                    
            </div>
            <div className={style.contenedores}>
                { peliculaid.Reviews && peliculaid.Reviews.map((e,index)=>{
                     return <div className={style.comentarios} key={index}>
                            <div className={style.imagen} key={index}>
                               <img src={e.Usuario.image} width={30} height={30} />
                            </div>
                            <div>
                           <p>{e.Usuario.nombre}  {e.Usuario.apellido}</p>
                            <div className={style.stars} key={index}>
                            {stars.map((_,index) => {
                                
                         {console.log(e.calificacion)}
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
        </div>
        <Footer/>
        </section>
    )
}

export default MoviesDetail