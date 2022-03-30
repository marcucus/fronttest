import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  page: state.pages.pagination.page,
  limit: state.pages.pagination.limit,
  total: state.pages.pagination.total,
});

const mapDispatch = (dispatch: any) => ({
  onNext: () => {
    dispatch(actions.pages.pagination.$next());
  },
  onPrevious: () => {
    dispatch(actions.pages.pagination.$previous());
  },
  onSelect: (page: number) => {
    dispatch(actions.pages.pagination.$select(page));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
