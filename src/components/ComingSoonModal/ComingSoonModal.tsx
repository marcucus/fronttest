import React from "react";
import { Transition } from "@headlessui/react";
import {
  connector,
  ContainerProps,
} from "./containers/ComingSoonModal.containers";
import { ButtonPrimary, ButtonSecondary } from "../UI/Button";
import { BackgroundShapes } from "../BackgroundShapes";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";

type Props = {
  isOpen: boolean;
  type: "yandex" | "bing" | "builder" | "ranking";
  onClose: () => void;
};

export const Wrapper: React.FC<Props> = (props) => {
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

          <main className="max-w-3xl px-4 mx-auto mt-16">
            <div className="">
              <h1 className="mx-auto text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-t from-gray-900 to-gray-700 sm:text-5xl md:text-6xl">
                {props.type === "yandex" && (
                  <FormattedMessage id="coming-soon/yandex/title" />
                )}
                {props.type === "builder" && (
                  <FormattedMessage id="coming-soon/builder/title" />
                )}
                {props.type === "ranking" && (
                  <FormattedMessage id="coming-soon/ranking/title" />
                )}
                {props.type === "bing" && (
                  <FormattedMessage id="coming-soon/bing/title" />
                )}
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {props.type === "yandex" && (
                  <FormattedMessage id="coming-soon/yandex/description" />
                )}
                {props.type === "bing" && (
                  <FormattedMessage id="coming-soon/bing/description" />
                )}
                {props.type === "builder" && (
                  <FormattedMessage
                    id="coming-soon/builder/description"
                    values={{
                      br: () => <br />,
                    }}
                  />
                )}
                {props.type === "ranking" && (
                  <FormattedMessage
                    id="coming-soon/ranking/description"
                    values={{
                      br: () => <br />,
                    }}
                  />
                )}
              </p>

              <div className="max-w-md mx-auto mt-5 space-x-2 sm:flex sm:justify-center md:mt-8">
                {props.type !== "builder" && props.type !== "ranking" && (
                  <a
                    href="https://www.patreon.com/kevin_marques"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <ButtonPrimary size="lg" onClick={() => false}>
                      <FormattedMessage id="coming-soon/button/patreon" />
                    </ButtonPrimary>
                  </a>
                )}

                <ButtonSecondary size="md" onClick={props.onClose}>
                  <FormattedMessage id="coming-soon/button/ok" />
                </ButtonSecondary>
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

export const ComingSoonModal = connector(Container);
