import { Menu, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type WebsiteEntity = {
  name: string;
  url: string;
  image: string;
};

export const DropdownButton: React.FC<WebsiteEntity> = (props) => (
  <div className={"w-full p-2"}>
    <div className="flex w-full items-center justify-between rounded px-2 py-3 text-sm font-medium hover:bg-gray-100">
      <div className="flex w-full items-center space-x-2">
        <div className="flex-shrink-0">
          <img alt="relou" src={props.image} className="rounded-full h-6 w-6" />
        </div>
        <div className="w-full text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
          {props.url.replace("https://", "")}
        </div>
      </div>

      <div className="w-4 h-4 flex items-center flex-shrink-0">
        <SelectorIcon className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  </div>
);

const DropdownMenuLink: React.FC = (props) => (
  <div className="py-1">
    <a
      href="/#"
      className={classNames(
        "hover:bg-gray-100 rounded text-sm block px-2 py-2"
      )}
    >
      {props.children}
    </a>
  </div>
);

const DropdownMenuItemContainer: React.FC = (props) => (
  <div className="py-1">{props.children}</div>
);

const DropdownMenuContainer: React.FC = (props) => (
  <div className="origin-top-left absolute left-0 w-full px-2">
    <div className="w-full px-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
      {props.children}
    </div>
  </div>
);

export const DropdownMenu: React.FC<{ websites: WebsiteEntity[] }> = (
  props
) => (
  <DropdownMenuContainer>
    <DropdownMenuItemContainer>
      {props.websites.map(({ url, image, name }) => (
        <div className="py-1" key={url}>
          <div className="flex items-center py-2 rounded hover:bg-gray-100 cursor-pointer">
            <div className="flex-shrink-0 px-2">
              <img alt="logo" src={image} className="rounded-full h-6 w-6" />
            </div>

            <div className="w-full pr-10">
              <p className="text-sm">{name}</p>
              <p className="text-xs w-full text-gray-400 overflow-ellipsis overflow-hidden whitespace-nowrap">
                {url}
              </p>
            </div>
          </div>
        </div>
      ))}
    </DropdownMenuItemContainer>

    <DropdownMenuItemContainer>
      <DropdownMenuLink>Tous vos sites</DropdownMenuLink>
      <DropdownMenuLink>Créer un nouveau site</DropdownMenuLink>
    </DropdownMenuItemContainer>

    <DropdownMenuItemContainer>
      <DropdownMenuLink>Se déconnecter</DropdownMenuLink>
    </DropdownMenuItemContainer>
  </DropdownMenuContainer>
);

export const Dropdown: React.FC<{
  websites: WebsiteEntity[];
  currentWebsite: WebsiteEntity;
}> = (props) => {
  return (
    <Menu as="div" className="relative z-10 w-full inline-block text-left">
      <Menu.Button className={"w-full"}>
        <DropdownButton {...props.currentWebsite} />
      </Menu.Button>

      <Transition
        as={"div"}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <DropdownMenu websites={props.websites} />
      </Transition>
    </Menu>
  );
};
