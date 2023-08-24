import { Link, NavLink } from "react-router-dom";
import style from "./SideBar.module.css";
import * as FaIcons from "react-icons/fa";
//import 'bootstrap/dist/css/bootstrap.min.css';



const Sidebar = ()=> {
    return (
        <div className={style.sidebar}>
           <ul className={style.ulSidebar}>
            <li>
                <NavLink to={`/DashboardAdmin/content1`}><FaIcons.FaHome/>Inicio</NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content2"><FaIcons.FaPlayCircle/>Mantener Películas
                </NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content3"><FaIcons.FaHammer/>Mantener Series</NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content4" ><FaIcons.FaUser/>Mantener Usuarios</NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content5"><FaIcons.FaCartPlus/>Ordenes de Compras</NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content6" className="btn btn-primary" ><FaIcons.FaPoll/>Ventas</NavLink>
            </li>
           </ul>
        </div>
    )
   

}


export default Sidebar;