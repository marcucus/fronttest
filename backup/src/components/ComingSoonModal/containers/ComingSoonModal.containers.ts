import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  type: state.modal.comingSoon.type,
  isOpen: state.modal.comingSoon.isOpen,
});

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.modal.onCloseComingSoon());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
