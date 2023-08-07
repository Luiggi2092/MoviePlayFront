// import data from "../../data";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch,useSelector} from "react-redux"
import {getSeriesID, deleteSerieId} from "../../redux/actions";
import ReactPlayer from 'react-player/youtube'

import style from './seriedetail.module.css'
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer";

const SerieDetail = () => {


    const dispatch = useDispatch();
     
    const {id} = useParams()
    const serie = useSelector(state => state.SerieID);
    const url = useSelector(state => state.UrlSerie);
    const actores = useSelector(state => state.ActoresSeries)

    console.log(url)

 
    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
    }

    useEffect(() => {
        dispatch(getSeriesID(id))

        return () => {
            dispatch(deleteSerieId())
        } 
    }, [])

    return (
        <section className='sectionDetailSerie'>
             
            <Navbar isScrolled={isScrolled} /> 
            
            <div className={style.detailsContainer}>
                <div className={style.nameContainer}>
                    <h1 className={style.name}>{serie?.titulo} </h1>
                </div>

                <section className={style.section}>
                    <div className={style.image}>
                        <img src={serie?.image}/>
                    </div>
                    
                    <div className={style.info}>
                        <div>
                            <span>Descripcion</span>
                            <p>{serie?.descripcion}</p>
                        </div>
                        <div>
                            <span>Actores</span>
                            <p>{actores}</p>
                        </div>
                    </div>
                </section>

                <div className={style.botonContainer}>
                    <button>${serie?.price}</button>
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
                <ReactPlayer height={500} width={1550} style={{margin:'0 30%',maxWidth:"100%",padding:"20px"}} 
                url={
                    url
                } controls={true} />
            </div>

            <Footer/>
        </section>
    )
}

export default SerieDetail