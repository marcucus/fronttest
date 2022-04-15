import React, { Fragment } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { ListSite } from "../components/listSite";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const RankingSite: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Navbar></Navbar>
        <ListSite></ListSite>
          <div className="relative w-full bottom-0">
            <Footer></Footer>
          </div>
    </>
  );
};