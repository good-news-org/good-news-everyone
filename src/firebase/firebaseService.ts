import { ConfirmationResult } from "@firebase/auth-types";
import * as firebase from "firebase";
import { EMPTY, from, Observable, Observer, zip } from "rxjs";
import { map, mergeMap, skip } from "rxjs/operators";
import { Group, groupFromSnapshot, groupsFromSnapshot } from "../models/group";
import { Message, messageFromSnapshot, messagesFromSnapshot } from "../models/message";
import { MapObject } from "../types/types";
import { userFromSnapshot, User, usersFromSnapshot } from "../models/user";
import { groupMembersFromSnapshot } from "../models/groupMember";

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
});

messaging.usePublicVapidKey("BKsP4u_MkPCCmcLkzuGanOKrk5pf5v0FUggEzsBJWRstwVhVBy3MK9na7cOhVvO7LDRWRr4akrCIx5t6qqWsmzM");

export const getToken = () => from(messaging.getToken());

export const requestPermission = () => from(messaging.requestPermission());

export const requestCode = (phone: string): Observable<ConfirmationResult> =>
  Observable.create((observer: Observer<ConfirmationResult>) => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("button-login", {
      size: "invisible",
      callback: (response: any) => console.log(response)
    });
    firebase
      .auth()
      .signInWithPhoneNumber(phone, recaptchaVerifier)
      .then(confirmationResult => {
        observer.next(confirmationResult);
        observer.complete();
      })
      .catch(observer.error);
  });

export const login = (code: string, confirmationResult?: ConfirmationResult): Observable<firebase.User> =>
  confirmationResult === undefined
    ? EMPTY
    : Observable.create((observer: Observer<firebase.User>) => {
        confirmationResult
          .confirm(code)
          .then(function(result) {
            observer.next(result.user!);
            observer.complete();
          })
          .catch(observer.error);
      });
export const logout = (): Observable<void> => Observable.create((observer: Observer<void>) => {
           firebase
             .auth()
             .signOut()
             .then(result => {
               observer.next(result);
               observer.complete();
             })
             .catch(observer.error);
         });
   

export const getUser = (): Observable<firebase.User | null> =>
  Observable.create((observer: Observer<firebase.User | null>) => {
    firebase.auth().onAuthStateChanged(user => observer.next(user));
  });

export const updateUserToken = (userId: string, token: string): Observable<any> =>
  from(
    firebase
      .firestore()
      .doc(`users/${userId}`)
      .update(`notificationTokens.${token}`, true)
  );

export const loadGroups = (userId: string): Observable<MapObject<Group>> =>
  from(
    firebase
      .firestore()
      .collection("groups")
      .get()
  ).pipe(map(groupsFromSnapshot));

export const loadGroup = (groupId: string): Observable<Group> =>
  zip(
    from(
      firebase
        .firestore()
        .doc(`groups/${groupId}`)
        .get()
    ),
    from(
      firebase
        .firestore()
        .collection(`groups/${groupId}/users`)
        .get()
    )
  ).pipe(
    map(([groupSnapshot, membersSnapshot]) => {
      const group = groupFromSnapshot(groupSnapshot);
      const groupMembers = groupMembersFromSnapshot(membersSnapshot);
      return {
        ...group,
        members: groupMembers
      };
    })
  );

export const createGroup = (name: string): Observable<Group> =>
  from(
    firebase
      .firestore()
      .collection("groups")
      .add({ name })
  ).pipe(mergeMap(ref => loadGroup(ref.id)));

export const addMember = (groupId: string, userId: string): Observable<any> =>
  from(
    firebase
      .firestore()
      .doc(`groups/${groupId}/users/${userId}`)
      .set({ userId })
  );

export const loadMessages = (groupId: string): Observable<Array<Message>> =>
  from(
    firebase
      .firestore()
      .collection(`groups/${groupId}/messages`)
      .get()
  ).pipe(map(messagesFromSnapshot));

export const searchUser = (query: string): Observable<Array<User>> =>
  from(
    firebase
      .firestore()
      .collection(`users`)
      .where("phone", ">=", query)
      .get()
  ).pipe(map(usersFromSnapshot));

export const loadMessage = (groupId: string, messageId: string): Observable<Message> =>
  from(
    firebase
      .firestore()
      .doc(`groups/${groupId}/messages/${messageId}`)
      .get()
  ).pipe(map(messageFromSnapshot));

export const loadUser = (userId: string): Observable<User> =>
  from(
    firebase
      .firestore()
      .doc(`users/${userId}`)
      .get()
  ).pipe(map(userFromSnapshot));

export const createMessage = (userId: string, groupId: string, text: string): Observable<Message> =>
  from(
    firebase
      .firestore()
      .collection(`groups/${groupId}/messages`)
      .add({ groupId, text, authorId: userId })
  ).pipe(mergeMap(ref => loadMessage(groupId, ref.id)));

export const getEventsStream = (userId: string): Observable<object> =>
  Observable.create((observer: Observer<any>) =>
    firebase
      .firestore()
      .collection(`users/${userId}/events`)
      .orderBy("created", "desc")
      .limit(1)
      .onSnapshot(doc => doc.forEach(x => observer.next(x.data())), error => observer.error(error))
  ).pipe(skip(1));
