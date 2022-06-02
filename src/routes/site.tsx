import React, { Fragment } from "react";
import { Link, redirectTo, RouteComponentProps } from "@reach/router";
import { ListSite } from "../components/listSite";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { NavbarUser } from "../components/navbarUser";
import { TableRank } from "../components/tableRank";

export const RankingSite: React.FC<RouteComponentProps> = () => {
  if(localStorage.getItem('userToken')==null || localStorage.getItem('userToken')==undefined)
  {
    redirectTo('/');
  }
  return (
    <>
      <NavbarUser></NavbarUser>
        <ListSite></ListSite>
        <TableRank></TableRank>
          <div className="relative w-full bottom-0">
            <Footer></Footer>
          </div>
    </>
  );
};