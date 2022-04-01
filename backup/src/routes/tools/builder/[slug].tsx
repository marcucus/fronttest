import React from "react";
import { RouteComponentProps } from "@reach/router";

import { Editor } from "../../../components/builder/Editor/Editor";
import { Navbar } from "../../../components/Builder/Navbar";
import { Dropdown } from "../../../components/Builder/Navbar/components/Dropdown";
import { Header } from "../../../components/Builder/Header";

const Content = () => (
  <div className="flex-1 flex flex-col overflow-hidden w-full bg-gray-100 h-screen">
    <Header />

    <div className="p-4 overflow-hidden">
      <div className="mx-auto h-full flex w-full overflow-hidden rounded-xl border">
        <div className="overflow-auto h-full">
          <Editor />
        </div>
      </div>
    </div>
  </div>
);

export const ToolsBuilderSlugRoute: React.FC<RouteComponentProps> = () => {
  return (
    <div className="flex text-gray-900">
      <Navbar
        dropdown={
          <Dropdown
            currentWebsite={{
              url: "https://www.sudoku.academy",
              image: "https://www.sudoku.academy/favicon.png",
              name: "Sudoku Academy",
            }}
            websites={[
              {
                url: "https://www.sudoku.academy",
                image: "https://www.sudoku.academy/favicon.png",
                name: "Sudoku Academy",
              },
              {
                url: "https://www.temple-du-haiku.fr",
                image: "https://www.temple-du-haiku.fr/manifest/192x192.png",
                name: "Temple du Haïku",
              },
            ]}
          ></Dropdown>
        }
      />
      <Content></Content>
    </div>
  );
};
