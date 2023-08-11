import { Navigate, Outlet } from "react-router-dom"


const PrivateRouter =  ({user, children, redirectPath = '/login'}) => {

    const acceso = localStorage.getItem('State')

    if(user === 'true' || acceso) {
        return children ? children : <Outlet/>
    }
    
    return <Navigate to={redirectPath} replace/>
}

export default PrivateRouter 