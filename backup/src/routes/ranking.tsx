import React, { Fragment } from "react";
import { RouteComponentProps } from "@reach/router";
import { ListRank } from "../components/ListRank/ListRank";

export const RankingPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <ListRank></ListRank>
    </div>
    </>
  );
};