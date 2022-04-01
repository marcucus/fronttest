import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { Xray } from "../../Xray/Xray";
import { As } from "../../As/As";
import { MarketingHero1Entity } from "../../../../entities/EditorEntity";

export const Hero: React.FC<MarketingHero1Entity["value"]> = (props) => {
  return (
    <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
      <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            {props.logo.visible && (
              <div>
                <img
                  className="h-11 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt={props.logo.alt}
                />
              </div>
            )}
            <div className="mt-20">
              <a href="/#" className="inline-flex space-x-4">
                <Xray visible={props.badge.visible}>
                  <span className="rounded bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 tracking-wide uppercase">
                    {props.badge.value}
                  </span>
                </Xray>

                <Xray visible={props.label.visible}>
                  <span className="inline-flex items-center text-sm font-medium text-indigo-600 space-x-1">
                    <span>{props.label.value}</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Xray>
              </a>

              <div className="mt-6 sm:max-w-xl">
                <Xray visible={props.title.visible}>
                  <As
                    tag={props.title.component}
                    className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
                  >
                    {props.title.value}
                  </As>
                </Xray>

                <Xray visible={props.description.visible}>
                  <As
                    tag={props.description.component}
                    className="text-xl text-gray-500"
                  >
                    {props.description.value}
                  </As>
                </Xray>
              </div>

              <Xray visible={props.input.visible} className="mt-12">
                <form
                  action={props.input.action}
                  method={props.input.method}
                  className="sm:max-w-lg sm:w-full sm:flex"
                >
                  <div className="min-w-0 flex-1">
                    <input
                      id="hero-email"
                      type={props.input.type}
                      className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder={props.input.placeholder}
                    />
                  </div>

                  <Xray
                    visible={props.button.visible}
                    className="mt-4 sm:mt-0 sm:ml-3"
                  >
                    {props.button.visible && (
                      <button
                        type="submit"
                        className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-600 text-base font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10"
                      >
                        {props.button.value}
                      </button>
                    )}
                  </Xray>
                </form>
              </Xray>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
            </div>
            <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
              <img
                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                src="https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
