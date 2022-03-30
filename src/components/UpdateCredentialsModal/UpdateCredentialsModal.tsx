import React from "react";
import { Transition } from "@headlessui/react";
import {
  connector,
  ContainerProps,
} from "./containers/UpdateCredentialsModal.containers";
import ExclamationIcon from "@heroicons/react/solid/ExclamationIcon";
import { ButtonPrimary } from "../UI/Button";
import { BackgroundShapes } from "../BackgroundShapes";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { InputFile } from "./components/InputFile";

type Props = {
  isOpen: boolean;
  fetching: boolean;
  value: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const Cancel: React.FC<{ onClick: () => void }> = (props) => (
  <div className="absolute top-0 left-0 z-20 p-4">
    <div
      onClick={props.onClick}
      className={`group flex items-center cursor-pointer transform duration-300 transition-all`}
    >
      <div className="relative z-10 p-2 text-gray-400 transition-all duration-300 ease-in-out rounded bg-gray-50 group-hover:bg-gray-200 group-hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  </div>
);

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Transition
      show={props.isOpen}
      appear
      className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen overflow-hidden bg-gray-900 opacity-0 md:p-8 bg-opacity-80"
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
          <div className="hidden lg:block">
            <BackgroundShapes step={0} />
          </div>
          <Cancel onClick={props.onClose} />

          <main className="max-w-3xl px-4 mx-auto mt-16">
            <div className="text-center">
              <ExclamationIcon className="inline-block w-16 h-16 text-yellow-400"></ExclamationIcon>

              <h1 className="mx-auto text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-t from-gray-900 to-gray-700 sm:text-5xl md:text-6xl">
                <FormattedMessage id="update-credentials/title" />
              </h1>

              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                <FormattedMessage id="update-credentials/description" />
              </p>

              <a
                href="https://youtu.be/gEzNV9sAs6g"
                target={"_blank"}
                rel="noreferrer"
                className="block max-w-md mx-auto text-base text-blue-400 hover:underline sm:text-lg md:text-xl md:max-w-3xl"
              >
                <FormattedMessage id="update-credentials/description/link" />
              </a>

              <InputFile onChange={props.onChange} />

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

export const UpdateCredentialsModal = connector(Container);
