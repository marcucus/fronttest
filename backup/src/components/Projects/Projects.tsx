import React, { useEffect } from "react";
import Pattern from "../../assets/background/clouds.svg";
import { connector, ContainerProps } from "./containers/Projects.containers";
import { Transition } from "@headlessui/react";
import {
  ItemContainer,
  ItemPrimary,
  ItemSecondary,
} from "../IndexedTable/IndexedTable";
import { ButtonPrimary, ButtonSecondary } from "../UI/Button";
import { MinusCircleIcon } from "@heroicons/react/solid";
import { ItemLoading } from "../ItemLoading/ItemLoading";
import { WebsiteEntity } from "interfaces.foudroyer.com";
import { navigate } from "@reach/router";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { EndMessage } from "../EndMessage/EndMessage";

const Indicator: React.FC = ({ children }) => (
  <div className="flex items-center justify-center w-8 h-8">{children}</div>
);

type Props = {
  onMount: () => void;
  onSelect: (id: string) => void;
  onActivate: (domain: string) => void;
  websites: WebsiteEntity[];
  google: WebsiteEntity[];
  fetching: boolean;
};

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount();
  }, []);

  return (
    <>
      <div className="flex-1 lg:hidden">
        <EndMessage />
      </div>
      <div className="hidden h-screen lg:block bg-gradient-to-b from-white to-gray-300">
        <div className="h-full overflow-hidden lg:grid lg:grid-cols-2">
          <div className="items-center justify-center flex-1 p-4 lg:flex">
            <Transition
              show
              appear
              className="relative z-10 flex items-center justify-center w-full h-full px-8 overflow-hidden transform rounded-md shadow-2xl bg-gradient-to-b from-gray-800 to-black"
              enter="duration-1000 transition-all ease-in-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
            >
              <div
                className="absolute top-0 w-full h-full b-0 opacity-20"
                style={{
                  backgroundImage: `url(${Pattern})`,
                }}
              ></div>

              <div className="relative w-full max-w-md py-10">
                <h1 className="text-4xl font-bold text-transparent lg:text-6xl bg-clip-text bg-gradient-to-b from-white to-yellow-300">
                  <FormattedMessage id="selection/title" />
                </h1>
                <h2 className="mt-8 text-lg text-gray-400">
                  <FormattedMessage id="selection/description" />
                  <br />
                  <i>
                    <FormattedMessage id="selection/description/warning" />
                  </i>
                </h2>
              </div>
            </Transition>
          </div>

          <div className="w-full h-full px-4 py-8 overflow-auto">
            <div className="w-full">
              {!props.fetching && (
                <Transition
                  show
                  appear
                  className={"transform w-full"}
                  enter="duration-1000 transition-all ease-in-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                >
                  {props.websites.map((website, index) => (
                    <ItemContainer key={website.id} index={index}>
                      <ItemPrimary isInfoOpen={false}>
                        <img
                          src={website.image}
                          alt={website.id}
                          className="ml-1 w-7 h-7"
                        />

                        <div className="flex items-center flex-1 min-w-0">
                          <p className="pl-4 font-medium text-gray-900 truncate">
                            {website.id}
                          </p>
                        </div>
                      </ItemPrimary>
                      <ItemSecondary isInfoOpen={false}>
                        <ButtonPrimary
                          onClick={() => props.onSelect(website.id)}
                        >
                          <FormattedMessage id="selection/item/actions/select" />
                        </ButtonPrimary>
                        <a href={website.id} target={"_blank"} rel="noreferrer">
                          <ButtonSecondary onClick={() => false}>
                            <FormattedMessage id="selection/item/actions/visit" />
                          </ButtonSecondary>
                        </a>
                      </ItemSecondary>
                    </ItemContainer>
                  ))}

                  {props.google.length > 0 && (
                    <div className="relative flex items-center mt-2">
                      <div className="w-full border-t border-gray-300" />

                      <div className="relative flex justify-center flex-shrink-0 text-sm">
                        <span className="px-4 font-medium text-gray-700">
                          Google Search Console
                        </span>
                      </div>

                      <div className="w-full border-t border-gray-300" />
                    </div>
                  )}

                  {props.google.map((website, index) => (
                    <ItemContainer key={website.id} index={index}>
                      <ItemPrimary isInfoOpen={false}>
                        <Indicator>
                          <div className="text-gray-500">
                            <MinusCircleIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          </div>
                        </Indicator>

                        <div className="flex items-center flex-1 min-w-0">
                          <p className="pl-4 font-medium text-gray-900 truncate">
                            {website.id}
                          </p>
                        </div>
                      </ItemPrimary>
                      <ItemSecondary isInfoOpen={false}>
                        <ButtonPrimary
                          onClick={() =>
                            props.onActivate(
                              website.search_console_domain as string
                            )
                          }
                        >
                          <FormattedMessage id="selection/item/actions/activate" />
                        </ButtonPrimary>
                      </ItemSecondary>
                    </ItemContainer>
                  ))}

                  {props.google.length === 0 && props.websites.length > 0 && (
                    <div className="flex items-center justify-center w-full px-2 mt-2 text-sm italic font-medium text-gray-700 h-14">
                      <FormattedMessage id="selection/no-more-google-site" />
                    </div>
                  )}

                  {props.websites.length === 0 && props.google.length === 0 && (
                    <>
                      <div className="flex items-center justify-center w-full px-2 mt-2 text-sm italic font-medium text-gray-700 h-14">
                        <FormattedMessage id="selection/no-site" />
                      </div>
                    </>
                  )}

                  <div className="flex justify-center mt-4">
                    <ButtonSecondary size="md" onClick={() => navigate("/")}>
                      <FormattedMessage id="selection/logout" />
                    </ButtonSecondary>
                  </div>
                </Transition>
              )}

              {props.fetching && (
                <Transition
                  show
                  appear
                  className={"transform w-full space-y-2"}
                  enter="duration-1000 delay-500 transition-all ease-in-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                >
                  {Array.from({ length: 5 }).map((v, index) => (
                    <ItemLoading key={index} delay={index * 100} dark />
                  ))}
                </Transition>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const Projects = connector(Container);
