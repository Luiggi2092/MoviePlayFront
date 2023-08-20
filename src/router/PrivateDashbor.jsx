import { Navigate, Outlet } from "react-router-dom"


const PrivateRouterDashbor =  ({children, redirectPath = '/home'}) => {

    const acceso = localStorage.getItem('rol')


    if(acceso === 'Administrador') {
        return children ? children : <Outlet/>
    }
    
    return <Navigate to={redirectPath} replace/>
}

export default PrivateRouterDashbor