import React from "react";
import { Chart } from "react-google-charts";
import style from "./SalesSideBar.module.css"
import { todasLasComprasAdmin } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
 


export const optionsPie = {
  title: "Ventas Películas vs Series",
};

  
  const Sales = () => {
    
    const dispatch = useDispatch()
    
    useEffect(() =>{
      dispatch(todasLasComprasAdmin())
    }, [])

    const allSales = useSelector(state => state.comprasAdmin)
    
    if (!allSales || !allSales.OCs) {
      return null; // O manejar el caso en el que allSales no esté definido o OCs no exista
    }
    
    const totalSeriesPrice = allSales.OCs.reduce((total, ordenCompra) => {
      const seriesPrice = ordenCompra.Series.reduce(
        (subtotal, serie) => subtotal + serie.price,
        0
        );
        return total + seriesPrice;
      }, 0);
      
      
      
      const totalMultimediaPrice = allSales.OCs.reduce((total, ordenCompra) => {
        const multimediaPrice = ordenCompra.Multimedia.reduce(
          (subtotal, media) => subtotal + media.price,
          0
          );
          return total + multimediaPrice;
        }, 0);


        const dataPie = [
          ["Task", "Hours per Day"],
          [`Películas $${totalMultimediaPrice}`, totalMultimediaPrice ],
          [`Series $${totalSeriesPrice}`, totalSeriesPrice ],
        ];
  

    return (
        <div className={style.chart}>
        <Chart 
      chartType="PieChart"
      data={dataPie}
      options={optionsPie}
      width={"100%"}
      height={"100%"}
    />
    </div>
    )
}


export default Sales;