import * as React from "react";
import { Group } from "../../models/group";
import { connect } from "react-redux";
import { AppState, MapObject } from "../../types/types";
import { Link } from "@reach/router";

type Props = {
  groups: MapObject<Group>;
};

const renderGroup = (group: Group) => (
  <div key={group.id}>
    <Link to={`/group/${group.id}`}>{group.name}</Link>
  </div>
);

export const GroupsList = ({ groups }: Props) => <div>{Object.keys(groups).map(key => renderGroup(groups[key]))}</div>;
