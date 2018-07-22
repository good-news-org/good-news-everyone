import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../types/types";
import { Messages } from "../messages/Messages";
import { GroupProvider } from "./GroupProvider";
import { GroupMembers } from "./members/GroupMembers";
import { Link } from "../router/Link";
import { Typography, Button } from "@material-ui/core";

type Props = {
  groupId: string;
};

class GroupContainer extends React.Component<Props> {
  render() {
    return (
      <GroupProvider groupId={this.props.groupId}>
        {group => (
          <div className="flex grow">
            <Messages groupId={this.props.groupId} />
            <div>
              <Typography variant="title" color="inherit">
                {group.name}
              </Typography>
              <Typography variant="headline" color="inherit">
                Members
              </Typography>
              <GroupMembers members={group.members} />
              <Link to={`/invite/${group.id}`}>
                <Button>Invite</Button>
              </Link>
            </div>
          </div>
        )}
      </GroupProvider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export const Group = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupContainer);
