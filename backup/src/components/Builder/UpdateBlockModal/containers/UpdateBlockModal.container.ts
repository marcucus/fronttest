import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../../../redux/store";

const mapState = (state: RootState) => ({
  isOpen: state.editor.edition.isOpen,
});

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    // dispatch(actions.modal.onCloseComingSoon());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
