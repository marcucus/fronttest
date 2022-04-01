import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: any) => ({
  onOpenModal: () => {
    dispatch(actions.pages.setAddPagesModalOpen({ isOpen: true }));
  },
  onIndexation: () => {
    dispatch(
      actions.modal.openCta({
        onSubmit: () => dispatch(actions.pages.$index()),
        title: "index/confirm/title",
        description: "index/confirm/description",
      })
    );
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
