import React from "react";
import { connector, ContainerProps } from "./containers/Pagination.containers";
import { ButtonPrimary } from "../UI/Button";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";

type Props = {
  page: number;
  total: number;
  limit: number;
  onPrevious: () => void;
  onSelect: (page: number) => void;
  onNext: () => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  const pages = Math.ceil(props.total / props.limit);
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center justify-between flex-1">
        <ButtonPrimary onClick={props.onPrevious}>
          <FormattedMessage id="pages/previous" />
        </ButtonPrimary>
        <nav className="relative z-0 inline-flex space-x-2">
          {Array.from({ length: pages }).map((v, index) => {
            const active = index + 1 === props.page;
            return (
              <button
                key={index}
                onClick={() => props.onSelect(index + 1)}
                className={`flex items-center justify-center w-10 h-10 text-lg font-medium transition-all duration-300 ease-in-out rounded-md shadow-none  ${
                  active
                    ? "text-yellow-500 bg-yellow-50 cursor-not-allowed"
                    : "bg-white hover:text-yellow-500 hover:bg-yellow-50"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </nav>

        <ButtonPrimary onClick={props.onNext}>
          <FormattedMessage id="pages/next" />
        </ButtonPrimary>
      </div>
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const Pagination = connector(Container);
