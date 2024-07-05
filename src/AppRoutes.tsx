
import { Navigate, Routes, Route } from 'react-router-dom'
import Layout1 from './layouts/Layout1'
import AuthCallback from './pages/AuthCallback'
import UserProfile from './pages/UserProfile'
import { getUser } from './api/useApi'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './redux/store'
import { useEffect, useRef } from 'react'
import { Toaster } from 'sonner';
import ProtectedRoutes from './components/ProtectedRoutes'
import { setAppDrawer } from './redux/userSlice'
const AppRoutes = () => {
  const myref = useRef<HTMLDivElement | null>(null)
  const menuState = useSelector<IRootState, boolean>(state => state.userReducer.appDrawer)
  console.log("rend")
  const dispatch = useDispatch()
  const clicked = () => {
    if(menuState == true){
      dispatch(setAppDrawer(false))
    }
  }
  useEffect(() => {
    myref.current?.addEventListener("mousedown", clicked)
    return () => {
      myref.current?.removeEventListener("mousedown", clicked)
    }
  }, [menuState])
  getUser()
  return (
    <div ref = {myref} className = "z-30">
    <Toaster />
        <Routes>
        <Route path = "/" element = {<Layout1></Layout1>} />
        <Route path = "/auth-callback" element = {<AuthCallback />} />,
        <Route element = {<ProtectedRoutes />}>
            <Route path = "/user-profile" element = {<UserProfile />} />
        </Route>
        <Route path = "*" element = {<Navigate to = "/" />} />
    </Routes>
    </div>
  )
}

export default AppRoutes