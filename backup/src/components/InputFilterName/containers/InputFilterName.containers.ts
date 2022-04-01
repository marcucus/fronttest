import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  value: state.pages.filterNameValue,
});

const mapDispatch = (dispatch: any) => ({
  onChange: (name: string) => {
    dispatch(actions.pages.$filterByName({ name }));
  },
  onSearch: () => {
    dispatch(actions.pages.$fetchWithSearch());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
