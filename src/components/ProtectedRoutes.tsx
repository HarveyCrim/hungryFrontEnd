import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    const {isAuthenticated} = useAuth0()
    console.log(isAuthenticated)
    if(isAuthenticated){
        return <Outlet />
    }
    else
        return <Navigate to = "/"/>
}
export default ProtectedRoutes