import React from 'react'
import img from '../../assets/series-netflix.jpg'
import './landing.css'


const Landing = () => {

  return (
<div>
      <div className='container'>
<h1>Disfruta de las mejores películas y series</h1>
<button className='button-container1'>Acceder</button>
</div>

<div className='container-div'>
        <h2>Disfruta en tu TV<span><br />
Ve en smart TV, Chromecast,
Apple TV, reproductores  y más.</span></h2>
<img src="" alt="" />
</div>

<div className='container-div'>
  <h2>Descarga tus series para verlas forever.</h2>
  <img src="" alt="" />
</div>

<div className='container-div'>
  <h2>Disfruta donde quieras</h2>
  <div className='img-container'>
  <img src="" alt="" />
  </div>
</div>

<div className='container-div'>
  <h2>Descarga tus series para verlas forever</h2>
  <h3>Ingresa tu email para crear una cuenta o reiniciar tu membresía</h3>
  <input type="text" placeholder=''/>
  <button className='button-container'> INGRESAR</button>
  <img src="" alt="" />
</div>

<div className='container-div'>
  <h1>Quienes Somos</h1>
  <img src="" alt="" />
  <img src="" alt="" />
  <img src="" alt="" />
  <img src="" alt="" />
  <img src="" alt="" />
  <img src="" alt="" />
  <img src="" alt="" />
  <img src="" alt="" />
</div>


<footer className='container-footer'>
  <h1>¿Preguntas?,  envía un email a StreamPlay@gmail.com</h1>
  <h3>Suscripciones</h3>
  <h3>Privacidad</h3>
  <h3>Centro de ayuda</h3>
  <h3>Términos de uso</h3>
  <h2>Contáctenos</h2>
  <h4>© 2023 StreamPlay. Todos los derechos reservados.</h4>
  <a href="instagram"></a>
  <a href="gmail"></a>
</footer>
</div>



 

)
}

export default Landing
