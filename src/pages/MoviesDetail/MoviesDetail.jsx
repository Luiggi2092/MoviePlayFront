import { useParams } from "react-router-dom"
import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import style from './moviesDetail.module.css'
import data from "../../data";

const MoviesDetail = () => {
    const peliculas = data
    
      const {id} = useParams()
      const pelicula = peliculas.find(Element => Element.id == id)

    return(
        <section className={style.maxContainer}>
        <div>
            <div className={style.detailsContainer}>
                <div className={style.nameContainer}>
                <h1 className={style.name}>{pelicula.original_title} </h1>
                <h1 className={style.name}>- 2023</h1>
                </div>

                <section className={style.section}>
                <div className={style.image}>
                <img src={pelicula.image}/>
                </div>
                <div className={style.info}>
                    <div>
                        <span>Sipnosis</span>
                        <p>{pelicula.overview}</p>
                    </div>
                    <div>
                        <span>Raiting</span>
                        <p>{pelicula.popularity}%</p>
                    </div>
                    <div>
                        <span>Actores</span>
                        <p>{pelicula.actors.join(', ')}</p>
                    </div>
                    <div>
                        <span>Director</span>
                        <p>{pelicula.autor}</p>
                    </div>
                </div>
                </section>

                <div className={style.botonContainer}>
                    <button>$4.99</button>
                </div>
                
            </div>
            <div className={style.peliculaContainer}>
                <h1>Aqui va la pelicula</h1>
            </div>
        </div>
        </section>
    )
}

export default MoviesDetail