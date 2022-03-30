import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const mapState = (state: RootState) => ({
  show: state.pages.filter.panel.isOpen,
  sort: state.pages.filter.panel.fields.sort,
  from: state.pages.filter.panel.fields.from,
  to: state.pages.filter.panel.fields.to,
});

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.pages.toggleFilterPanel());
  },
  onChangeFrom: (value: Date | null) => {
    dispatch(actions.pages.filter.fields.update({ type: "from", value }));
  },
  onChangeTo: (value: Date | null) => {
    dispatch(actions.pages.filter.fields.update({ type: "to", value }));
  },
  onChangeSort: (value: "asc" | "desc") => {
    dispatch(actions.pages.filter.fields.update({ type: "sort", value }));
  },
  onSave: () => {
    dispatch(actions.pages.filter.fields.$apply());
  },
  onReset: () => {
    dispatch(actions.pages.filter.fields.reset());
  },
});

export const connector = connect(mapState, mapDispatch);
export type ContainerProps = ConnectedProps<typeof connector>;
