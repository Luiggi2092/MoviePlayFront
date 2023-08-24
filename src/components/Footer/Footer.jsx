import style from './footer.module.css';
import ModalFooter from '../ModalFooter/ModalFooter'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [showS, setShowS] = useState(false);
    const [showP, setShowP] = useState(false);
    const [showC, setShowC] = useState(false);
    const [showT, setShowT] = useState(false);


    const handleShowS = () => {
        setShowS(!showS)
    }

    const handleShowP = () => {
        setShowP(!showP)
    };

    const handleShowC = () => {
        setShowC(!showC)
    };

    const handleShowT = () => {
        setShowT(!showT);
    }

    return (
        <>
            <footer className={style.footer}>
                    <h1 className={style.titlefo}>¿Preguntas?,  envía un email a moviesplay@gmail.com</h1>
                        <Link className='pModal' onClick={handleShowS}>Suscripción</Link>
                        <Link className='pModal' onClick={handleShowP}>Privacidad</Link>
                        <Link className='pModal' onClick={handleShowC}>Centro de ayuda</Link>
                        <Link className='pModal' onClick={handleShowT}>Términos de uso</Link>
                <h4>Contáctenos</h4>                        
                        <div className='divContainericon'>
                    <a href="https://accounts.google.com/" target="_blank"><i className="bi bi-envelope"></i></a>
                    <a href="https://www.instagram.com/moviesplay2023/?next=%2F" target="_blank"><i className="fab fa-instagram icono-red"></i></a>   
                    <h6>© 2023 MoviesPlay. Todos los derechos reservados.</h6>                   
         </div>
                
            </footer>
            <div className='divContainericon1'>
            <ModalFooter
                header={"Suscripcion"}
                body={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio nobis enim explicabo quae magnam dolorem minus. Alias, laboriosam dignissimos, ipsum id quidem reiciendis velit reprehenderit dolores saepe magnam voluptas dolorem?"}
                open={showS}
                cambiarEstado={setShowS}
                
            />
            <ModalFooter
                header={"Privacidad"}
                body={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio nobis enim explicabo quae magnam dolorem minus. Alias, laboriosam dignissimos, ipsum id quidem reiciendis velit reprehenderit dolores saepe magnam voluptas dolorem?"}
                open={showP}
                cambiarEstado={setShowP}
            />
            <ModalFooter
                header={"Centro de ayuda"}
                body={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio nobis enim explicabo quae magnam dolorem minus. Alias, laboriosam dignissimos, ipsum id quidem reiciendis velit reprehenderit dolores saepe magnam voluptas dolorem?"}
                open={showC}
                cambiarEstado={setShowC}
            />
            <ModalFooter
                header={"Terminos de uso"}
                body={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio nobis enim explicabo quae magnam dolorem minus. Alias, laboriosam dignissimos, ipsum id quidem reiciendis velit reprehenderit dolores saepe magnam voluptas dolorem?"}
                open={showT}
                cambiarEstado={setShowT}
            />
            </div>
        </>
    )
}

export default Footer