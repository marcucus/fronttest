import { Link } from "@reach/router";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import {
  LightningBoltIcon,
  PresentationChartLineIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import { ComingSoonModal } from "../ComingSoonModal/ComingSoonModal";
import { Cancel } from "../Cancel/Cancel";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { connector, ContainerProps } from "./containers/SelectATool.containers";
import classNames from "classnames";

const items = [
  {
    id: "indexation",
    name: "Indexation",
    description: "Indexez vos page aussi vite que la lumière.",
    href: "/tools/indexation/",
    iconColor: "bg-yellow-400",
    icon: LightningBoltIcon,
  },
  {
    id: "builder",
    name: "Builder",
    description:
      "Construisez votre site web sans vous occuper de toutes les optimisations. On se charge de tout pour vous.",
    href: null,
    iconColor: "bg-gray-900",
    icon: TemplateIcon,
  },
  {
    id: "ranking",
    name: "Ranking",
    description:
      "Suivez les mots-clés et leurs positions dans les moteurs de recherches",
    href: null,
    iconColor: "bg-blue-500",
    icon: PresentationChartLineIcon,
  },
];

type Props = {
  onSelectBuilder: () => void;
  onSelectRanking: () => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <>
      <div className="min-h-screen relative bg-gray-50 flex items-center justify-center">
        <Cancel to="/">
          <FormattedMessage id="tools/back" />
        </Cancel>

        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-medium text-gray-900">
            <FormattedMessage id="tools/title" />
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            <FormattedMessage id="tools/description" />
          </p>
          <ul className="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>
                <div className="relative group py-4 flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span
                      className={classNames(
                        item.iconColor,
                        "inline-flex items-center justify-center h-10 w-10 rounded-lg"
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 ">
                    <div className="text-sm font-medium text-gray-900">
                      {item.href && (
                        <Link to={item.href}>
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      )}
                      {!item.href && (
                        <div
                          onClick={() => {
                            if (item.id === "builder") props.onSelectBuilder();
                            if (item.id === "ranking") props.onSelectRanking();
                          }}
                          className="cursor-pointer"
                        >
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ComingSoonModal />
    </>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const SelectATool = connector(Container);
