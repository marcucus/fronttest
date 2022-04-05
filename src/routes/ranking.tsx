import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { TableRank } from "../components/tableRank";

export const RankingTable: React.FC<RouteComponentProps> = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <TableRank></TableRank>
    </div>
    </>
  );
};