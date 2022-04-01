import React, { ReactElement, SVGProps } from "react";

import { ClockIcon, CogIcon, SearchIcon } from "@heroicons/react/solid";

import { PlusIcon, ChevronDoubleLeftIcon } from "@heroicons/react/outline";
import { Three } from "./components/Three";
import { Tooltip } from "../../UI/Tooltip";

const Item: React.FC<{
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}> = ({ Icon, children }) => (
  <div className="px-2">
    <div className="flex rounded items-center px-2 py-1 space-x-2 text-sm text-gray-900 cursor-pointer hover:bg-gray-100">
      {<Icon className="h-4 w-4 text-gray-400" />}
      <span>{children}</span>
    </div>
  </div>
);

const NavbarContainer: React.FC = (props) => (
  <div className="flex flex-col relative z-20 flex-shrink-0 h-screen border-r w-72 bg-white">
    {props.children}
  </div>
);

const NavbarFooter: React.FC = () => (
  <div className="px-2 mt-auto py-2">
    <div className="flex items-center rounded px-2 py-2 space-x-2 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100">
      <PlusIcon className="w-4 h-4"></PlusIcon>
      <span>Nouvelle page</span>
    </div>
  </div>
);

const NavbarPages: React.FC = (props) => (
  <div className="mt-5">
    <div className="flex items-center px-2 py-1 space-x-2 text-gray-400">
      <span className="px-1 text-sm">Pages</span>
    </div>

    {props.children}
  </div>
);

export const Navbar: React.FC<{ dropdown: ReactElement }> = (props) => (
  <NavbarContainer>
    <div className="flex items-center">
      {props.dropdown}
      <Tooltip direction="bottom" label="Cacher le menu">
        <div className="hover:bg-gray-100 text-gray-700 rounded transition-all ease-in-out duration-300 p-2 cursor-pointer">
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </div>
      </Tooltip>
    </div>

    <div className="mt-5">
      <Item Icon={SearchIcon}>Recherche</Item>
      <Item Icon={ClockIcon}>Dernières modifications</Item>
      <Item Icon={CogIcon}>Paramètres et membres</Item>
    </div>

    <NavbarPages>
      <Three
        depth={0}
        item={{
          label: "home",
          url: "/",
        }}
      ></Three>

      <Three
        depth={0}
        item={{
          label: "art-japonais",
          url: "cuisine",
          children: [
            {
              label: "art-brut",
              url: "art-brut",
            },
            {
              label: "art-japonais-bambou",
              url: "art-japonais-bambou",
            },
          ],
        }}
      ></Three>
    </NavbarPages>

    <NavbarFooter />
  </NavbarContainer>
);
