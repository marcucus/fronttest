import React from "react";
import { RouteComponentProps } from "@reach/router";
import { LayoutDashboard } from "../components/LayoutDashboard/LayoutDashboard";
import { Description } from "../components/Description/Description";
import { FilterAndSearchActionBar } from "../components/FilterAndSearchActionBar/FilterAndSearchActionBar";
import { AllPages } from "../components/IndexedTable/IndexedTable";
import { Title } from "../components/Title/Title";
import { Transition } from "@headlessui/react";
import { FormattedMessage } from "../components/FormattedMessage/FormattedMessage";
import { Pagination } from "../components/Pagination/Pagination";
import { IndexationRunButton } from "../components/IndexationRunButton/IndexationRunButton";

export const PagesPage: React.FC<RouteComponentProps> = () => {
  return (
    <LayoutDashboard>
      <Transition
        show
        appear
        enter="duration-1000 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="">
          <div className="flex justify-between w-full">
            <Title>
              <FormattedMessage id="pages/title" />
            </Title>
            <IndexationRunButton />
          </div>

          <div className="mt-4"></div>
          <Description>
            <FormattedMessage id="pages/description" />
          </Description>
        </div>
      </Transition>

      <Transition
        show
        appear
        enter="duration-1000 delay-200 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <FilterAndSearchActionBar />
      </Transition>

      <div className="mt-2"></div>

      <Transition
        show
        appear
        enter="duration-1000 delay-500 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <AllPages />
        <Pagination />
      </Transition>
    </LayoutDashboard>
  );
};
