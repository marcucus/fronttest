import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import CheckCircleIcon from "@heroicons/react/outline/CheckCircleIcon";
import InformationCircleIcon from "@heroicons/react/outline/InformationCircleIcon";
import XCircleIcon from "@heroicons/react/outline/XCircleIcon";
import ExclamationIcon from "@heroicons/react/outline/ExclamationIcon";
import XIcon from "@heroicons/react/solid/XIcon";
import {
  connector,
  ContainerProps,
} from "./containers/Notifications.container";
import { NotificationEntity } from "../../entities/NotificationEntity";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { ButtonPrimary, ButtonSecondary } from "../UI/Button";

const Notification: React.FC<{
  onRemove: () => any;
  type: NotificationEntity["type"];
  onValidate?: Function;
  message: NotificationEntity["message"];
}> = (props) => {
  return (
    <Transition
      appear={true}
      show
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {props.type === "success" && (
                <CheckCircleIcon
                  className="w-6 h-6 text-green-400"
                  aria-hidden="true"
                />
              )}
              {props.type === "info" && (
                <InformationCircleIcon
                  className="w-6 h-6 text-blue-400"
                  aria-hidden="true"
                />
              )}
              {props.type === "error" && (
                <XCircleIcon
                  className="w-6 h-6 text-red-400"
                  aria-hidden="true"
                />
              )}
              {props.type === "warning" && (
                <ExclamationIcon
                  className="w-6 h-6 text-yellow-400"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                {props.type === "success" && (
                  <FormattedMessage id="notifications/success" />
                )}
                {props.type === "error" && (
                  <FormattedMessage id="notifications/error" />
                )}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <FormattedMessage id={props.message} />
              </p>
              {props.onValidate && (
                <div className="flex mt-4 space-x-2">
                  <ButtonPrimary
                    onClick={() => {
                      if (props.onValidate) {
                        props.onValidate();
                        props.onRemove();
                      }
                    }}
                  >
                    <FormattedMessage id="notifications/actions/validate" />
                  </ButtonPrimary>

                  <ButtonSecondary onClick={() => props.onRemove()}>
                    <FormattedMessage id="notifications/actions/decline" />
                  </ButtonSecondary>
                </div>
              )}
            </div>
            <div className="flex flex-shrink-0 ml-4">
              <button
                className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={props.onRemove}
              >
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export type NotificationsProps = {
  notifications: Array<NotificationEntity>;
  onRemove?: Function;
  test?: Function;
};

export const Wrapper: React.FC<NotificationsProps> = ({
  notifications,
  onRemove = () => false,
}) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
        {notifications.map(({ type, message, id, onValidate }) => (
          <Notification
            key={id}
            type={type}
            message={message}
            onRemove={() => onRemove(id)}
            {...(onValidate ? { onValidate } : {})}
          />
        ))}
      </div>
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const Notifications = connector(Container);
