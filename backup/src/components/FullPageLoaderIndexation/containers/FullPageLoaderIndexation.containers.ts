import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  show: state.pages.indexationProcess.fetching,
  numberOfIndexedPages: state.pages.indexationProcess.numberProcessed,
});

const mapDispatch = (dispatch: any) => ({});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
