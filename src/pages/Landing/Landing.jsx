import React from 'react';
import fondo from '../../assets/the-flash.jpg';
import Logo from '../../assets/Logo.ico.png';
import img0 from '../../assets/camilo.jpeg';
import img4 from '../../assets/amber1.jpg'
import img5 from '../../assets/nico.png'
import img6 from '../../assets/luis.jpeg'
import img7 from '../../assets/marcos.jpeg'
import disfruta from '../../assets/peli2023.jpg'
import descarga from '../../assets/840_560.jpg'
import disfruta2 from '../../assets/tendencias.jpg'
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import style from './landing.module.css';



const Landing = () => {

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/home");
  };

  const registerHandler = () => {
    navigate("/register");
  };


  return (
    <div className={style.container}>
      <div className={style.img}>
        <div className={style.imgOverlay}>
        <img src={fondo} alt="img.jpg" className={style.fondo}  />
        <img src={Logo} alt="Logo.ico" className={style.logo}/>
        <h1 className={style.h1}>Disfruta de las mejores películas y series</h1>
        </div>
        <button onClick={clickHandler} className={style.boton}>Acceder</button>
        <button onClick={registerHandler} className={`${style.registre} ${style.registreTopRight}`} >Registro</button>
      </div>

      <div className={style.div1}>
        <h2 className={`${style.title} ${style.titleLeft}`}>Disfruta en tu TV<span className={style.span}><br />
          Ve en smart TV, Chromecast,
          Apple TV, reproductores  y más.</span></h2>
        <div className={style.tvContainer}>
        <img src={disfruta} alt="peli2023.jpg" className={style.tvImage} />
      </div>
      </div>

      <div className={style.div1}>
        <h2 className={`${style.title} ${style.titleLeft}`}>Descarga tus series para verlas forever.</h2>
        <div className={style.tvContainer}>
        <img src={descarga} alt="840_560.jpg" className={style.tvImage} />
      </div>
      </div>

      <div className={style.div1}>
        <h2 className={`${style.title} ${style.titleLeft}`}>Disfruta donde quieras y como quieras</h2>
        <div className={style.tvContainer}>
        <img src={disfruta2} alt="tendencias.jpg" className={style.tvImage} />
      </div>
      </div>

<div>
      <div className={style.div3}>
        <h2 className={style.title2}>Descarga tus series para verlas forever</h2>
        <h4>Ingresa tu email para crear una cuenta</h4>
        <input className={style.input} type="text" placeholder='' />
        <Link to='/register'>
          <button className={style.input2}> INGRESAR</button>
        </Link>
      </div>
      </div> 

  <div className={style.contaain}>
    <p className={style.title3}>Quiénes Somos.?</p>
    
<div className={style.imageContainer}>
    <img src={img4} alt="amber1.jpg" className={style.img1} />
    <p className={style.name}>Amberlis Laya <br></br><span className={style.spandd}>Desarrolladora Full Stack (Frontend)</span></p>
  </div> 

  <div className={style.imageContainer}>
    <img src={img6} alt="luis.jpeg" className={style.img3} />
      <p className={style.name}>Luis Seminario <br></br><span className={style.spandd}>Desarrollador Full Stack (Frontend-Backend)</span></p> 
    </div>    

     <div className={style.imageContainer}>
          <img src={img7} alt="marcos.jpeg" className={style.img0} />
          <p className={style.name}>Marcos Castillo <br></br><span className={style.spandd}>Desarrollador Full Stack (Frontend)</span></p>
       </div> 

    <div className={style.imageContainer}>
    <img src={img5} alt="nico.png" className={style.img2} />
          <p className={style.name}>Nicolas Solans <br></br><span className={style.spandd}>Desarrollador Full Stack (Backend)</span></p> 
    </div> 

    <div className={style.imageContainer}>
       <img src={img0} alt="camilo.jpeg" className={style.img0} />
          <p className={style.name}>Camilo Parada <br></br><span className={style.spandd}>Desarrollador Full Stack (Backend)</span></p>
          </div> 

 

    <div className={style.imageContainer}>
       <img src={img0} alt="camilo.jpeg" className={style.img0} />
      <p className={style.name}>Camilo P <br></br><span className={style.spandd}>Desarrollador Full Stack ("")</span></p>
            </div> 


    <div className={style.imageContainer}>
       <img src={img0} alt="camilo.jpeg" className={style.img0} />
      <p className={style.name}>Camilo P <br></br><span className={style.spandd}>Desarrollador Full Stack ("")</span></p>
            </div> 

    <div className={style.imageContainer}>
       <img src={img0} alt="camilo.jpeg" className={style.img0} />
      <p className={style.name}>Camilo P <br></br><span className={style.spandd}>Desarrollador Full Stack ("")</span></p>
      </div>

      </div>
            <div className={style.footer}>
      <footer className={style.footer}>
        <h1 className={style.titlefo}>¿Preguntas?,  envía un email a moviesplay@gmail.com</h1>
        <Link to="/suscripciones">Suscripciones</Link>
        <Link to="/privacidad">Privacidad</Link>
        <Link to="/centrodeayuda">Centro de ayuda</Link>
        <Link to="/terminosdeuso">Términos de uso</Link>
        <h4>Contáctenos</h4>
        <a href="https://accounts.google.com/" target="_blank"><i className="bi bi-envelope"></i></a>
        <a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram icono-red"></i></a>
        <h6>© 2023 MoviesPlay. Todos los derechos reservados.</h6>
      </footer>
         

</div> 
    </div>








  );
};

export default Landing;




 

