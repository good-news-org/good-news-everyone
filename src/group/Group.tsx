import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../types/types";
import { Messages } from "../messages/Messages";

type Props = {
  path: string; // wtf router shit
  id?: string;
};

class GroupContainer extends React.Component<Props> {
  render() {
    return <Messages groupId={this.props.id} />;
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export const Group = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupContainer);
