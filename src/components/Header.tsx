import  { useEffect, useRef } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import { setAppDrawer, setUserMenu } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { IRootState } from '../redux/store';
import UserMenu from './UserMenu';
const Header = () => {
  const showMenuRef = useRef<HTMLDivElement | null>(null)
  const menuState = useSelector<IRootState, boolean>(state => state.userReducer.userMenu)
  const dispatch = useDispatch()
  useEffect(() => {
    const listener = (e: Event) => {
        if(menuState && !showMenuRef.current?.contains(e.target as Node)){
            dispatch(setUserMenu(false))
        }
    }
    document.addEventListener("mousedown", listener)
    return () => document.removeEventListener("mousedown", listener)
  },[menuState])
  const {loginWithRedirect, isAuthenticated, user} = useAuth0()
  const toggleUserMenu = () => {
    dispatch(setUserMenu(!menuState))
  } 
  return (
    <div className='border-b-2 border-b-orange-500 flex justify-between p-6 items-center'>
        <Link to = "/"><span className='text-orange-500 text-4xl font-bold inline-block tracking-[-2px]'>Hungry</span></Link>
        <div className = "md:hidden">
            <GiHamburgerMenu onClick = {() => dispatch(setAppDrawer(true))} className = "fill-orange-500 cursor-pointer hover:fill-black" size = {30}/>
        </div>
        <div className='hidden relative md:flex cursor-pointer self-end space-x-8'>
            {isAuthenticated && <div onClick = {toggleUserMenu} className='flex items-center gap-2'>
                <RxAvatar size = {34} className = "fill-orange-500 cursor-pointer hover:fill-black"/>
                <h5 className = "font-semibold">{user?.email || "de"}</h5>
                </div>}
                {menuState && <div ref = {showMenuRef} className='absolute z-40 right-[0px] top-[40px] border w-fit'><UserMenu /></div>}
            {!isAuthenticated && <h5 className = "font-semibold text-xl cursor-pointer hover:text-gray-500">Sign up</h5>}
            {!isAuthenticated && <h5 onClick = {() => loginWithRedirect()} className = "font-semibold text-xl cursor-pointer hover:text-gray-500">Log in</h5>}
        </div>
    </div>
  )
}

export default Header