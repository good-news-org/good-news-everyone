import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import { Group } from "../../models/group";
import { Link } from "../../router/Link";
import { MapObject } from "../../types/types";

type Props = {
  groups: MapObject<Group>;
};

const getColor = (id: string) => Math.random() * 360;

const renderGroup = (group: Group) => (
  <Link key={group.id} to={`/group/${group.id}`}>
    <ListItem button>
      <Avatar style={{ backgroundColor: `hsl(${getColor(group.id)}, 60%, 60%)` }} />
      <ListItemText primary={group.name} secondary={group.updated} />
    </ListItem>
  </Link>
);

export const GroupsList = ({ groups }: Props) => (
  <List>{Object.keys(groups).map(key => renderGroup(groups[key]))}</List>
);
