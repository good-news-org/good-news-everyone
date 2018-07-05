import * as firebase from "firebase";
import { Observable, Observer, EMPTY, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ConfirmationResult } from "@firebase/auth-types";
import { Group, groupFromSnapshot, groupsFromSnapshot } from "../models/group";

const config = {
  apiKey: "AIzaSyBM1whSloDxnUYPYFfuwwT19goPdI6HAJ4",
  authDomain: "rusty-fox-2.firebaseapp.com",
  databaseURL: "https://rusty-fox-2.firebaseio.com",
  projectId: "rusty-fox-2",
  storageBucket: "rusty-fox-2.appspot.com",
  messagingSenderId: "848796565435"
};
firebase.initializeApp(config);

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

export const loadGroups = (userId: string): Observable<Array<Group>> =>
  from(
    firebase
      .firestore()
      .collection("groups")
      .get()
  ).pipe(map(groupsFromSnapshot));
