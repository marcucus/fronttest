import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  image: state.websites.map.get(state.websites.selected || "")?.image || null,
});

const mapDispatch = (dispatch: any) => ({});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
