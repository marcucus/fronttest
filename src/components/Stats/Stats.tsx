import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import GoogleLogo from "../../assets/socials/google.svg";
import YandexLogo from "../../assets/socials/yandex.svg";
import BingLogo from "../../assets/socials/bing.svg";
import { connector, ContainerProps } from "./containers/Stats.containers";

type Props = {
  website: string;
  googleSearchDomain: string;
};

type Engine = "google" | "yandex" | "bing";

const getSecondaryTextColor = (state: Engine) => {
  if (state === "google") return "text-gray-700";
  if (state === "yandex") return "text-red-700";
  if (state === "bing") return "text-green-700";

  return "text-gray-700";
};

const getBackgroundColor = (engine: Engine) => {
  if (engine === "google") return "bg-gray-100";
  if (engine === "yandex") return "bg-red-50";
  if (engine === "bing") return "bg-green-50";

  return "bg-gray-200";
};

const getButtonColor = (engine: Engine) => {
  if (engine === "google") return "bg-gray-200 text-gray-900";
  if (engine === "yandex") return "bg-red-200 text-red-900";
  if (engine === "bing") return "bg-green-200 text-green-900";

  return "bg-gray-200";
};

const getLinkToIndexationState = (params: {
  website: string;
  searchConsoleDomain: string;
  engine: Engine;
}) => {
  if (params.engine === "bing")
    return `https://www.bing.com/webmasters/siteexplorer?siteUrl=${params.website}`;
  if (params.engine === "yandex")
    return `https://webmaster.yandex.com/site/${params.website.replace(
      "//",
      ""
    )}:443/indexing/all-pages/`;

  return `https://search.google.com/search-console/index?resource_id=${encodeURIComponent(
    params.searchConsoleDomain
  )}`;
};

const Item: React.FC<{
  engine: Engine;
  website: string;
  searchConsoleDomain: string;
}> = (props) => (
  <div
    className={`relative px-8 py-8 ${getBackgroundColor(
      props.engine
    )} rounded-xl`}
  >
    <div className="flex items-center justify-between">
      {props.engine === "google" && (
        <img src={GoogleLogo} alt="" className="h-6" />
      )}
      {props.engine === "yandex" && (
        <img src={YandexLogo} alt="" className="h-6" />
      )}
      {props.engine === "bing" && <img src={BingLogo} alt="" className="h-6" />}
    </div>
    <div className={`mt-4 ${getSecondaryTextColor(props.engine)}`}>
      {props.engine === "google" && (
        <FormattedMessage id={`reports/check-indexation/google/description`} />
      )}
      {props.engine === "yandex" && (
        <FormattedMessage id={`reports/check-indexation/yandex/description`} />
      )}
      {props.engine === "bing" && (
        <FormattedMessage id={`reports/check-indexation/bing/description`} />
      )}
    </div>

    <a
      target={"_blank"}
      href={getLinkToIndexationState(props)}
      rel="noreferrer"
      className={`inline-block w-auto items-center mt-4 px-4 py-3 text-base font-medium transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonColor(
        props.engine
      )}`}
    >
      <FormattedMessage id="reports/check-indexation/button" />
    </a>
  </div>
);

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <>
      <div className="">
        <div className="grid w-full grid-cols-3 gap-8">
          <Item
            engine="google"
            website={props.website}
            searchConsoleDomain={props.googleSearchDomain}
          />
          <Item
            engine="yandex"
            website={props.website}
            searchConsoleDomain={props.googleSearchDomain}
          />
          <Item
            engine="bing"
            website={props.website}
            searchConsoleDomain={props.googleSearchDomain}
          />
        </div>
      </div>
    </>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const Stats = connector(Container);
