export type Group = {
  id: string;
  name: string;
};

export const groupFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): Group => ({
  id: snapshot.id,
  name: snapshot.get("name")
});

export const groupsFromSnapshot = (snapshot: firebase.firestore.QuerySnapshot): Array<Group> =>
  snapshot.docs.map(groupFromSnapshot);
