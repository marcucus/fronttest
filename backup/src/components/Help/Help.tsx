import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export const Help: React.FC<{ langKey: string }> = (props) => {
  return (
    <div className="fixed bottom-0 right-0 p-4">
      <a
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full"
        href={
          props.langKey === "en"
            ? "https://twitter.com/KM_Marques/status/1466516786589937674?s=20"
            : "https://twitter.com/KM_Marques/status/1466517002047176709?s=20"
        }
      >
        <QuestionMarkCircleIcon className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};
