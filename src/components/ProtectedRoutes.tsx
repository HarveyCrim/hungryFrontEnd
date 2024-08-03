import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    if(isAuthenticated){
        return <Outlet />
    }
    if(isLoading){
        return <></>
    }
    else
        return <Navigate to = "/"/>
}
export default ProtectedRoutes