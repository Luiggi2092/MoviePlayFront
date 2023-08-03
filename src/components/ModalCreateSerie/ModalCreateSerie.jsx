import "./ModalCreateSerie.css"



const ModalCreateSerie = ({openModalSerie,cambiarEstadoSerie}) => {
    console.log(openModalSerie)
    return (
        <>
         {openModalSerie && <div className="Serie">
         <h1 >Daaaa</h1>
         </div>}
       </>
    )
}

export default ModalCreateSerie;