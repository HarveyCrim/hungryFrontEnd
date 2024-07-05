import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
const UserMenu = () => {

const {logout} = useAuth0()
  return (
    <div className = "bg-white border-2 w-fit space-y-2 p-6 min-w-[180px]">
        <p className = "font-bold text-slate-950 text-xl text-center">My Restaurant</p>
        <Link to = "/user-profile"><p className = "font-bold text-slate-950 text-xl text-center">User Profile</p></Link>
        <button onClick = {() => {logout(); localStorage.removeItem("token")}}className = "bg-black text-2xl text-white font-bold rounded-lg py-2 px-4 mx-auto block" >Log out</button>
    </div>
  )
}

export default UserMenu