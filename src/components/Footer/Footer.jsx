import './footer.css'
import ModalFooter from '../ModalFooter/ModalFooter'
import { useState } from 'react';

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
            <footer className="footer">
                <div className='divTitleFooter'>
                    <p className='pTitleFooter'>¿Preguntas?, envía un email a StreamPlay@gmail.com</p>
                </div>

                <div className='divContainerFooter'>
                    <div className='divContainerPModal'>
                        <p className='pModal' onClick={handleShowS}>Suscripcion</p>
                        <p className='pModal' onClick={handleShowP}>Privacidad</p>
                        <p className='pModal' onClick={handleShowC}>Centro de ayuda</p>
                        <p className='pModal' onClick={handleShowT}>Terminos de uso</p>
                    </div>
                    <div>
                        <p className='pContactenos'>Contáctenos</p>
                        
                        <div className='divContainericon'>
                            <i className="bi bi-envelope"></i>
                            <i className="bi bi-instagram"></i>
                        </div>
                        <p className='pFooter'>© 2023 StreamPlay, todos los derechos reservados</p>
                    </div>
                </div>
            </footer>

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
        </>
    )
}

export default Footer