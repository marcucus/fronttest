import { Link, Redirect, redirectTo, RouteComponentProps } from "@reach/router";
import React, { useState, useEffect} from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import Google from "../assets/socials/google.svg";
import axios from 'axios';
import { ToastContainer , toast} from 'react-toastify';
import { ReactSession } from 'react-client-session';

export const Login: React.FC<RouteComponentProps> = () => {
    const token:string="";
    const [state, setState] = useState({
      name:"",
      email:"",
      picture:"",
      profile_loaded:false
    })

      const onSuccess = async(res:any) => {
        console.log('Login Success: currentUser:', res.profileObj);
        axios
          .post('http://127.0.0.1:3333/authentication/auth', { token: res.tokenId })
          .then(response => {
            ReactSession.set("Name", res.profileObj.givenName);
            ReactSession.set("Lastname",  res.profileObj.familyName);
            ReactSession.set("mail",  res.profileObj.email);
            ReactSession.set("picture",  res.profileObj.imageUrl);
            ReactSession.set("userToken", response.data);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      const onFailure = (res: any) => {
        console.log('Login failed: res:', res);
    }
    return(
        <>
        {!ReactSession.get('userToken') ? (
          <div>
          <GoogleLogin
            clientId="749607665220-nm0esgq5d60qi92s8svuevekktvdf150.apps.googleusercontent.com"
            buttonText="Se connecter avec Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={renderProps => (
              <button
                  type="submit"
                  onClick={renderProps.onClick} disabled={renderProps.disabled}
                  className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 ease-in-out bg-white rounded-full shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-xl"
            >
                <img src={Google} alt="Google" className="flex-shrink-0 w-9" />
                <div className="mx-auto">
                    Se connecter avec Google
                </div>
            </button>
            )}
            isSignedIn={true}
          />
      </div>
        ):(
          <Link to="/ranking/list" className="font-bold">
            <button className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 ease-in-out bg-white rounded-sm shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-xl">
              Mes sites
            </button>
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