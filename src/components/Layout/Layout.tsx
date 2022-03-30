import React, { ReactElement, useEffect, useState } from "react";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import { Link } from "@reach/router";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { ITranslations } from "../../interfaces/ITranslations";
import { Help } from "../Help/Help";
import classNames from "classnames";

const navigation: { name: ITranslations["keys"]; href: string }[] = [
  { name: "navigation/pages", href: "/pages/" },
  { name: "navigation/settings", href: "/settings/" },
];


export const Layout: React.FC<{
  disableNavigation?: boolean;
  title: string;
  langKey: string;
  actions?: ReactElement;
}> = (props) => {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    setCurrent(path);
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="pb-32 bg-gray-800">
          {!props.disableNavigation && (
            <nav className="bg-gray-800">
              <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="block">
                        <div className="flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.href.startsWith(current || "$$$")
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                            >
                              <FormattedMessage id={item.name} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="block">
                      <div className="flex items-center ml-4 md:ml-6">
                        <Link
                          to="/"
                          className="flex items-center text-gray-400 bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <SwitchHorizontalIcon
                            className="w-6 h-6"
                            aria-hidden="true"
                          />

                          {/* <img
                            className="w-8 h-8 ml-2 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          /> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          )}
          <header className="py-10">
            <div className="flex items-center justify-between px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">{props.title}</h1>
              {props.actions && <div>{props.actions}</div>}
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="px-4 pb-12 mx-auto max-w-6xl sm:px-6 lg:px-8">
            {props.children}
          </div>
        </main>

        <Help langKey={props.langKey} />
      </div>
    </>
  );
};
