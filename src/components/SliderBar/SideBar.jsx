import { Link, NavLink } from "react-router-dom";
import style from "./SideBar.module.css";




const Sidebar = ()=> {
    return (
        <div className={style.sidebar}>
           <ul className={style.ulSidebar}>
            <li>
                <NavLink to={`/DashboardAdmin/content1`}>Inicio</NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content2">Mantener Peliculas
                </NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content3">Mantener Series</NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content4">Mantener Usuarios</NavLink>
            </li>
            <li>
                <NavLink to="/DashboardAdmin/content5" className="btn btn-primary" >Ventas</NavLink>
            </li>
           </ul>
        </div>
    )
   

}


export default Sidebar;