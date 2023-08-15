import React,{useRef,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import img1 from "../../assets/caret-left-square.svg"
import image1 from '../../assets/Mavka.jpg';
import img2 from "../../assets/caret-left-square.svg"
import styled from "styled-components"
import './SliderShow.css';




const SliderShow = () => {
    
   
const slidershow = useRef(null);
const navigate = useNavigate();

const siguiente = ()=> {
    //Comprobamos que el slideshow tenga elementos
    if(slidershow.current.children.length > 0) {
        //Obtenemos el primer elemento  del slideshow
        const primerElemento = slidershow.current.children[0];

        slidershow.current.style.transition = `3000ms ease-out all`;

        const tamañoSlider = slidershow.current.children[0].offsetWidth;
        slidershow.current.style.transform = `translateX(-${tamañoSlider}px)`;

        const transicion = () => {
        slidershow.current.style.transition = 'none';
        slidershow.current.style.transform = `translateX(0)`;    
        slidershow.current.appendChild(primerElemento);

        slidershow.current.removeEventListener('transitionend',transicion);
        }

        slidershow.current.addEventListener('transitionend', transicion);
    }
}

const anterior = ()=> { 
    if(slidershow.current.children.length > 0){
        const index = slidershow.current.children.length - 1;
        const ultimoElemento = slidershow.current.children[index];

        slidershow.current.insertBefore(ultimoElemento,slidershow.current.firstChild);

        slidershow.current.style.transition = 'none';
        const tamañoSlider = slidershow.current.children[0].offsetWidth;
        slidershow.current.style.transform = `translateX(-${tamañoSlider}px)`;

        setTimeout(()=> {
            slidershow.current.style.transition = '3000ms ease-out all';
            slidershow.current.style.transform = `translateX(0)`;
      
        },30)
        


    }
}

  useEffect(() => {

      slidershow.current.addEventListener('mouseover', () => {
          
     });
   

   slidershow.current.addEventListener('mouseleave', () => {
   
    });
      
  },[]);



    return (
        <ContenedorPrincipal>
        <ContenedorSliderShow ref={slidershow}>
            <Slider>
                <a>
                 <img src={image1}/>
                </a>
                {/* <TextSlider>
                    <a>$ 18.45</a>
                </TextSlider> */}
            </Slider>
            <Slider>
                <a>
                        <img src="https://hips.hearstapps.com/hmg-prod/images/barbie-margot-robbie-64b7997423918.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*"/>
                </a>
                {/* <TextSlider > 
                    <a>$ 18.45</a>
                </TextSlider> */}
            </Slider>
            <Slider>
                <a>
                        <img src="https://www.nintenderos.com/wp-content/uploads/2023/07/super-mario-bros.jpg"/>
                </a>
                {/* <TextSlider >
                    <a>$ 15.45</a>
                </TextSlider> */}
            </Slider>
            </ContenedorSliderShow>
           
            <Controles>
            <Boton
                            onClick={anterior}
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" color="white" width="100" height="100" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
                            <path  d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                            </svg>
                        </Boton>
                        <Boton derecho="true"
                            onClick={siguiente}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" color="white" width="100" height="100" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16">
                            <path  d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                            </svg>
                        </Boton>
                        </Controles>      
           
                </ContenedorPrincipal>
        
    )
}

const ContenedorPrincipal = styled.div`
      position: relative;
`;

const ContenedorSliderShow = styled.div`
      display: flex;
      flex-wrap: nowrap;

`;

const Slider = styled.div`
       min-width: 100%;
       overflow: hidden;
       transition: .3s ease all;
    //    z-index: 10;
       max-height: 500px;
       position: relative;

       img {
          width : 100%;
          vertical-align: top;
          height : 100%;
          
       }
`;

const TextSlider = styled.div`
      background: #008f39;
      color: white;
      padding: 10px 60px;
      position: absolute;
      bottom: 50px;
      right: 45%;
`;

const Controles = styled.div`
     position: absolute;
     top:0;
     background: none;
     z-index: 20;
     height: 100%;
     width:  100%;
     pointer-events: none;

`;

const Boton = styled.button`
      pointer-events: all;
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      width: 120px;
      height: 100%;
      text-align: center;
      position: absolute;
      transition: .3s ease all;

      ${props => props.derecho === "true" ? 'right:0' : 'left:0' }


`;


export default SliderShow;