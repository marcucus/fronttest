import React from "react";
import { Tooltip } from ".";
import { ButtonPrimary } from "../Button";

export default {
  title: "Atoms/Tooltip",
};

export const Base = () => (
  <div className="p-20 space-x-2">
    <Tooltip direction="left" label="Left">
      <ButtonPrimary>Left</ButtonPrimary>
    </Tooltip>
    <Tooltip direction="top" label="Top">
      <ButtonPrimary>Top</ButtonPrimary>
    </Tooltip>
    <Tooltip direction="bottom" label="Bottom">
      <ButtonPrimary>Bottom</ButtonPrimary>
    </Tooltip>
    <Tooltip direction="right" label="Right">
      <ButtonPrimary>Right</ButtonPrimary>
    </Tooltip>
  </div>
);
