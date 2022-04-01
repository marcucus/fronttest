import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import {
  connector,
  ContainerProps,
} from "./containers/RefreshSitemapAndIndexation.containers";

type Props = {
  onSubmit: () => void;
  onChangeSitemap: () => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <>
      <div className="">
        <div className="w-full">
          <div className={`relative px-8 py-8 bg-yellow-100 rounded-xl`}>
            <div className="flex items-center justify-between text-lg font-medium text-yellow-900">
              <FormattedMessage id="sync/block/title" />
            </div>
            {/* <span className="text-sm italic text-yellow-700">
              Synchronisé le 21 septembre 2022
            </span> */}
            <div className={`mt-4 text-yellow-700`}>
              <FormattedMessage id="sync/block/description" />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={props.onSubmit}
                className={`inline-block w-auto items-center mt-4 px-4 py-3 text-base font-medium transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-yellow-300 hover:bg-yellow-200 text-yellow-900`}
              >
                <FormattedMessage id="sync/block/button/sync" />
              </button>

              <button
                onClick={props.onChangeSitemap}
                className={`inline-block w-auto items-center mt-4 px-4 py-3 text-base font-medium transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-yellow-300 text-yellow-900`}
              >
                <FormattedMessage id="sync/block/button/change-sitemap" />
              </button>

              <a
                href="https://www.patreon.com/kevin_marques"
                target={"_blank"}
                rel="noreferrer"
                className={`inline-block w-auto items-center mt-4 px-4 py-3 text-base font-medium transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-yellow-300 text-yellow-900`}
              >
                <FormattedMessage id="sync/block/button/patreon" />
              </a>
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

export const RefreshSitemapAndIndexation = connector(Container);
