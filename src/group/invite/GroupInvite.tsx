import * as React from "react";
import { connect } from "react-redux";
import { addMember } from "../../group/groupActions";
import { User } from "../../models/user";
import { Search } from "../../search/search";
import { SearchResultsProvider } from "../../search/SearchResultsProvider";
import { AppState } from "../../types/types";
import { UsersList } from "../../users/list/UsersList";
import { GroupProvider } from "../GroupProvider";
import { GroupMembers } from "../members/GroupMembers";
import { Typography, Button } from "@material-ui/core";
import { Link } from "../../router/Link";

type Props = {
  groupId: string;
};

type StateProps = {
  members: Array<User>;
};

type DispatchProps = {
  addMember: (user: User) => void;
};

type AllProps = Props & StateProps & DispatchProps;

const GroupInviteContainer = ({ groupId, members, addMember }: AllProps) => (
  <GroupProvider groupId={groupId}>
    {group => (
      <div>
        <Typography variant="title" color="inherit">
          {group.name}
        </Typography>
        <GroupMembers members={group.members} />
        <Search />
        <SearchResultsProvider>{users => <UsersList onClick={addMember} users={users} />}</SearchResultsProvider>
        <Link to={`/group/${group.id}`}>
          <Button variant="contained" color="primary">
            Done
          </Button>
        </Link>
      </div>
    )}
  </GroupProvider>
);

const mapStateToProps = (state: AppState): StateProps => ({
  members: []
});

const mapDispatchToProps = (dispatch: any, props: Props): DispatchProps => ({
  addMember: (user: User) => dispatch(addMember(props.groupId, user.id))
});

export const GroupInvite = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupInviteContainer);
