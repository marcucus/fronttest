import { connect, ConnectedProps } from "react-redux";

import { actions } from "../../../../redux/actions";
import { RootState } from "../../../../redux/store";

const mapState = (state: RootState) => ({
  blocks: state.editor.blocks,
});

const mapDispatch = (dispatch: any) => ({
  onUp: ({ id }: { id: string }) => {
    dispatch(
      actions.editor.up({
        id,
      })
    );
  },
  onDown: ({ id }: { id: string }) => {
    dispatch(
      actions.editor.down({
        id,
      })
    );
  },
  onCreateBefore: ({ id }: { id: string }) => {
    dispatch(
      actions.editor.openDropdown({
        blockIdWhereDropdownWasOpen: id,
        addAfter: false,
        addBefore: true,
      })
    );
  },
  onCreateAfter: ({ id }: { id: string }) => {
    dispatch(
      actions.editor.openDropdown({
        blockIdWhereDropdownWasOpen: id,
        addAfter: true,
        addBefore: false,
      })
    );
  },
  onRemove: ({ id }: { id: string }) => {
    dispatch(
      actions.editor.removeBlock({
        id,
      })
    );
  },
  onEdit: ({ id }: { id: string }) => {
    dispatch(
      actions.editor.openEdit({
        id,
      })
    );
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
