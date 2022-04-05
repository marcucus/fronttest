import { Redirect, redirectTo, RouteComponentProps } from "@reach/router";
import { render } from "@testing-library/react";
import GoogleLogin from "react-google-login";
import googleLogin from "../lib/googleLogin";

export const Login: React.FC<RouteComponentProps> = () => {
    return(
        <>
        <h1>Login with Google</h1>
        <GoogleLogin clientId="749607665220-nm0esgq5d60qi92s8svuevekktvdf150.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={async (response) => {
                const tokens = await googleLogin(response);
                alert('tu es connecté !');
            } }
            onFailure={(response) => {
                alert("Error while logging in w/Google 2");
            } }
            cookiePolicy={"single_host_origin"} />
        </>)
}