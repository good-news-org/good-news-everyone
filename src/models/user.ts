export type User = {
  id: string;
  email: string;
  photoUrl: string;
  displayName: string;
  phone: string;
};

export const userFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): User | undefined =>
  snapshot.exists
    ? {
        id: snapshot.id,
        email: snapshot.get("email"),
        photoUrl: snapshot.get("photoUrl"),
        displayName: snapshot.get("displayName"),
        phone: snapshot.get("phone")
      }
    : undefined;

export const usersFromSnapshot = (snapshot: firebase.firestore.QuerySnapshot): Array<User> =>
  snapshot.docs.map(userFromSnapshot);
