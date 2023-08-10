import Modal from "../../ModalCreateSerie/ModalCreateSerie"
import { useState } from "react";


const MantenerSeries = ()=> {
 
  const [openModalSerie,setOpenModalSerie] = useState(false);


  const handleModalSerie = () => {
    setOpenModalSerie(!openModalSerie)
   }

       return (
        <div>
          <p>Series</p>
          <button onClick={handleModalSerie} className='CreateNew'>Nueva Serie</button>
          <Modal  openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie}></Modal>
             
        </div>
       )

}


export default MantenerSeries;