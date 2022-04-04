import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Login } from "../components/login";

export const AuthenticationPage: React.FC<RouteComponentProps> = () => {
  return <Login></Login>;
};
