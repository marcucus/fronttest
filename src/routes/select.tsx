import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Projects } from "../components/Projects/Projects";

export const SelectPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Projects />
    </>
  );
};
