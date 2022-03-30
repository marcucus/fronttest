import React from "react";
import { DropdownButton, DropdownMenu } from ".";
import { Menu } from "@headlessui/react";

export default {
  title: "Builder/Navbar/Dropdown",
};

export const Button = () => (
  <>
    <Menu>
      <DropdownButton
        image="https://www.sudoku.academy/favicon.png"
        url="https://www.sudoku.academy"
        name="Sudoku Academy"
      />
    </Menu>
  </>
);

export const List = () => (
  <>
    <Menu>
      <DropdownMenu
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
    </Menu>
  </>
);
