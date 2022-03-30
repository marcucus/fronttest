import React from "react";
import { FilterIcon } from "@heroicons/react/solid";
import {
  connector,
  ContainerProps,
} from "./containers/InputFilterName.containers";
import { useIntl } from "react-intl";
import { ButtonPrimary } from "../UI/Button";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";

type Props = {
  value: string;
  onChange: (str: string) => void;
  onSearch: () => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  const intl = useIntl();
  return (
    <div className="flex w-full">
      <form
        className="relative flex items-stretch flex-grow focus-within:z-10"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSearch();
        }}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FilterIcon className="w-5 h-5 text-gray-300" aria-hidden="true" />
        </div>
        <input
          type={"text"}
          autoComplete="off"
          className="block w-full h-12 pl-10 mr-2 text-gray-900 placeholder-gray-400 border-gray-300 rounded-md focus:ring-blue-300 focus:border-blue-300"
          placeholder={intl.formatMessage({
            id: "pages/filter/input/placeholder",
          })}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value || "")}
        />
        <ButtonPrimary onClick={props.onSearch}>
          <FormattedMessage id="pages/filter/submit" />
        </ButtonPrimary>
      </form>
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const InputFilterName = connector(Container);
