import { Link, NavLink } from "react-router-dom";
import style from "./SideBar.module.css";
import * as FaIcons from "react-icons/fa";
//import 'bootstrap/dist/css/bootstrap.min.css';



const Sidebar = ()=> {
    return (
        <div className={style.sidebar}>
           <ul className={style.ulSidebar}>
            <li>
                <NavLink to={`/DashboardAdmin/content1`}><FaIcons.FaHome/><a>Inicio</a></NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content2"><FaIcons.FaPlayCircle/><a>Mantener Peliculas</a>
                </NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content3"><FaIcons.FaHammer/><a>Mantener Series</a></NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content4" ><FaIcons.FaUser/><a>Mantener Usuarios</a></NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content5"><FaIcons.FaCartPlus/><a>Compras</a></NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content6" className="btn btn-primary" ><FaIcons.FaPoll/><a>Ventas</a></NavLink>
            </li>
           </ul>
        </div>
    )
   

}


export default Sidebar;