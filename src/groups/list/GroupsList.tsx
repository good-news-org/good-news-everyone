import { Link } from "@reach/router";
import * as React from "react";
import { Group } from "../../models/group";
import { MapObject } from "../../types/types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

type Props = {
  groups: MapObject<Group>;
};

const renderGroup = (group: Group) => (
  <Link to={`/group/${group.id}`}>
    <ListItem key={group.id} button>
      <Avatar>
        <ImageIcon />
      </Avatar>
      <ListItemText primary={group.name} secondary={group.updated} />
    </ListItem>
  </Link>
);

export const GroupsList = ({ groups }: Props) => (
  <List>{Object.keys(groups).map(key => renderGroup(groups[key]))}</List>
);
