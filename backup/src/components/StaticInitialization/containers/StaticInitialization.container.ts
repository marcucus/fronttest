import { connect, ConnectedProps } from "react-redux";
import { startHotjar } from "../../../utils/hotjar";

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    startHotjar();
  },
});

export const connector = connect(null, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
