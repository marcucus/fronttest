import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Tests } from "../components/test";
import { Footer } from "../components/footer";
import { NavbarUser } from "../components/navbarUser";


export const Test: React.FC<RouteComponentProps> = () => {
  return (
    <>
        <NavbarUser></NavbarUser>
        <Tests></Tests>
        <div className="relative w-full bottom-0">
            <Footer></Footer>
          </div>
    </>
  );
};