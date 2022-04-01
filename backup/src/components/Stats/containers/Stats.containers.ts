import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  website: state.websites.selected || "",
  googleSearchDomain:
    state.websites.map.get(state.websites.selected as string)
      ?.search_console_domain || "",
});

const mapDispatch = (dispatch: any) => ({});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
