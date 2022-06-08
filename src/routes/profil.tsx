import React from "react";
import { redirectTo, RouteComponentProps } from "@reach/router";
import { Footer } from "../components/footer";
import { NavbarUser } from "../components/navbarUser";
import { Profil } from "../components/profil";

export const UserProfil: React.FC<RouteComponentProps> = () => {
  if(localStorage.getItem('userToken')==null || localStorage.getItem('userToken')==undefined)
  {
    redirectTo('/');
  }
  return (
    <>
      <NavbarUser></NavbarUser>
        <Profil></Profil>
          <div className="relative w-full bottom-0">
            <Footer></Footer>
          </div>
    </>
  );
};