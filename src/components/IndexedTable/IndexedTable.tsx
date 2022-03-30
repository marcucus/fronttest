import {
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/solid";
import dayjs from "dayjs";
import { IndexationType, PageEntity } from "interfaces.foudroyer.com";
import { useEffect } from "react";
import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { ItemLoading } from "../ItemLoading/ItemLoading";
import { ButtonPrimary, ButtonSecondary } from "../UI/Button";
import { connector, ContainerProps } from "./containers/AllPages.containers";
import { connector as RecentsPagesConnector } from "./containers/RecentsPages.containers";

type Props = {
  pages: PageEntity[];
  isLoading: boolean;
  pagesWithInfoOpen: Set<string>;
  onClickOpenInfo: (url: string) => void;
  onIndexGoogle: (params: PageEntity) => void;
  onIndexYandex: () => void;
  onIndexBing: () => void;
  onMount: () => void;
};

const formatUrl = (url: string) => {
  const formatted = decodeURIComponent(
    url.replace(/https?:\/\/[a-z0-9\-_.]+/, "")
  );
  if (formatted === "") return "/";
  return formatted;
};

export const ItemContainer: React.FC<{ index: number }> = ({
  children,
  index,
}) => (
  <div className="bg-white rounded-md">
    <div
      className={`block mt-2 h-14 relative overflow-hidden group transition-colors duration-300 ease-in-out ${
        index % 2 !== 0 ? "" : ""
      }`}
    >
      {children}
    </div>
  </div>
);

export const ItemPrimary: React.FC<{ isInfoOpen: boolean }> = (props) => (
  <div
    className={`flex items-center h-full px-2 transition-all duration-300 ease-in-out transform ${
      !props.isInfoOpen && "group-hover:-translate-y-full"
    }`}
  >
    {props.children}
  </div>
);

export const ItemSecondary: React.FC<{ isInfoOpen: boolean }> = (props) => (
  <div
    className={`absolute top-0 left-0 right-0 flex items-center w-full h-full px-2 space-x-2 transition-all duration-300 ease-in-out transform translate-y-full bg-white rounded-md ${
      !props.isInfoOpen && "group-hover:translate-y-0"
    }`}
  >
    {props.children}
  </div>
);

export const ItemInfosContainer: React.FC = (props) => (
  <div className="px-4 py-5 bg-white border-t border-gray-100 rounded-b-md sm:p-0">
    <dl className="sm:divide-y sm:divide-gray-100">{props.children}</dl>
  </div>
);

const Indicator: React.FC = ({ children }) => (
  <div className="flex items-center justify-center w-8 h-8">{children}</div>
);

const Item: React.FC<{
  page: PageEntity;
  index: number;
  isInfoOpen: boolean;
  onClickOpenInfo: () => void;
  onIndexGoogle: () => void;
  onIndexYandex: () => void;
  onIndexBing: () => void;
}> = (props) => {
  return (
    <div>
      <ItemContainer index={props.index}>
        <ItemPrimary isInfoOpen={props.isInfoOpen}>
          <div className="flex items-center flex-1 min-w-0">
            <p className="pl-4 font-medium text-gray-900 truncate">
              {formatUrl(props.page.url)}
            </p>
          </div>

          {props.page.indexation_state === IndexationType.INDEXED && (
            <Indicator>
              <div className="text-green-500 ">
                <CheckCircleIcon className="w-6 h-6" aria-hidden="true" />
              </div>
            </Indicator>
          )}

          {props.page.indexation_state === IndexationType.NOT_INDEXED && (
            <Indicator>
              <div className="text-red-500 ">
                <XCircleIcon className="w-6 h-6" aria-hidden="true" />
              </div>
            </Indicator>
          )}

          {props.page.indexation_state === IndexationType.NOT_PROCESSED && (
            <Indicator>
              <div className="text-gray-500">
                <MinusCircleIcon className="w-6 h-6" aria-hidden="true" />
              </div>
            </Indicator>
          )}
        </ItemPrimary>

        <ItemSecondary isInfoOpen={props.isInfoOpen}>
          <ButtonPrimary onClick={props.onIndexGoogle}>
            <FormattedMessage id="pages/actions/google/index" />
          </ButtonPrimary>

          <a
            href={`https://www.google.com/search?q=inurl%3A${encodeURIComponent(
              props.page.url
            )}`}
            target={"_blank"}
            rel="noreferrer"
          >
            <ButtonPrimary onClick={() => false}>
              <FormattedMessage id="pages/actions/google/verify" />
            </ButtonPrimary>
          </a>

          <ButtonSecondary onClick={props.onIndexYandex}>
            <FormattedMessage id="pages/actions/yandex/index" />
          </ButtonSecondary>
          <ButtonSecondary onClick={props.onIndexBing}>
            <FormattedMessage id="pages/actions/bing/index" />
          </ButtonSecondary>

          <ButtonSecondary onClick={props.onClickOpenInfo}>
            <FormattedMessage id="pages/item/action/see-info" />
          </ButtonSecondary>
        </ItemSecondary>
      </ItemContainer>

      {props.isInfoOpen && (
        <ItemInfosContainer>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="font-medium text-gray-900">
              <FormattedMessage id="pages/info/updated-at" />
            </dt>
            <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
              {dayjs(props.page.updated_at).format("D MMMM YYYY HH:mm")}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:px-6">
            <dd className="mt-0 space-x-2 text-gray-900 sm:col-span-2">
              <ButtonSecondary onClick={props.onClickOpenInfo}>
                <FormattedMessage id="pages/item/action/close-info" />
              </ButtonSecondary>

              <a
                href={`https://www.google.com/search?q=inurl%3A${encodeURIComponent(
                  props.page.url
                )}`}
                target={"_blank"}
                rel="noreferrer"
              >
                <ButtonSecondary onClick={() => false}>
                  <FormattedMessage id="pages/actions/google/verify" />
                </ButtonSecondary>
              </a>

              <a
                href={`https://www.bing.com/search?q=url:${encodeURIComponent(
                  props.page.url
                )}`}
                target={"_blank"}
                rel="noreferrer"
              >
                <ButtonSecondary onClick={() => false}>
                  <FormattedMessage id="pages/actions/bing/verify" />
                </ButtonSecondary>
              </a>

              <a
                href={`https://yandex.ru/search/?text=url:${encodeURIComponent(
                  props.page.url
                )}`}
                target={"_blank"}
                rel="noreferrer"
              >
                <ButtonSecondary onClick={() => false}>
                  <FormattedMessage id="pages/actions/yandex/verify" />
                </ButtonSecondary>
              </a>
            </dd>
          </div>
        </ItemInfosContainer>
      )}
    </div>
  );
};

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount();
  }, []);

  return (
    <div className="mt-2">
      <ul className="space-y-2">
        {!props.isLoading &&
          props.pages.map((page, index) => (
            <Item
              key={page.url}
              page={page}
              index={index}
              onIndexGoogle={() => props.onIndexGoogle(page)}
              onIndexBing={() => props.onIndexBing()}
              onIndexYandex={() => props.onIndexYandex()}
              onClickOpenInfo={() => props.onClickOpenInfo(page.url)}
              isInfoOpen={props.pagesWithInfoOpen.has(page.url)}
            />
          ))}

        {props.isLoading &&
          Array.from({ length: 10 }).map((value, index) => (
            <ItemLoading key={index} delay={index * 100} />
          ))}
      </ul>
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const AllPages = connector(Container);
export const RecentsPages = RecentsPagesConnector(Container);
