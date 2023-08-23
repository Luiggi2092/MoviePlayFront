import { HashRouter, Link, Route,Router,useParams } from "react-router-dom";
import Sidebar from "../../components/SliderBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import style from "./Dashboard.module.css";
import HomeSideBar from "../../components/pagesSideBar/HomeSideBar/HomeSideBar";
import MantenerMovies from "../../components/pagesSideBar/MantenerMovies/MantenerMovies";
import MantenerSeries from "../../components/pagesSideBar/MantenerSeries/MantenerSeries";
import MantenerUsuarios from "../../components/pagesSideBar/MantenerUsuarios/MantenerUsuarios";
import Sales from "../../components/pagesSideBar/SalesSideBar/SalesSideBar";
import MantenerOrdenes from "../../components/pagesSideBar/MantenerOrdenes/MantenerOrdenes";





const DashboardAdmin=()=> {

    const data = useParams();



    return (
        <>
            <Navbar/>
            <div className={style.container}>
           <Sidebar/>
            <div className={style.content}>
             {data.contentId == "content1" && <HomeSideBar/>}
             {data.contentId == "content2" && <MantenerMovies/>}
             {data.contentId == "content3" && <MantenerSeries/>}
             {data.contentId == "content4" && <MantenerUsuarios/>}
             {data.contentId == "content5" && <MantenerOrdenes/>}
             {data.contentId == "content6" && <Sales/>}
            </div>
           </div>
           </>
    )

}


export default DashboardAdmin;