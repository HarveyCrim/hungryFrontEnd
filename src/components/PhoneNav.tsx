
import { useRef, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { setAppDrawer } from '../redux/userSlice';
import { RxAvatar } from "react-icons/rx";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
const PhoneNav = () => {
    const drawer = useSelector<IRootState, boolean>(state => state.userReducer.appDrawer)
    const {isAuthenticated, user, logout, loginWithRedirect} = useAuth0()
    const dispatch = useDispatch()
    const slideRef = useRef<HTMLDivElement | null> (null)
    return (
        <div ref = {slideRef} className = {`md:hidden ${!drawer ? "hidden" : "flex"} z-50 fixed animate-in slide-in-from-right top-[0px] z-10 right-[0px] flex-col min-h-screen bg-orange-500/90 w-[80%] border-2 border-orange-500`}>
        <IoMdClose onClick = {() => dispatch(setAppDrawer(false))} className='fill-white self-end m-2 cursor-pointer hover:fill-black' size = {50}/>
        <div className='h-fit w-fit self-center mt-[40px] text-white font-semibold text-2xl space-y-4'>
            {!isAuthenticated && <p>Sign up</p>}
            {!isAuthenticated && <p className = "cursor-pointer" onClick={() => {
                dispatch(setAppDrawer(false))
                loginWithRedirect()
            }}>Log in</p>}
            {isAuthenticated && <div><div className='flex items-center gap-2'>
                <RxAvatar size = {34} className = "fill-orange-500 cursor-pointer hover:fill-black"/>
                <h5 className = "font-semibold">{user?.email || "de"}</h5>
                </div>
                <div className = "w-[90%] mt-2 mx-auto bg-[#FCAB31] h-[3px]"></div>
                </div>}
            {isAuthenticated && <Link className = "mx-auto pt-5 text-center block" onClick ={() => {dispatch(setAppDrawer(false))}} to ="/user-profile">User Profile</Link>}
            {isAuthenticated && <button onClick = {() => {logout(); localStorage.removeItem("token")}}className = "bg-black text-2xl text-white font-bold rounded-lg py-2 px-4 mx-auto block" >Log out</button>}
        </div>
    </div>
    )
}

export default PhoneNav