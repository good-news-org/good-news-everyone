import * as React from "react";
import { AppState, MapObject } from "../types/types";
import { connect } from "react-redux";
import { loadGroups } from "./groupsActions";
import { GroupsList } from "./list/GroupsList";
import { GroupCreate } from "../group/create/GroupCreate";
import { Group } from "../models/group";

type Props = {
  path: string;
};

type StateProps = {
  groups: MapObject<Group>;
};

type DispatchProps = {
  loadGroups: () => void;
};

type AllProps = Props & StateProps & DispatchProps;

class GroupsContainer extends React.Component<AllProps> {
  componentDidMount() {
    this.props.loadGroups();
  }
  render() {
    return (
      <div>
        <GroupsList groups={this.props.groups} />
        <GroupCreate />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  groups: state.groups.groups
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  loadGroups: () => dispatch(loadGroups())
});

export const Groups = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer);
