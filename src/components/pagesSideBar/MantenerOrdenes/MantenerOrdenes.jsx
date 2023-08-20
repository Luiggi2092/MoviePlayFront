import { todasLasComprasAdmin } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from './MantenerOrdenes.module.css'

const MantenerOrdenes =()=> {

   const dispatch = useDispatch()
   

   useEffect(() =>{
      dispatch(todasLasComprasAdmin())
   }, [])

   function convertirNumero(numero) {
      const resultado = numero / 100;
      return resultado.toFixed(2);
   }

   const allSales = useSelector(state => state.comprasAdmin) 

   console.log(allSales.OCs)

   return (
      <div>
         <h1 className={style.h1}>Todas las ordenes de compra</h1>
         <h1 className={style.h1}>Recaudo de todas ventas: {allSales.ventaTotal}</h1>

         {allSales.OCs && allSales.OCs.map((order) => (
            <div key={order.id} className={style.contenedor}>
               <h2>Orden de Compra #{order.id}</h2>
               <p>ID de usuario: {order.usuarioId}</p>
               <p>Total de la compra: {convertirNumero(order.total)}</p>

               <table>
                  <thead>
                     <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                     </tr>
                  </thead>
                  <tbody>
                     {order.Series.map((serie) => (
                        <tr key={serie.serieId}>
                           <td><img src={serie.image} style={{width: "100px", height:"100px"}}/></td>
                           <td>{serie.titulo}</td>
                           <td>${serie.price}</td>
                        </tr>
                     ))}
                     {order.Multimedia.map((multimedia) => (
                        <tr key={multimedia.id}>
                           <td><img src={multimedia.image} style={{width: "100px", height:"100px"}}/></td>
                           <td>{multimedia.name}</td>
                           <td>${multimedia.price}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ))}
      </div>
   );
}


export default MantenerOrdenes;