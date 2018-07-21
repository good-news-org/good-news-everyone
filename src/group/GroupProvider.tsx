import * as React from "react";
import { connect } from "react-redux";
import { Group } from "../models/group";
import { AppState } from "../types/types";
import { loadGroup } from "./groupActions";
import { CircularProgress } from "@material-ui/core";

type Props = {
  groupId: string;
  children: (group: Group) => JSX.Element;
};

type StateProps = {
  group?: Group;
};

type DispatchProps = {
  loadGroup: (groupId: string) => void;
};

type AllProps = Props & StateProps & DispatchProps;

class Component extends React.Component<AllProps> {
  componentDidMount() {
    // if (!this.props.group) {
      this.props.loadGroup(this.props.groupId);
    // }
  }

  render() {
    if (this.props.group) {
      return this.props.children(this.props.group);
    } else {
      return <CircularProgress />;
    }
  }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
  group: state.groups.groups[props.groupId]
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  loadGroup: groupId => dispatch(loadGroup(groupId))
});

export const GroupProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
