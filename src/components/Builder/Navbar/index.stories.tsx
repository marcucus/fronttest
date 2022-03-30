import React from "react";
import { Navbar } from ".";
import { Dropdown } from "./components/Dropdown/";

export default {
  title: "Builder/Navbar",
};

export const Base = () => (
  <>
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
        />
      }
    />
  </>
);
