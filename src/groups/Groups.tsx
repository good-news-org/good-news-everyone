import * as React from "react";
import { connect } from "react-redux";
import { Button } from "../../node_modules/@material-ui/core";
import { DialogProvider } from "../components/DialogProvider";
import { GroupCreate } from "../group/create/GroupCreate";
import { Group } from "../models/group";
import { AppState, MapObject } from "../types/types";
import { loadGroups } from "./groupsActions";
import { GroupsList } from "./list/GroupsList";
import { Link } from "../router/Link";

type Props = {};

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
      <div className="groups">
        <GroupsList groups={this.props.groups} />
        <Link to="/create">
          <Button>Create Group</Button>
        </Link>
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
