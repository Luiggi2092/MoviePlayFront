// import style from './seriedetail.module.css'
// import React, { useState } from 'react'
// import Navbar from "../Navbar/Navbar"


// const SerieDetail = () => {

//     const [isScrolled, setIsScrolled] = useState(false)

//     window.onscroll = () => {
//         setIsScrolled(window.pageYOffset === 0 ? false : true);
//         return () => (window.onscroll = null);
//     }
//     return (
//         <section className={style.sectionDetailSerie}>
//             <div>
//                 <Navbar isScrolled={isScrolled} />
//                 <h3 className={style.nameSerie}>NOMBRE DE LA SERIE</h3>
            
//                 <div className={style.containerDivDetail}>
                
//                     <img className={style.imageSerie} src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />

//                 <div>

//                         <p className={style.descrip}>Descripcion</p>

//                         <p className={style.descripSerie}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aliquid dicta fugit debitis sint voluptas, ex eaque excepturi nam cum obcaecati quas. Ullam ducimus cum eligendi veniam perferendis. Minus, voluptas?</p>

//                         <p className={style.raiting}>Raiting</p>
//                         <div className={style.estrellas}>
//                         <p>⭐</p>
//                         <p>⭐</p>
//                         <p>⭐</p>
//                         <p>⭐</p>
//                         <p>⭐</p>
//                     </div>

//                         <p className={style.actores}>Actores</p>
//                         <p className={style.actoresSeries}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

//                         <p className={style.director}>Director</p>
//                         <p className={style.directorSerie}>Lee Byeong-heon</p>
                
//                 </div>

//             </div>
            
//                 <div className={style.compraSer}>
//                     <button className={style.bottoncompr}>$100</button>
//             </div>

//                 <div className={style.containerTc}>
//                     <div className={style.divTem}>
//                     <p className='p-p'>TEMPORADA</p>
//                         <select className={style.serieD}>
//                         <option>Temporada 1</option>
//                     </select>
//                 </div>
//                     <div className={style.cap}>
//                         <p className={style.pp}>CAPITULO</p>
//                         <select className={style.capitulo}>
//                         <option>Catipulo 1</option>
//                     </select>
//                 </div>
//             </div>

//                 <div className={style.video}>
//                     <img className={style.imgserie} src="https://d500.epimg.net/cincodias/imagenes/2020/12/31/lifestyle/1609408585_467254_1609408795_noticia_normal.jpg" alt="" />
//             </div>
//             </div>

//         </section>
//     )
// }

// export default SerieDetail