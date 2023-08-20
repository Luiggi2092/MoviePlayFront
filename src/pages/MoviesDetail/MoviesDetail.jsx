import { useParams } from "react-router-dom"
import React, { useState,useEffect } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import style from './moviesDetail.module.css'
import {getMoviexid, clearMovieId, addToCartAndSaveDetailsMovie, fetchCartContent, todosLosProductosXidUser, removeFromCartAndRemoveDetailsMovie} from "../../redux/actions"
import Footer from "../../components/Footer/Footer";
import { useSelector,useDispatch } from "react-redux"
import ReactPlayer from 'react-player/youtube'
import Swal from 'sweetalert2'


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
    
    const handleclick = () => {
        if (isAddedToCart) {
            dispatch(removeFromCartAndRemoveDetailsMovie(id, user));
            Swal.fire({
                title: `Artículo eliminado del carrito`,
                icon: 'success'
            });

            setTimeout(() => {
                window.location.reload(false);
            }, 1500); // 1.5 segundos
        
        } else {
            // Producto no en el carrito ni comprado, agregar al carrito
            dispatch(addToCartAndSaveDetailsMovie(propiedades, user));

            Swal.fire({
                title: `Artículo agregado al carrito`,
                icon: 'success'
            });

            setTimeout(() => {
                window.location.reload(false);
            }, 1500); // 1.5 segundos
        }
    };

      useEffect(()=> {
          dispatch(getMoviexid(id));

          dispatch(clearMovieId());
          dispatch(fetchCartContent(user))
          dispatch(todosLosProductosXidUser(idUser))
          
    },[dispatch]) 





  console.log(peliculaid)

    return(
        <section className={style.max}>
        <div>
            <Navbar isScrolled={isScrolled} />
            <div className={style.detailsContainer}>
                <div className={style.nameContainer}>
                <h1 className={style.name}>{peliculaid.name}</h1>
                <h1 className={style.name}></h1>
                </div>

                <section className={style.section}>
                <div className={style.image}>
                <img src={peliculaid.image}/>
                </div>
                <div className={style.info}>
                    <div>
                        <span>Sipnosis</span>
                        <p>{peliculaid.description}</p>
                    </div>                    
                    <div>
                        <span>Genero</span>
                        <p>
                        {peliculaid.Genres &&
                        peliculaid.Genres.map((genre) => genre.name).join(', ')}
                        </p>
                        
                    </div>
                    
                </div>
                </section>
                {isAddedToCart? (
                    <div className={style.botonContainer}>
                    <button onClick={handleclick} className={style.quitar}>Quitar del carrito</button>
                    </div>
                ):isPurchased? (
                    null
                ): (
                    <div className={style.botonContainer}>
                    <button onClick={handleclick} className={style.button}>${peliculaid.price} - Agregar al carrito</button>
                    </div>
                )}
                
            </div>
            <div className={style.peliculaContainer}>
                <ReactPlayer height={500} width={850} style={{margin:'0 15%',maxWidth:"100%"}} url={peliculaid.linkVideo} controls={true}/>
                    
            </div>
        </div>
        <Footer/>
        </section>
    )
}

export default MoviesDetail