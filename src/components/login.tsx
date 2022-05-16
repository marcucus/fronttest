import { Redirect, RouteComponentProps } from "@reach/router";
import React from "react";
import GoogleLogin from "react-google-login";
import Google from "../assets/socials/google.svg";
import axios from 'axios';
import { ReactSession } from 'react-client-session';

export const Login: React.FC<RouteComponentProps> = (props) => {
      const OnSuccess = async(res:any) => {
        console.log('Login Success: currentUser:', res.profileObj);
        axios
          .post('http://127.0.0.1:3333/authentication/auth', { token: res.tokenId })
          .then(response => {
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
          <div>
          <GoogleLogin
            clientId="749607665220-nm0esgq5d60qi92s8svuevekktvdf150.apps.googleusercontent.com"
            buttonText="Se connecter avec Google"
            onSuccess={OnSuccess}
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
        </>
        )
}