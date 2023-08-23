import React from "react";
import { Chart } from "react-google-charts";
import style from "./SalesSideBar.module.css"
import { todasLasComprasAdmin } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
 


export const optionsPie = {
  title: "Ventas Peliculas vs Series",
};

const dataMovie = [
  [
    "Day",
    "Guardians of the Galaxy",
    "The Avengers",
    "Transformers: Age of Extinction",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4],
  ];
  
  const dataVentasGastos = [
    ["Year", "Ventas", "Gastos"],
    ["2020", 10000, 4000],
    ["2021", 11700, 4600],
    ["2022", 6600, 11200],
    ["2023", 10300, 5400],
  ];
  
  
  const optionsVentasGastos = {
    title: "Ventas vs Gastos en millones de dólares (USD)",
    curveType: "function",
    legend: { position: "bottom" },
  };
  
  
  
  export const optionsBar = {
    chart: {
      title: "Ganancias de taquilla de peliculas y series en las primeras dos semanas de apertura",
      subtitle: "en miles de dólares (USD)",
    },
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
      
      console.log(totalSeriesPrice)
      
      const totalMultimediaPrice = allSales.OCs.reduce((total, ordenCompra) => {
        const multimediaPrice = ordenCompra.Multimedia.reduce(
          (subtotal, media) => subtotal + media.price,
          0
          );
          return total + multimediaPrice;
        }, 0);

        const dataPie = [
          ["Task", "Hours per Day"],
          ["Peliculas $", totalMultimediaPrice],
          ["Series $", totalSeriesPrice],
        ];
  

    return (
      <div className="scrollable-container">
        <div className={style.charts}>
        <div className={style.chart}>
        <Chart 
      chartType="PieChart"
      data={dataPie}
      options={optionsPie}
      width={"80%"}
      height={"270px"}
    />
    </div>
    <div className={style.barchart}>
    <Chart 
    chartType="Line"
    width="300px"
    height="200px"
    data={dataMovie}
    options={optionsBar}
  />
  </div>
  </div>
  <div className={style.LinearChart}>
  <Chart
      chartType="LineChart"
      width="700px"
      height="280px"
      data={dataVentasGastos}
      options={optionsVentasGastos}
    />
  </div>
 
  </div>
    )
}


export default Sales;