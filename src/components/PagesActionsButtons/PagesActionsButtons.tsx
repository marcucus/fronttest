import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import {
  connector,
  ContainerProps,
} from "./containers/PagesActionsButtons.containers";

type Props = {
  onOpenModal: () => void;
  onIndexation: () => void;
};

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="space-x-4">
      <button
        type="button"
        onClick={() => props.onOpenModal()}
        className="inline-flex items-center px-4 py-3 font-medium leading-4 text-gray-900 bg-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FormattedMessage id="pages/actions/add-pages" />
      </button>
      <button
        type="button"
        onClick={() => props.onIndexation()}
        className="inline-flex items-center px-4 py-3 font-medium leading-4 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FormattedMessage id="pages/actions/submit" />
      </button>
    </div>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const PagesActionsButtons = connector(Container);
