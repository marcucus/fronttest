import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { ListSite } from "../components/listSite";

export const RankingSite: React.FC<RouteComponentProps> = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <ListSite></ListSite>
    </div>
    </>
  );
};