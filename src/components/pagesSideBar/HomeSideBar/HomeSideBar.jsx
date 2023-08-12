import { Chart } from "react-google-charts";
import style from './HomeSideBar.module.css';

const HomeSideBar = ()=> {

   const data = [
    ["Meses", "N° Usuarios", { role: "style" }],
    ["Enero", 170, "#b87333"], // RGB value
    ["Febrero", 800, "silver"], // English color name
    ["Marzo", 500, "gold"],
    ["Abril", 100, "color: #e5e4e2"], // CSS-style declaration
    ["Mayo", 200, "red"],
    ["Junio", 400, "blue"],
    ["Agosto", 100, "black"],
    ["Setiembre", 450, "yellow"],
    ["Octubre", 950, "green"],
    ["Noviembre", 666, "pink"],
    ["Diciembre", 450, "#e5e4e2"]
  ];

  return (
    <>
    <h1 className={style.titu}>Numero de Usuarios</h1>
    <div className={style.graficoven}>
     <Chart chartType="ColumnChart" width="1000px" height="400px" data={data} />
    </div>
    </>
  )

}

export default HomeSideBar;