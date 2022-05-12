import { Link, redirectTo, RouteComponentProps } from "@reach/router";
import React, { useState, useEffect} from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import Google from "../assets/socials/google.svg";
import axios from 'axios';
import { ToastContainer , toast} from 'react-toastify';

export const Login: React.FC<RouteComponentProps> = () => {
    const token:string="";
    const [state, setState] = useState({
      name:"",
      email:"",
      picture:"",
      profile_loaded:false
    })
      const googleResponse = async(response:any) => {
        if(response.tokenId){
          const googleResponse = await axios.post('http://localhost:3333/authentication',{token: response.tokenId});
          if(Object.keys(googleResponse.data.payload).length!==0){
            const {name, email, picture} = googleResponse.data.payload;
            setState({
              ... state,
              name,
              email,
              picture,
              profile_loaded:true
            });
            toast.success("You have logged into your google account!",{
              position:"top-right",
              autoClose:5000,
              hideProgressBar:false,
              closeOnClick:true,
              pauseOnHover:false,
              draggable:true,
              progress:undefined,
            });
            console.log(name,email)
          }
        }
      }
      const onFailure = (error: any) => {
        alert(error);
      }
    return(
        <>
        {!state.profile_loaded ? (
          <div>
          <GoogleLogin
            clientId="749607665220-nm0esgq5d60qi92s8svuevekktvdf150.apps.googleusercontent.com"
            className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 ease-in-out bg-white rounded-full shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-xl"
            buttonText="Se connecter avec Google"
            onSuccess={googleResponse}
            onFailure={onFailure}
          />
      </div>
        ):(
          <Link to="/ranking/list" className="font-bold">
          </Link>
        )}

            {/*<button
            type="submit"
            onClick={openPopup}
                className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 ease-in-out bg-white rounded-full shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-xl"
            >
                <img src={Google} alt="Google" className="flex-shrink-0 w-9" />
                <div className="mx-auto">
                    Se connecter avec Google
                </div>
    </button>*/}
        </>
        )
}