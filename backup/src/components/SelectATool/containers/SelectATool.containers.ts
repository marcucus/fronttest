import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: any) => ({
  onSelectBuilder() {
    dispatch(
      actions.modal.onOpenComingSoon({
        type: "builder",
      })
    );
  },
  onSelectRanking() {
    dispatch(
      actions.modal.onOpenComingSoon({
        type: "ranking",
      })
    );
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
