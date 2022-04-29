import { RouteComponentProps } from "@reach/router";
import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import Google from "../assets/socials/google.svg";

export const Login: React.FC<RouteComponentProps> = () => {
    const token:string="";
    function useGoogleAuthentication() {
        const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
          if ('accessToken' in response) {
            const accessToken = response.accessToken;
       
            fetch(`${process.env.REACT_APP_API_URL}/authentication`, {
              method: 'GET',
              body: JSON.stringify({
                token: token
              }),
              headers: {
                'Content-Type': 'application/json'
              },
            });
          }
        }
       
        return {
          token,
        }
      }
    return(
        <>

            <button
            type="submit"
                className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 ease-in-out bg-white rounded-full shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-xl"
            >
                <img src={Google} alt="Google" className="flex-shrink-0 w-9" />
                <div className="mx-auto">
                    Se connecter avec Google
                </div>
            </button>
        </>
        )
}