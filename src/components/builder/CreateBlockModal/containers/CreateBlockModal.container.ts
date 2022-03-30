import { connect, ConnectedProps } from "react-redux";
import { BlockTypes } from "../../../../entities/EditorEntity";
import { actions } from "../../../../redux/actions";
import { RootState } from "../../../../redux/store";

const mapState = (state: RootState) => ({
  isOpen: state.editor.dropdown.isOpen,
});

const mapDispatch = (dispatch: any) => ({
  onCreate: (params: { type: BlockTypes }) => {
    dispatch(
      actions.editor.createBlock({
        type: params.type,
      })
    );
  },
  onClose: () => {
    dispatch(actions.editor.closeDropdown({}));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
