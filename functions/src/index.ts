import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DocumentSnapshot } from "@google-cloud/firestore";

const app = admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const getGroupUsers = (groupId): Promise<DocumentSnapshot[]> => {
  return admin
    .firestore()
    .collection("groups")
    .doc(groupId)
    .get()
    .then(snapshot => {
      const users: string[] = snapshot.get("users");
      const promises = users.map(userId =>
        admin
          .firestore()
          .collection("users")
          .doc(userId)
          .get()
      );
      return Promise.all(promises);
    });
};

const getAllUsers = (): Promise<DocumentSnapshot[]> => {
  return admin
    .firestore()
    .collection("users")
    .get()
    .then(snapshot => snapshot.docs);
};

type Recipients = {
  userIds: Array<string>;
  tokens: Array<string>;
};

const getGroupUsersTokens = (groupId): Promise<Recipients> => {
  return getGroupUsers(groupId).then(snapshots => {
    console.log(snapshots);
    const tokens: Array<string> = [];
    const userIds: Array<string> = [];
    snapshots.forEach(user => {
      userIds.push(user.id);
      const xs = user.get("notificationTokens");
      Object.keys(xs ? xs : []).forEach(token => tokens.push(token));
    });
    return { userIds, tokens };
  });
};

const sendMessageToTokens = (recipients: Recipients, payload): Promise<any> => {
  const a: Promise<admin.messaging.MessagingDevicesResponse> =
    recipients.tokens.length === 0
      ? Promise.resolve(undefined)
      : admin.messaging().sendToDevice(recipients.tokens, payload);
  return a.then(response => {
    console.log(response);
    const tasks = recipients.userIds.map(userId =>
      admin
        .firestore()
        .collection(`users/${userId}/events`)
        .add({
          ...payload,
          created: Date.now()
        })
    );
    return Promise.all(tasks);
  });
};

export const onCreateGroupMessage = functions.firestore
  .document("groups/{groupId}/messages/{messageId}")
  .onCreate((doc, context) => {
    const groupId = context.params.groupId;
    const messageId = context.params.messageId;
    return doc.ref
      .update({
        created: Date.now(),
        updated: Date.now(),
        deleted: false
      })
      .then(() => getGroupUsersTokens(groupId))
      .then(tokens => {
        const payload = {
          data: {
            type: "message",
            group_id: groupId,
            message_id: messageId
          }
        };
        return sendMessageToTokens(tokens, payload);
      });
  });

export const onDeleteGroupMessage = functions.firestore
  .document("groups/{groupId}/messages/{messageId}")
  .onDelete((_, context) => {
    const groupId = context.params.groupId;
    const messageId = context.params.messageId;

    return getGroupUsersTokens(groupId).then(tokens => {
      const payload = {
        data: {
          type: "message",
          group_id: groupId,
          message_id: messageId
        }
      };
      return sendMessageToTokens(tokens, payload);
    });
  });

export const onCreateGroupPost = functions.firestore
  .document("groups/{groupId}/posts/{postId}")
  .onCreate((_, context) => {
    const groupId = context.params.groupId;
    const postId = context.params.postId;

    return getGroupUsersTokens(groupId).then(tokens => {
      const payload = {
        data: {
          type: "post",
          group_id: groupId,
          post_id: postId
        }
      };
      return sendMessageToTokens(tokens, payload);
    });
  });

export const onCreateGroup = functions.firestore.document("groups/{groupId}").onCreate((snap, context) => {
  const groupId = snap.id;
  const ownerId = snap.get("ownerId");
  return admin
    .firestore()
    .doc(`/groups/${groupId}/users/${ownerId}`)
    .set({
      id: ownerId
    });
});

const getGroup = groupId =>
  admin
    .firestore()
    .doc(`/groups/${groupId}`)
    .get();

const getGroupPost = (groupId, postId) =>
  admin
    .firestore()
    .doc(`/groups/${groupId}/posts/${postId}`)
    .get();

const setPostCommentsCount = (groupId, postId, count) =>
  admin
    .firestore()
    .doc(`/groups/${groupId}/posts/${postId}`)
    .set(
      {
        comments_count: count,
        last_comment_time: Date.now()
      },
      { merge: true }
    );

const increase = number => {
  console.log("number: " + number);
  return number == undefined ? 1 : number + 1;
};

export const onCreatePostComment = functions.firestore
  .document("groups/{groupId}/posts/{postId}/comments/{commentId}")
  .onCreate(
    (_, context): Promise<void> => {
      const groupId = context.params.groupId;
      const postId = context.params.postId;
      const commentId = context.params.commentId;

      return getGroupPost(groupId, postId)
        .then(post => setPostCommentsCount(groupId, postId, increase(post.get("comments_count"))))
        .then(_ => getGroupUsersTokens(groupId))
        .then(tokens => {
          const payload = {
            data: {
              type: "comment",
              group_id: groupId,
              post_id: postId,
              comment_id: commentId
            }
          };
          return sendMessageToTokens(tokens, payload);
        });
    }
  );

export const onCreateFirestoreUser = functions.auth.user().onCreate((user, context) => {
  return admin
    .firestore()
    .doc(`users/${user.uid}`)
    .set({
      id: user.uid,
      email: user.email ? user.email : "",
      photoUrl: user.photoURL ? user.photoURL : "",
      displayName: user.displayName ? user.displayName : "",
      phone: user.phoneNumber ? user.phoneNumber : ""
    });
});
