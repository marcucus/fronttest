import { PageEntity } from "interfaces.foudroyer.com";
import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  filterIndexationState: state.pages.filter.indexationState,
  isPanelOpen: state.pages.filter.panel.isOpen,
  isInfoAllOpen: state.pages.isAllPagesWithInfoActivated,
});

const mapDispatch = (dispatch: any) => ({
  onToggleAdvancedFilter: () => {
    dispatch(actions.pages.toggleFilterPanel());
  },
  onToggleShowInfo: () => {
    dispatch(actions.pages.toggleAllPageInfo());
  },
  onToggleFilter: (type: PageEntity["indexation_state"]) => {
    dispatch(actions.pages.$toggleFilter({ type }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
