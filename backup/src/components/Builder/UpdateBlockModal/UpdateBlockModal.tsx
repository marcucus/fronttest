import React, { useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import {
  connector,
  ContainerProps,
} from "./containers/UpdateBlockModal.container";
import { HeadingSelect } from "./components/HeadingSelect/HeadingSelect";
import classNames from "classnames";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Navbar: React.FC = (props) => (
  <div className="flex-shrink-0 bg-gray-100 w-60 py-4">{props.children}</div>
);

const NavbarItem: React.FC<{ active?: boolean }> = (props) => (
  <div
    className={`${
      props.active ? "font-medium bg-gray-200 text-gray-900" : "text-gray-700"
    } px-4  text-sm flex items-center space-x-2 cursor-pointer hover:bg-gray-200 py-1`}
  >
    <span>{props.children}</span>
  </div>
);

const NavbarSeparator: React.FC = (props) => (
  <div className="mt-4 px-4 uppercase text-gray-500 text-xs py-1">
    {props.children}
  </div>
);

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex-grow flex flex-col">
        <Switch.Label
          as="span"
          className="text-sm font-medium text-gray-900"
          passive
        >
          Afficher le contenu ?
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          Vous pouvez choisir d'afficher ou ne pas afficher ce texte sur la
          page. Cela vous permet de personnaliser le composant à souhait
        </Switch.Description>
      </span>

      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

const Content = () => (
  <div className="p-4 py-8 w-full">
    <div className="w-full mx-auto max-w-3xl space-y-10">
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Modifier le contenu
        </label>

        <div className="mt-1">
          <textarea
            rows={4}
            name="comment"
            id="comment"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            defaultValue={"Découvrez l'amour du thé japonais"}
          />
        </div>
      </div>
      <hr />

      <HeadingSelect />

      <hr />
      <Toggle />
    </div>
  </div>
);

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Transition
      show={props.isOpen}
      appear
      className="fixed top-0 bottom-0 z-50 left-0 right-0 w-full h-screen p-8 overflow-hidden bg-gray-900 opacity-0 bg-opacity-80"
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
          "h-full overflow-auto transform flex transition-all rounded-md shadow-2xl bg-gray-50"
        }
      >
        <Navbar>
          <NavbarSeparator>Modifier les valeurs</NavbarSeparator>
          <NavbarItem active>Label</NavbarItem>
          <NavbarItem>Titre</NavbarItem>
          <NavbarItem>Sous-titre</NavbarItem>
          <NavbarItem>Formulaire</NavbarItem>
          <NavbarItem>Bouton</NavbarItem>
          <NavbarItem>Image</NavbarItem>
          <NavbarSeparator>Administration</NavbarSeparator>
          <NavbarItem>Supprimer</NavbarItem>
        </Navbar>

        <Content />
      </Transition>
    </Transition>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const UpdateBlockModal = connector(Container);
