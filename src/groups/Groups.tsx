import * as React from "react";
import { AppState } from "../types/types";
import { loadGroups } from "../firebase/firebaseService";
import { connect } from "react-redux";

class GroupsContainer extends React.Component {
  componentDidMount() {
    this.props["loadGroups"]().subscribe(console.log); // just a little hack so we dont need types ;)
  }
  render() {
    return <div>Groups</div>;
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  loadGroups: () => loadGroups("not used but pass user id here pls")
});

export const Groups = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer);
