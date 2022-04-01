import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { UsersIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { BlockTypes } from "../../../entities/EditorEntity";
import classNames from "classnames";
import Hero1Img from "../../../assets/editor/blocks/hero/1.png";
import Hero2Img from "../../../assets/editor/blocks/hero/2.png";

import {
  connector,
  ContainerProps,
} from "./containers/CreateBlockModal.container";

type BlockResult = {
  id: number;
  name: string;
  type: BlockTypes;
  image: string;
};

const blocks: BlockResult[] = [
  {
    id: 19,
    name: "Titre",
    type: BlockTypes.HEADING,
    image: Hero1Img,
  },
  {
    id: 2,
    name: "Marketing / Hero / Thème 2",
    type: BlockTypes.HERO_1,
    image: Hero2Img,
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (params: { type: BlockTypes }) => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? []
      : blocks.filter((block) => {
          return block.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root
      show={props.isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={() => props.onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            value={blocks[0]}
            onChange={(params) => {
              props.onCreate({ type: params.type });
              props.onClose();
            }}
          >
            {({ activeOption }: { activeOption?: BlockResult | null }) => (
              <>
                <div className="relative">
                  <SearchIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === "" || filtered.length > 0) && (
                  <Combobox.Options
                    as="div"
                    static
                    hold
                    className="flex divide-x divide-gray-100"
                  >
                    <div
                      className={classNames(
                        "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                        activeOption && "sm:h-96"
                      )}
                    >
                      <div className="-mx-2 text-sm text-gray-700">
                        {(query === "" ? blocks : filtered).map((block) => (
                          <Combobox.Option
                            as="div"
                            key={block.id}
                            value={block}
                            className={({ active }) =>
                              classNames(
                                "flex cursor-default select-none items-center rounded-md p-2",
                                active && "bg-gray-100 text-gray-900"
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <span className="ml-3 flex-auto truncate">
                                  {block.name}
                                </span>
                                {active && (
                                  <ChevronRightIcon
                                    className="ml-3 h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </div>
                    </div>

                    {activeOption && (
                      <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                        <div className="flex-none p-6 text-center">
                          <div className="aspect-w-6 aspect-h-4">
                            <img
                              src={activeOption.image}
                              alt=""
                              className="object-cover object-center rounded-lg border"
                            />
                          </div>
                        </div>
                        <div className="flex flex-auto flex-col justify-between p-6">
                          <button
                            type="button"
                            className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Sélectionner
                          </button>
                        </div>
                      </div>
                    )}
                  </Combobox.Options>
                )}

                {query !== "" && filtered.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <UsersIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No people found
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const CreateBlockModal = connector(Container);
