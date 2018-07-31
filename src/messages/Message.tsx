import { Avatar, Chip } from "@material-ui/core";
import * as React from "react";
import { Message } from "../models/message";
import { UserProvider } from "../users/UserProvider";
import "./message.css";

export const MessageComponent = ({ message }: { message: Message }) => (
  <div className="message">
    <Chip
      avatar={<UserProvider userId={message.authorId}>{user => <Avatar src={user.photoUrl} />}</UserProvider>}
      label={message.text}
    />
  </div>
);
