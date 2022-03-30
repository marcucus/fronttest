import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import {
  connector,
  ContainerProps,
} from "./containers/FullPageLoaderIndexation.containers";

type Props = {
  show: boolean;
  numberOfIndexedPages: number;
};

export const Wrapper: React.FC<Props> = (props) => {
  return props.show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-90">
      <div>
        <div
          className="w-20 h-20 mx-auto border-8 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: "rgb(59, 130, 246)" }}
        ></div>

        <div className="mt-10 text-xl text-center text-gray-200">
          {props.numberOfIndexedPages}{" "}
          <FormattedMessage id="indexation/modal/message" />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const FullPageLoaderIndexation = connector(Container);
