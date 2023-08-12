import { Navigate, Outlet } from "react-router-dom"
import { useSelector} from "react-redux"


const PrivateRouter =  ({children, redirectPath = '/login'}) => {

    const acceso = localStorage.getItem('State')
    const boolian = useSelector(state => state.Acceso)


    if(boolian === 'true' || acceso) {
        return children ? children : <Outlet/>
    }
    
    return <Navigate to={redirectPath} replace/>
}

export default PrivateRouter 