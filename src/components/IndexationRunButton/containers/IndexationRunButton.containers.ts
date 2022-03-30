import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  pagesTotal: state.pages.pages.length,
});

const mapDispatch = (dispatch: any) => ({
  onClick: () => {
    dispatch(actions.pages.$index());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
