import { MapObject } from "../types/types";
import { DocumentSnapshot } from "firebase/firestore";

export type Message = {
  id: string;
  authorId: string;
  text: string;
  created: string;
  updated: string;
  deleted: boolean;
};

export const messageFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): Message => ({
  id: snapshot.id,
  authorId: snapshot.get("authorId"),
  text: snapshot.get("text"),
  created: snapshot.get("created"),
  updated: snapshot.get("updated"),
  deleted: snapshot.get("deleted")
});

export const messagesFromSnapshot = (snapshot: firebase.firestore.QuerySnapshot): Array<Message> =>
  snapshot.docs.map(messageFromSnapshot);
