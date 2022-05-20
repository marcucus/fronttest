import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Home } from "../components/home";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export const HomePage: React.FC<RouteComponentProps> = () => {
  localStorage.clear()
  return (
    <>
    <Navbar></Navbar>
        <Home></Home>
    <Footer></Footer>
    </>
  );
};
