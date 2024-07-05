import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { createUser } from '../api/useApi'

const AuthCallback = () => {
  const {user} = useAuth0()
  const navigate = useNavigate()
  const {isSuccess, createANewUser} = createUser()
  useEffect(() => {
    const ans = {auth0Id: user?.sub as string, email: user?.email as string, name: user?.name as string}
    const run = async () => {
        console.log("creating a new use")
        await createANewUser(ans)
    }
    run()
},[])
 useEffect(() => {
    if(isSuccess){
        navigate("/")
    }
 }, [isSuccess])
return (<div></div>)
}

export default AuthCallback