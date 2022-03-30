import { FormattedMessage } from "../FormattedMessage/FormattedMessage";
import { ButtonPrimary } from "../UI/Button";
import {
  ContainerProps,
  connector,
} from "./containers/IndexationRunButton.containers";

export const Wrapper: React.FC<{
  onClick: () => void;
  pagesTotal: number;
}> = (props) => {
  return (
    <ButtonPrimary onClick={props.onClick}>
      <FormattedMessage
        id="pages/index-all/button"
        values={{ number: props.pagesTotal }}
      />
    </ButtonPrimary>
  );
};

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
);

export const IndexationRunButton = connector(Container);
