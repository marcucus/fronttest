import {
  HashtagIcon,
  ChevronRightIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { Tooltip } from "../../../../UI/Tooltip";

type ThreeBranch = {
  label: string;
  url: string;
  children?: ThreeBranch[];
};

export const Three: React.FC<{ item: ThreeBranch; depth: number }> = (
  props
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${props.depth === 0 ? "px-2" : ""} select-none`}>
      <div className="px-1 py-1 space-x-2 transition-all ease-in-out duration-300 rounded text-sm text-gray-900 cursor-pointer hover:bg-gray-100">
        <div
          className={`flex items-center`}
          style={{ paddingLeft: props.depth * 8 + "px" }}
        >
          <div
            className={`p-0.5 hover:bg-gray-200 transition-all ease-in-out duration-300 rounded`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {props.item.url === "/" && (
              <HashtagIcon
                className={`w-4 h-4 text-gray-700 transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            )}

            {props.item.url !== "/" && (
              <ChevronRightIcon
                className={`w-4 h-4 text-gray-700 transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            )}
          </div>
          <span className="pl-1">{props.item.label}</span>
          <div className="ml-auto flex items-center">
            <Tooltip
              direction="right"
              label="Ajouter une page à cette catégorie"
            >
              <div className="ml-auto rounded p-0.5 text-gray-400 transition-all ease-in-out duration-300 hover:text-gray-900 hover:bg-gray-200">
                <PlusSmIcon className={`w-4 h-4`} />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      {isOpen &&
        props.item.children?.map((caret) => (
          <Three item={caret} depth={props.depth + 1} />
        ))}

      {isOpen && (props.item.children?.length === 0 || !props.item.children) && (
        <div
          className={`${
            props.depth === 0 ? "px-2" : ""
          } select-none px-3 pl-5 text-gray-400 cursor-pointer text-sm rounded transition-colors ease-in-out duration-150 hover:text-gray-900 flex items-center py-1 hover:bg-gray-100`}
        >
          <div style={{ paddingLeft: (props.depth + 1) * 8 + "px" }}>
            Créer une nouvelle page
          </div>
        </div>
      )}
    </div>
  );
};
