import React from "react";
import { redirectTo, RouteComponentProps } from "@reach/router";
import { Ranking } from "../components/ranking";
import { Footer } from "../components/footer";
import { NavbarUser } from "../components/navbarUser";

export const RankingSite: React.FC<RouteComponentProps> = () => {
  if(localStorage.getItem('userToken')==null || localStorage.getItem('userToken')==undefined)
  {
    redirectTo('/');
  }
  return (
    <>
      <NavbarUser></NavbarUser>
        <Ranking></Ranking>
          <div className="relative w-full bottom-0">
            <Footer></Footer>
          </div>
    </>
  );
};