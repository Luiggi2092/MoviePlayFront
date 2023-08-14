import { useParams } from "react-router-dom"
import React, { useState,useEffect } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import style from './moviesDetail.module.css'
import {getMoviexid, clearMovieId, addToCartAndSaveDetailsMovie} from "../../redux/actions"
import Footer from "../../components/Footer/Footer";
import { useSelector,useDispatch } from "react-redux"
import ReactPlayer from 'react-player/youtube'


const MoviesDetail = () => {
    
      const {id} = useParams()
      const user = localStorage.getItem('email')
      const dispatch = useDispatch();
      const peliculaid = useSelector(state=> state.MovieId)
      const [isScrolled, setIsScrolled] = useState(false)
      const propiedades = {image:peliculaid.image, id:+id, price:peliculaid.price , name:peliculaid.name}

      useEffect(()=> {
          dispatch(getMoviexid(id));

          dispatch(clearMovieId());
          
    },[dispatch]) 


    const handleclick = () => {
        dispatch(addToCartAndSaveDetailsMovie(propiedades, user)) 
    }

    window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }



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

                <div className={style.botonContainer}>
                    <button onClick={handleclick}>${peliculaid.price} - Agregar al carrito</button>
                </div>
                
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