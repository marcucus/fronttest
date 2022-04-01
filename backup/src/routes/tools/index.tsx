import React from "react";
import { RouteComponentProps } from "@reach/router";
import { SelectATool } from "../../components/SelectATool/SelectATool";

export const ToolsPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <SelectATool />
    </>
  );
};
