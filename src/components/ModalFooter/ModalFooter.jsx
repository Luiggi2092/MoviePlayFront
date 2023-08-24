import './modalFooter.css'

const ModalFooter = ({open, cambiarEstado, header, body}) => {

    const BotonCerrar = () => {
        cambiarEstado(false);
    }

    return (
        <>
            {
                open && 
                <div className="containerFooter">
                    <div>
                        <div className="EncabezadoModalFooter">
                            <h2 className="tituloModalFooter">{header}</h2>
                        </div>
                        <div className="contenedorFooter">
                            <p className='pModalFooter'>{body}</p>
                        </div>
                        <div className='divButtonModaFooter'>
                            <button className='buttonModalFooter' onClick={BotonCerrar}>Cerrar</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalFooter