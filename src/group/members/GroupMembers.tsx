import * as React from "react";
import { MapObject } from "../../types/types";
import { GroupMember } from "../../models/groupMember";
import { UserProvider } from "../../users/UserProvider";
import { Chip, Avatar } from "@material-ui/core";

export type Props = {
  members: MapObject<GroupMember>;
};

export const GroupMembers = ({ members }: Props) => (
  <div>
    {Object.keys(members).map(key => (
      <UserProvider key={key} userId={members[key].userId}>
        {user => (
          <div>
            <Chip avatar={<Avatar src={user.photoUrl} />} label={user.displayName + " " + user.phone} />
          </div>
        )}
      </UserProvider>
    ))}
  </div>
);
