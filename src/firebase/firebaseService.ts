import * as firebase from "firebase";
import { Observable, Observer, EMPTY, from } from "rxjs";
import { map, tap, mergeMap } from "rxjs/operators";
import { ConfirmationResult } from "@firebase/auth-types";
import { Group, groupFromSnapshot, groupsFromSnapshot } from "../models/group";
import { MapObject } from "../types/types";
import { messagesFromSnapshot, Message, messageFromSnapshot } from "../models/message";

const config = {
  apiKey: "AIzaSyBM1whSloDxnUYPYFfuwwT19goPdI6HAJ4",
  authDomain: "rusty-fox-2.firebaseapp.com",
  databaseURL: "https://rusty-fox-2.firebaseio.com",
  projectId: "rusty-fox-2",
  storageBucket: "rusty-fox-2.appspot.com",
  messagingSenderId: "848796565435"
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

export const createGroup = (name: string): Observable<Group> =>
  from(
    firebase
      .firestore()
      .collection("groups")
      .add({ name })
  ).pipe(map(groupFromSnapshot));

export const loadMessages = (groupId: string): Observable<Array<Message>> =>
  from(
    firebase
      .firestore()
      .collection(`groups/${groupId}/messages`)
      .get()
  ).pipe(map(messagesFromSnapshot));

export const loadMessage = (groupId: string, messageId: string): Observable<Message> =>
  from(
    firebase
      .firestore()
      .doc(`groups/${groupId}/messages/${messageId}`)
      .get()
  ).pipe(map(messageFromSnapshot));

export const createMessage = (groupId: string, text: string): Observable<Message> =>
  from(
    firebase
      .firestore()
      .collection(`groups/${groupId}/messages`)
      .add({ groupId, text })
  ).pipe(mergeMap(ref => loadMessage(groupId, ref.id)));
