import React from "react";
import { Transition } from "@headlessui/react";
import {
  connector,
  ContainerProps,
} from "./containers/UpdateSitemapModal.containers";
import ExclamationIcon from "@heroicons/react/solid/ExclamationIcon";
import { ButtonPrimary } from "../UI/Button";
import { BackgroundShapes } from "../BackgroundShapes";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { useIntl } from "react-intl";
import { Cancel } from "../Cancel/Cancel";

type Props = {
  isOpen: boolean;
  fetching: boolean;
  sitemap: string | null;
  onChange: (sitemap: string) => void;
  onSubmit: () => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  const intl = useIntl();

  return (
    <Transition
      show={props.isOpen}
      appear
      className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen p-8 overflow-hidden bg-gray-900 opacity-0 bg-opacity-80"
      enter="duration-150 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave=""
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Transition
        show={props.isOpen}
        appear
        enter="duration-500 delay-150 ease-in-out"
        enterFrom="scale-90 opacity-0"
        enterTo="scale-100 opacity-100"
        leave=""
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-90 opacity-0"
        className={
          "h-full overflow-auto transform transition-all rounded-md shadow-2xl bg-gray-50"
        }
      >
        <div className="relative pt-6 pb-16 overflow-hidden sm:pb-24">
          <BackgroundShapes step={0} />
          <Cancel to="/tools/indexation/">
            <FormattedMessage id="update-sitemap/close" />
          </Cancel>

          <main className="max-w-3xl px-4 mx-auto mt-16">
            <div className="text-center">
              <ExclamationIcon className="inline-block w-16 h-16 text-yellow-400"></ExclamationIcon>

              <h1 className="mx-auto text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-t from-gray-900 to-gray-700 sm:text-5xl md:text-6xl">
                <FormattedMessage id="update-sitemap/title" />
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                <FormattedMessage id="update-sitemap/description" />
              </p>

              <input
                type={"text"}
                autoComplete="off"
                className="block w-full pl-6 mt-8 text-lg text-gray-900 placeholder-gray-400 border-gray-300 rounded-md h-14 focus:ring-blue-300 focus:border-blue-300"
                placeholder={intl.formatMessage({
                  id: "update-sitemap/input/placeholder",
                })}
                value={props.sitemap || ""}
                onChange={(e) => props.onChange(e.target.value)}
              />

              <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
                <ButtonPrimary size="lg" onClick={props.onSubmit}>
                  {props.fetching ? (
                    <>
                      <div className="w-2 h-2 mx-1 bg-gray-900 rounded-full animate-bounceHarder"></div>
                      <div
                        className="w-2 h-2 mx-1 bg-gray-900 rounded-full animate-bounceHarder"
                        style={{ animationDelay: "50ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 mx-1 bg-gray-900 rounded-full animate-bounceHarder"
                        style={{ animationDelay: "100ms" }}
                      ></div>
                    </>
                  ) : (
                    <FormattedMessage id="update-sitemap/submit" />
                  )}
                </ButtonPrimary>
              </div>
            </div>
          </main>
        </div>
      </Transition>
    </Transition>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const UpdateSitemapModal = connector(Container);
