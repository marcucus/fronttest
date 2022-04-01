import { navigate } from "@reach/router";
import { WebsiteEntity } from "interfaces.foudroyer.com";
import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  websites: state.websites.entities.map((id) =>
    state.websites.map.get(id)
  ) as WebsiteEntity[],
  fetching: state.websites.fetching,
  google: state.websites.google,
});

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    dispatch(actions.websites.$fetchAll());
  },
  onSelect: (id: string) => {
    dispatch(actions.websites.$selectWebsite(id));
    navigate("/tools/indexation/dashboard/");
  },
  onActivate: (domain: string) => {
    dispatch(actions.websites.$activate(domain));
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
