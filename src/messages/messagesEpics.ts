import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { loadMessages, createMessage } from "../firebase/firebaseService";
import { AppAction } from "../types/types";
import {
  loadMessagesError,
  loadMessagesSuccess,
  MessagesLoad,
  MESSAGES_LOAD,
  MESSAGE_CREATE,
  MessageCreate,
  createMessageSuccess,
  createMessageError
} from "./messagesActions";

export const loadMessagesEpic = (action$: Observable<AppAction>) =>
  action$.pipe(
    ofType<MessagesLoad>(MESSAGES_LOAD),
    mergeMap(action =>
      loadMessages(action.payload).pipe(
        map(x => loadMessagesSuccess(action.payload, x)),
        catchError(x => of(loadMessagesError()))
      )
    )
  );

export const createMessageEpic = (action$: Observable<AppAction>) =>
  action$.pipe(
    ofType<MessageCreate>(MESSAGE_CREATE),
    mergeMap(action =>
      createMessage(action.payload.groupId, action.payload.text).pipe(
        map(x => createMessageSuccess(action.payload.groupId, x)),
        catchError(x => console.log(x) || of(createMessageError(x)))
      ) 
    )
  );
