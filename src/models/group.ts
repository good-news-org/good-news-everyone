import { MapObject } from "../types/types";
import { GroupMember } from "./groupMember";

export type Group = {
  id: string;
  name: string;
  created: string;
  updated: string;
  deleted: boolean;
  members: MapObject<GroupMember>;
};

export const groupFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): Group => ({
  id: snapshot.id,
  name: snapshot.get("name"),
  created: snapshot.get("created"),
  updated: snapshot.get("updated"),
  deleted: snapshot.get("deleted"),
  members: {}
});

export const groupsFromSnapshot = (snapshot: firebase.firestore.QuerySnapshot): MapObject<Group> =>
  snapshot.docs.reduce((acc, snapshot) => {
    const group = groupFromSnapshot(snapshot);
    acc[group.id] = group;
    return acc;
  }, {});
