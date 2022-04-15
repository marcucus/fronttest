import React, { Fragment } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { TableRank } from "../components/tableRank";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const RankingTable: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Navbar></Navbar>
       <div className="absolute top-15 left-0 p-4">
        <Link to="/ranking/list" className="group flex items-center cursor-pointer transform duration-300 transition-all">
          <div className="relative z-10 p-2 text-gray-500 transition-all duration-300 ease-in-out rounded bg-gray-50 group-hover:bg-gray-200 group-hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
              </path>
            </svg>
          </div>
              <div className="p-2 text-sm font-semibold text-gray-200 uppercase transition-all duration-300 ease-in-out transform -translate-x-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                Retour
              </div>
        </Link>
          </div>
        <TableRank></TableRank>
        <div className="text-white top-full">
    <Footer></Footer>
  </div>
    </>
  );
};