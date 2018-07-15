import { ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { createMessage, loadMessages } from "../firebase/firebaseService";
import { AppEpic } from "../types/types";
import {
  createMessageError,
  createMessageSuccess,
  loadMessagesError,
  loadMessagesSuccess,
  MessageCreate,
  MessagesLoad,
  MESSAGES_LOAD,
  MESSAGE_CREATE
} from "./messagesActions";

export const loadMessagesEpic: AppEpic = action$ =>
  action$.pipe(
    ofType<MessagesLoad>(MESSAGES_LOAD),
    mergeMap(action =>
      loadMessages(action.payload).pipe(
        map(x => loadMessagesSuccess(action.payload, x)),
        catchError(x => of(loadMessagesError()))
      )
    )
  );

export const createMessageEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType<MessageCreate>(MESSAGE_CREATE),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      createMessage(state.auth.user.uid, action.payload.groupId, action.payload.text).pipe(
        map(x => createMessageSuccess(action.payload.groupId, x)),
        catchError(x => console.log(x) || of(createMessageError(x)))
      )
    )
  );
