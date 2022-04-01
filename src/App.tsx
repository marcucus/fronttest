import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from "react-google-login";
import googleLogin from "./lib/googleLogin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Login with Google</h1>
        <GoogleLogin clientId={`${process.env.PUBLIC_GOOGLE_CLIENT_ID}`}
                   buttonText="Login with Google"
                   onSuccess={async (response) => {
                     const tokens = await googleLogin(response);
                     if(!tokens){
                       alert("Error while logging in with Google")
                     } else {
                       //suite connection
                     }
                   }}
                   onFailure={(response) => {
                     alert("Error while logging in w/Google 2")
                   }}
                   cookiePolicy={"single_host_origin"}
      />
      </header>
    </div>
  );
}

export default App;
