import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Pricing } from "../components/pricing";

export const PricingPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Pricing></Pricing>
    </div>
    <Footer></Footer>
    </>
  );
};