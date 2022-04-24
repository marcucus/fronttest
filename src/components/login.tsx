import { Link, RouteComponentProps } from "@reach/router";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { data } from "jquery";
import { useEffect } from "react";
import Google from "../assets/socials/google.svg";

export const Login: React.FC<RouteComponentProps> = () => {
    function useEffect() {
        fetch("http://localhost:3333/authentication")
        .then(async response => {
            const dataLog = response.json();
            return dataLog;
        })
        }
    return(
        <>
            <button
            type="submit"
            onClick={useEffect}
                className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 ease-in-out bg-white rounded-full shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-xl"
            >
                <img src={Google} alt="Google" className="flex-shrink-0 w-9" />
                <div className="mx-auto">
                    Se connecter avec Google
                </div>
            </button>
        </>)
}