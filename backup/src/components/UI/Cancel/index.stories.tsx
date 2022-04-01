import React from "react";
import { Cancel } from ".";

export default {
  title: "Atoms/Cancel",
};

export const Base = () => (
  <div className="flex mt-10 justify-center items-end space-x-2">
    <Cancel to="#">Cancel</Cancel>
  </div>
);
