import React, { Fragment } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { ListSite } from "../components/listSite";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const RankingSite: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Navbar></Navbar>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ListSite></ListSite>
        </div>
      <Footer></Footer>
    </>
  );
};