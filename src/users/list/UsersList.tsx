import * as React from "react";
import { User } from "../../models/user";
import { Link } from "../../router/Link";
import { ListItem, Avatar, ListItemText } from "@material-ui/core";
import { getColor } from "../../utils/utils";

type Props = {
  users: Array<User>;
  onClick: (user: User) => void;
};

export const UsersList = ({ users, onClick }: Props) => (
  <div>
    {users.map(user => (
      <ListItem button onClick={() => onClick(user)}>
        <Avatar style={{ backgroundColor: `hsl(${getColor(user.id)}, 60%, 60%)` }} />
        <ListItemText primary={user.displayName} secondary={user.email} />
      </ListItem>
    ))}
  </div>
);
