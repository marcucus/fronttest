import { Transition } from "@headlessui/react";
import React from "react";
import { ITranslations } from "../../interfaces/ITranslations";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { connector, ContainerProps } from "./containers/CTA.container";

type Props = {
  onCancel?: Function;
  onSubmit?: Function;
  title: ITranslations["keys"];
  isOpen: boolean;
  isLoading: boolean;
  description?: ITranslations["keys"];
  label?: {
    submit?: string;
    cancel?: string;
  };
};

export const CTAWrapper: React.FC<Props> = ({
  isOpen,
  onCancel = () => false,
  onSubmit = () => false,
  isLoading,
  label,
  title,
  description,
}) => (
  <>
    <Transition
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </Transition>

    <Transition
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>
          &#8203;
          <div
            className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                {/* <!-- Heroicon name: exclamation --> */}
                <svg
                  className="w-6 h-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-headline"
                >
                  <FormattedMessage id={title} />
                </div>
                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <FormattedMessage id={description} />
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
              <button
                type="button"
                onClick={() => (!isLoading ? onSubmit() : false)}
                className={`relative inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm ${
                  isLoading
                    ? "pl-10 bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading && (
                  <svg
                    className="absolute w-5 h-5 mr-3 -ml-1 text-white animate-spin left-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <FormattedMessage id="indexing/confirm/submit" />
              </button>
              <button
                type="button"
                onClick={() => onCancel()}
                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <FormattedMessage id="indexing/confirm/cancel" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </>
);

export const CTAContainer: React.FC<ContainerProps> = (props) => (
  <CTAWrapper {...props} />
);

export const CTA = connector(CTAContainer);
