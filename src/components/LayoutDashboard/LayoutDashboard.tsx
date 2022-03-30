import { LightningBoltIcon, TemplateIcon } from "@heroicons/react/outline";
import { Link } from "@reach/router";
import classNames from "classnames";
import { useState, useEffect } from "react";

import Logo from "../../assets/logo/logo.svg";
import { ITranslations } from "../../interfaces/ITranslations";
import { ComingSoonModal } from "../ComingSoonModal/ComingSoonModal";
import { CTA } from "../CTA/CTA";
import { EndMessage } from "../EndMessage/EndMessage";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { FullPageLoader } from "../FullPageLoader/FullPageLoader";
import { FullPageLoaderIndexation } from "../FullPageLoaderIndexation/FullPageLoaderIndexation";
import { UpdateCredentialsModal } from "../UpdateCredentialsModal/UpdateCredentialsModal";
import { UpdateSitemapModal } from "../UpdateSitemapModal/UpdateSitemapModal";
import {
  connector,
  ContainerProps,
} from "./containers/LayoutDashboard.containers";

const navigation: {
  name: ITranslations["keys"];
  href: string;
  icon: any;
}[] = [
  {
    name: "navigation/dashboard",
    href: "/tools/indexation/dashboard/",
    icon: TemplateIcon,
  },
  {
    name: "navigation/pages",
    href: "/tools/indexation/pages/",
    icon: LightningBoltIcon,
  },
];

export const Wrapper: React.FC<{ image: string | null }> = ({
  children,
  image,
}) => {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    setCurrent(path);
  });

  return (
    <>
      <div className="flex-col flex-1 hidden min-h-screen py-8 pr-8 lg:flex bg-gray-50 pl-28">
        <main className="flex-1">{children}</main>
      </div>

      <main className="flex-1 lg:hidden">
        <EndMessage />
      </main>

      <div
        className="fixed inset-y-0 flex-col hidden w-20 lg:flex"
        style={{
          boxShadow: "0px 0px 80px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex flex-col flex-1 min-h-0 bg-gradient-to-t from-black to-gray-800">
          <div className="flex flex-col flex-1 px-2 pt-2">
            <div className="flex items-center justify-center flex-shrink-0 py-4 pb-2 rounded-md cursor-pointer">
              <img className="w-auto h-8" src={Logo} alt="Foudroyer" />
            </div>

            <nav className="flex-1 mt-2 space-y-2">
              {navigation.map((item) => {
                return (
                  <div className="relative w-full group" key={item.href}>
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        "group w-full text-gray-400 duration-300 ease-in-out transition-colors hover:text-yellow-400 flex items-center py-4 justify-center rounded-md",
                        item.href.startsWith(current || "$$$") &&
                          "text-yellow-400"
                      )}
                    >
                      <item.icon
                        className={classNames("h-6 w-6")}
                        aria-hidden="true"
                      />
                    </Link>
                    <div className="absolute top-0 flex items-center justify-center h-full transition-all duration-300 ease-in-out transform translate-x-full opacity-0 pointer-events-none group-hover:opacity-100 -right-4">
                      <div className="flex items-center justify-center px-4 py-2 font-medium text-gray-100 transition-all duration-300 ease-in-out transform -translate-x-4 bg-gray-900 rounded-md bg-opacity-90 whitespace-nowrap group-hover:translate-x-0">
                        <FormattedMessage id={item.name} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-shrink-0 p-2">
            <div className="relative flex-shrink-0 block w-full rounded-md group hover:bg-gray-900">
              <Link
                to="/tools/indexation/"
                className="flex items-center justify-center w-full py-3 transition-colors duration-300 ease-in-out rounded-md cursor-pointer group"
              >
                <img
                  className="block w-10 h-10 rounded-full"
                  src={image || ""}
                  alt=""
                />
              </Link>
              <div className="absolute top-0 flex items-center justify-center h-full transition-all duration-300 ease-in-out transform translate-x-full opacity-0 pointer-events-none group-hover:opacity-100 -right-4">
                <div className="flex items-center justify-center px-4 py-2 font-medium text-gray-100 transition-all duration-300 ease-in-out transform -translate-x-4 bg-gray-900 rounded-md bg-opacity-90 whitespace-nowrap group-hover:translate-x-0">
                  <FormattedMessage id="navigation/change" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComingSoonModal />
      <UpdateSitemapModal />
      <UpdateCredentialsModal />
      <FullPageLoaderIndexation />
      <CTA />
      <FullPageLoader />
    </>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const LayoutDashboard = connector(Container);
