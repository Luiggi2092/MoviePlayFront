import Modal from "../../ModalCreateSerie/ModalCreateSerie"
import style from './MantenerSeries.module.css'
import { useState } from "react";


const MantenerSeries = ()=> {
 
  const [openModalSerie,setOpenModalSerie] = useState(false);


  const handleModalSerie = () => {
    setOpenModalSerie(!openModalSerie)
   }

       return (
        <div>
          <p className={style.pp}>Series</p>
          <button onClick={handleModalSerie} className={style.CreateNewbut}>Nueva Serie</button>
          <Modal  openModalSerie={openModalSerie} cambiarEstadoSerie={setOpenModalSerie}></Modal>
             
        </div>
       )

}


export default MantenerSeries;