import { InputFilterName } from "../InputFilterName/InputFilterName";
import { AdvancedFilterPanel } from "../AdvancedFilterPanel/AdvancedFilterPanel";
import {
  connector,
  ContainerProps,
} from "./containers/FilterAndSearchActionBar.containers";

import { IndexationType, PageEntity } from "interfaces.foudroyer.com";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import {
  ArrowsExpandIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { ReactElement } from "react";

const Action: React.FC<{
  tooltip: string | ReactElement;
  tooltipAlignment: "center" | "left";
  className: string;
  onClick: () => void;
}> = ({ children, tooltip, className, tooltipAlignment, onClick }) => (
  <div
    className={`relative group flex items-center px-3 text-gray-400 hover:bg-white transition duration-300 ease-in-out rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    onClick={onClick}
  >
    {children}
    <div
      className={`absolute z-10 pointer-events-none bottom-0 pt-2 transition-all duration-300 ease-in-out transform translate-y-full opacity-0 group-hover:opacity-100 ${
        tooltipAlignment === "center" ? "translate-x-1/2 right-1/2" : "right-0"
      }`}
    >
      <div className="p-2 px-4 text-white transition-all duration-300 ease-in-out transform translate-y-4 bg-gray-900 rounded-md group-hover:translate-y-0 whitespace-nowrap bg-opacity-90">
        {tooltip}
      </div>
    </div>
  </div>
);

type Props = {
  onToggleAdvancedFilter: () => void;
  onToggleShowInfo: () => void;
  onToggleFilter: (type: PageEntity["indexation_state"]) => void;
  filterIndexationState: PageEntity["indexation_state"] | null;
  isPanelOpen: boolean;
  isInfoAllOpen: boolean;
};

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <>
      <div className="flex w-full mt-8 space-x-2">
        <InputFilterName />

        <Action
          onClick={props.onToggleShowInfo}
          tooltipAlignment="center"
          className={`hover:text-blue-500 ${
            props.isInfoAllOpen ? "bg-white text-blue-500" : "bg-gray-100"
          }`}
          tooltip={
            props.isInfoAllOpen ? (
              <FormattedMessage id="pages/filter/close-all/tooltip" />
            ) : (
              <FormattedMessage id="pages/filter/open-all/tooltip" />
            )
          }
        >
          <ArrowsExpandIcon className="w-6 h-6" aria-hidden="true" />
        </Action>

        <Action
          onClick={() => props.onToggleFilter(IndexationType.INDEXED)}
          tooltipAlignment="left"
          tooltip={<FormattedMessage id="pages/filter/indexed/tooltip" />}
          className={`hover:text-green-500 ${
            props.filterIndexationState === IndexationType.INDEXED
              ? "text-green-500 bg-white"
              : "bg-gray-100"
          }`}
        >
          <CheckCircleIcon className="w-6 h-6" aria-hidden="true" />
        </Action>

        <Action
          onClick={() => props.onToggleFilter(IndexationType.NOT_INDEXED)}
          tooltipAlignment="left"
          tooltip={<FormattedMessage id="pages/filter/not-indexed/tooltip" />}
          className={`hover:text-red-500 ${
            props.filterIndexationState === IndexationType.NOT_INDEXED
              ? "text-red-500 bg-white"
              : "bg-gray-100"
          }`}
        >
          <XCircleIcon className="w-6 h-6" aria-hidden="true" />
        </Action>
      </div>

      <AdvancedFilterPanel />
    </>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const FilterAndSearchActionBar = connector(Container);
