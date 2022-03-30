import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { Transition } from "@headlessui/react";
import { LayoutDashboard } from "../components/LayoutDashboard/LayoutDashboard";
import { Description } from "../components/Description/Description";
import { RecentsPages } from "../components/IndexedTable/IndexedTable";
import { Title } from "../components/Title/Title";
import { Stats } from "../components/Stats/Stats";
import { ButtonSecondary } from "../components/UI/Button";
import { FormattedMessage } from "../components/FormattedMessage/FormattedMessage";
import { RefreshSitemapAndIndexation } from "../components/RefreshSitemapAndIndexation/RefreshSitemapAndIndexation";

export const DashboardPage: React.FC<RouteComponentProps> = () => {
  return (
    <LayoutDashboard>
      <Transition
        show
        appear
        enter="duration-1000 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <>
          <Title>
            <FormattedMessage id="sync/title" />
          </Title>
          <div className="mt-4"></div>
          <Description>
            <FormattedMessage id="sync/description" />
          </Description>
        </>
      </Transition>

      <div className="mt-8"></div>

      <Transition
        show
        appear
        enter="duration-1000 delay-100 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <RefreshSitemapAndIndexation />
      </Transition>

      <div className="mt-16"></div>

      <Transition
        show
        appear
        enter="duration-1000 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <>
          <Title>
            <FormattedMessage id="reports/title" />
          </Title>
          <div className="mt-4"></div>
          <Description>
            <FormattedMessage id="reports/description" />
          </Description>
        </>
      </Transition>

      <div className="mt-8"></div>

      <Transition
        show
        appear
        enter="duration-1000 delay-100 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <Stats />
      </Transition>

      <div className="mt-16"></div>

      <Transition
        show
        appear
        enter="duration-1000 delay-300 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <>
          <Title>
            <FormattedMessage id="reports/pages-recently/title" />
          </Title>
          <div className="mt-4"></div>
          <Description>
            <FormattedMessage id="reports/pages-recently/description" />
          </Description>
        </>
      </Transition>

      <div className="mt-8"></div>

      <Transition
        show
        appear
        enter="duration-1000 delay-500 transition-all ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <>
          <RecentsPages />
          <div className="mt-4 text-center">
            <Link to="/tools/indexation/pages/">
              <ButtonSecondary onClick={() => false}>
                <FormattedMessage id="reports/pages-recently/more" />
              </ButtonSecondary>
            </Link>
          </div>
        </>
      </Transition>
    </LayoutDashboard>
  );
};
