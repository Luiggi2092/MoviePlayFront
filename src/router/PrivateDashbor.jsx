import { Navigate, Outlet } from "react-router-dom"


const PrivateRouterDashbor =  ({children, redirectPath = '/home'}) => {

    const acceso = localStorage.getItem('rol')
    const email = localStorage.getItem('email')


    if(acceso === 'Administrador' || email === 'moviesplay@gmail.com') {
        return children ? children : <Outlet/>
    }
    
    return <Navigate to={redirectPath} replace/>
}

export default PrivateRouterDashbor