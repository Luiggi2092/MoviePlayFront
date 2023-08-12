import { Navigate, Outlet } from "react-router-dom"


const PrivateRouter =  ({children, redirectPath = '/login'}) => {

    const acceso = localStorage.getItem('State')


    if(acceso) {
        return children ? children : <Outlet/>
    }
    
    return <Navigate to={redirectPath} replace/>
}

export default PrivateRouter 