import { Link, RouteComponentProps } from "@reach/router";
import Google from "../assets/socials/google.svg";

export const Login: React.FC<RouteComponentProps> = () => {
    return(
        <>
        <Link to="/ranking/list">
            <button
            type="submit"
                className="inline-flex items-center w-full px-2 py-2 mt-8 text-lg font-medium text-gray-900 ease-in-out bg-white rounded-full shadow-lg cursor-pointer lg:mt-0 hover:bg-gray-50 hover:shadow-xl"
            >
                <img src={Google} alt="Google" className="flex-shrink-0 w-9" />
                <div className="mx-auto">
                    Se connecter avec Google
                </div>
            </button>
        </Link>
        </>)
}