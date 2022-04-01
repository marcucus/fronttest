import { PageEntity } from "interfaces.foudroyer.com";
import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  pages: state.pages.pagesRecentlyUpdated,
  pagesWithInfoOpen: state.pages.pagesWithInfoOpen,
  isLoading: state.pages.fetchingRecently,
});

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    dispatch(actions.pages.$fetchRecentlyUpdated());
  },
  onClickOpenInfo: (url: string) => {
    dispatch(actions.pages.togglePageInfo({ url }));
  },
  onIndexGoogle: (page: PageEntity) => {
    dispatch(actions.pages.$index(page));
  },
  onIndexYandex: () => {
    dispatch(actions.modal.onOpenComingSoon({ type: "yandex" }));
  },
  onIndexBing: () => {
    dispatch(actions.modal.onOpenComingSoon({ type: "bing" }));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
