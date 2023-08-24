import { todasLasComprasAdmin } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from './MantenerOrdenes.module.css'

const MantenerOrdenes =()=> {

   const dispatch = useDispatch()

   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      dispatch(todasLasComprasAdmin(currentPage)); // Pasa la página actual como parámetro
   }, [currentPage]);
   console.log(currentPage)

   

   useEffect(() =>{
      dispatch(todasLasComprasAdmin())
   }, [])

   function convertirNumero(numero) {
      const resultado = numero / 100;
      return resultado.toFixed(2)
   }

   const allSales = useSelector(state => state.comprasAdmin) 
   const totalAmountParseado = parseInt(allSales.ventaTotal)

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   console.log(allSales)

   return (
      <div className={style.maxContainer}>
         <h1 className={style.h1}>Todas las órdenes de compra</h1>
         <h1 className={style.h12}>Recaudo de todas las compras: ${isNaN(totalAmountParseado) ? 0 : totalAmountParseado}</h1>

         {allSales.OCs && allSales.OCs.map((order) => (
            <div key={order.id} className={style.contenedor}>
               <h2>Factura #{order.id}</h2>
               <p className={style.p}>ID de usuario: {order.usuarioId}</p>
               <p className={style.p}>Total de la compra: ${convertirNumero(order.total)}</p>

               <table className={style.table1}>
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
                           <td><img src={serie.image} alt={serie.titulo} className={style.image} /></td>
                           <td>{serie.titulo}</td>
                           <td>${serie.price}</td>
                        </tr>
                     ))}
                     {order.Multimedia.map((multimedia) => (
                        <tr key={multimedia.id}>
                           <td><img src={multimedia.image} alt={multimedia.name} className={style.image} /></td>
                           <td>{multimedia.name}</td>
                           <td>${multimedia.price}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ))}

          {/* Paginación */}
          <div className={style.pagination}>
            {Array.from({ length: allSales.totalPages }, (_, index) => (
               <button
                  key={index}
                  className={index + 1 === currentPage ? style.but : style.but}
                  onClick={() => handlePageChange(index + 1)}
               >
                  {index + 1}
               </button>
            ))}
         </div>
      </div>
   );
}


export default MantenerOrdenes;