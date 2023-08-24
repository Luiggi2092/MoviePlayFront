import React from 'react';
import fondo from '../../assets/the-flash.jpg';
import Logo from '../../assets/Logo.ico.png';
import img0 from '../../assets/camilo.jpeg';
import img1 from '../../assets/camilop.jpeg';
import img4 from '../../assets/amber1.jpg'
import img5 from '../../assets/nico.png'
import img6 from '../../assets/luis.jpeg'
import img7 from '../../assets/marcos.jpeg'
import img8 from '../../assets/Gonzalo.jpeg'
import img9 from '../../assets/man.webp'
import img10 from '../../assets/david.jpeg'
import disfruta from '../../assets/peli2023.jpg'
import descarga from '../../assets/840_560.jpg'
import disfruta2 from '../../assets/tendencias.jpg'
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer'
import { useState } from 'react';
import style from './landing.module.css';
import {useDispatch} from "react-redux"
import {emailSuscripcion} from "../../redux/actions"
import Swal from 'sweetalert2'



const Landing = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailSus,setEmailSus] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');




  const clickHandler = () => {
    navigate("/home");
  };

  const registerHandler = (event) => {
    navigate("/register");
  };


  const suscripcion = () => {
    if (emailSus !== "") {
      // Verificar si el correo electrónico es válido
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isValidEmail = emailPattern.test(emailSus);


      if (isValidEmail) {

        dispatch(emailSuscripcion(emailSus));
        navigate("/register");
      
      } else {
      
        Swal.fire({
          title: "El correo ingresado no es válido",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    
    } else {
      Swal.fire({
        title: "Debe ingresar su correo",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };


  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmailSus(newEmail);

    // Verificar si el correo es válido
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(newEmail);
    setIsEmailValid(isValidEmail);

    // Actualizar el mensaje de error si es necesario
    if (!isValidEmail) {
      setErrorMessage('Debe contener formato de correo');
    } else {
      setErrorMessage('');
    }
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
        <div className={style.tvContainer2}>
          <img src={disfruta} alt="tendencias.jpg" className={style.tvImage2} />
      </div>
      </div>

      <div className={style.div1}>
        <h2 className={`${style.title} ${style.titleLeft}`}>Descarga tus series para verlas siempre.</h2>
        <div className={style.tvContainer3}>
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
        <h2 className={style.title2}>Descarga tus series y películas para verlas siempre</h2>
        <h4>Ingresa tu email para crear una cuenta</h4>
          <input className={`${style.input} ${isEmailValid ? '' : style.invalidInput}`} type="text" placeholder='' value={emailSus} onChange={handleEmailChange} />
          {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
          <button className={style.input2} onClick={suscripcion}> INGRESAR</button>
        
      </div>
      </div> 

  <div className={style.contaain}>
    <p className={style.title3}>¿Quiénes Somos?</p>
    
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
          <p className={style.name}>Camilo Pacheco <br></br><span className={style.spandd}>Desarrollador Full Stack (Backend)</span></p>
          </div> 

 

    <div className={style.imageContainer}>
       <img src={img8} alt="Gonzalo.jpeg" className={style.img0} />
      <p className={style.name}>Gonzalo Fernandez <br></br><span className={style.spandd}>Desarrollador Full Stack (Backend)</span></p>
            </div> 


    <div className={style.imageContainer}>
       <img src={img10} alt="david.jpeg" className={style.img0} />
      <p className={style.name}>David Tealdi<br></br><span className={style.spandd}>Desarrollador Full Stack (Frontend)</span></p>
            </div> 

    <div className={style.imageContainer}>
       <img src={img1} alt="camilop.jpeg" className={style.img0} />
          <p className={style.name}>Camilo Parada <br></br><span className={style.spandd}>Desarrollador Full Stack (Frontend-Backend)</span></p>
      </div>

      </div>
    
      <Footer/>
    </div>

  );
};


export default Landing;




 

