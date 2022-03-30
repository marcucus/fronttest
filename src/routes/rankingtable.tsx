import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { TableRank } from "../components/TableRank/TableRank";

export const RankingTablePage: React.FC<RouteComponentProps> = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <TableRank></TableRank>
    </div>
    </>
  );
};