import { todasLasComprasAdmin } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from './MantenerOrdenes.module.css'

const ordenes =()=> {

   const dispatch = useDispatch()

   useEffect(() =>{
      dispatch(todasLasComprasAdmin())
   }, [])

   const allSales = useSelector(state => state.comprasAdmin) 

   console.log(allSales)
     return (
      <div className={style.containerMax}>
         <h1 className={style.h1}>Todas las ordenes de compra</h1>
      </div>
     )   
}


export default ordenes;