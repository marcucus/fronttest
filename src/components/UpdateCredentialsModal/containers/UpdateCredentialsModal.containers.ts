import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  value: state.websites.addCredentials.value,
  fetching: state.websites.addCredentials.isFetching,
  isOpen: state.websites.addCredentials.isOpen,
});

const mapDispatch = (dispatch: any) => ({
  onChange: (value: string) => {
    dispatch(actions.websites.updateCredentials({ value: value }));
  },
  onSubmit: () => {
    dispatch(actions.websites.$saveCredentials());
  },
  onClose: () => {
    dispatch(actions.websites.setCredentialsIsOpen({ value: false }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
