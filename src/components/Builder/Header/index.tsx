import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button";
import { Tooltip } from "../../UI/Tooltip";

const UrlEdit = () => (
  <></>
  // <div className="absolute bottom-0 transform translate-y-full left-0 bg-gray-100 p-1 border shadow-sm rounded-md">
  //   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  //     <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
  //   </div>
  //   <input
  //     autoFocus
  //     type="email"
  //     name="email"
  //     id="email"
  //     className=" focus:ring-indigo-500 pl-8 focus:border-indigo-500 w-96 block bg-white sm:text-sm border-gray-200 rounded-md"
  //     placeholder="you@example.com"
  //   />
  // </div>
);

const UrlPart: React.FC<{ editable?: boolean }> = (props) => {
  return (
    <div className="relative">
      <div className="py-1 px-2 text-sm rounded cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300">
        {props.children}
      </div>
      {props.editable && <UrlEdit />}
    </div>
  );
};

const UrlDivision: React.FC = (props) => (
  <div className="text-sm text-gray-300">/</div>
);

export const Header: React.FC = () => {
  return (
    <div className="w-full relative z-10 flex flex-shrink-0 items-center justify-between px-2 h-14 border-b bg-white">
      <div className="flex items-center">
        <UrlPart>home</UrlPart>
        <UrlDivision />
        <UrlPart>art-japonais</UrlPart>
        <UrlDivision />
        <UrlPart editable>comment-preparer-le-the</UrlPart>
      </div>

      <div className="flex items-center space-x-1">
        <ButtonSecondary>Sauvegarder</ButtonSecondary>
        <ButtonPrimary>Publier</ButtonPrimary>
        <Tooltip direction="bottom" label="Paramètres et Seo" align="right">
          <ButtonSecondary>
            <DotsHorizontalIcon className="h-4 w-4" />
          </ButtonSecondary>
        </Tooltip>
      </div>
    </div>
  );
};
