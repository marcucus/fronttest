import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Login } from "../components/Login/Login";

export const AuthenticationPage: React.FC<RouteComponentProps> = () => {
  return <Login></Login>;
};
