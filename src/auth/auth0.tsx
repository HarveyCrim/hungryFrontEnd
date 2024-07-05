import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const MyAuth = ({children} : {children? : React.ReactNode}) => {
    const navigate = useNavigate()
    return <Auth0Provider 
        domain = {import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENT_ID}
        authorizationParams={
        {
            redirect_uri : import.meta.env.VITE_REDIRECT_URI
        }}
        onRedirectCallback = {
            (appstate: AppState|undefined ,user: User|undefined) => {
                console.log(appstate)
                if(user){
                    // console.log("right")
                    navigate("/auth-callback")
                }
                else{
                    // console.log("errory")
                }
            }
        }
    >
        {children}
    </Auth0Provider>
}