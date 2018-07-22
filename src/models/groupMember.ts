import { MapObject } from "../types/types";

export type GroupMember = {
  id: string;
  userId: string;
};

export const groupMemberFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): GroupMember => ({
  id: snapshot.id,
  userId: snapshot.get("userId")
});

export const groupMembersFromSnapshot = (snapshot: firebase.firestore.QuerySnapshot): MapObject<GroupMember> =>
  snapshot.docs.reduce((acc, snapshot) => {
    const group = groupMemberFromSnapshot(snapshot);
    acc[group.id] = group;
    return acc;
  }, {});
