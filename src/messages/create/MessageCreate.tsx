import * as React from "react";
import { connect } from "react-redux";
import { routerPop } from "../../router/routerActions";
import { createMessage } from "../messagesActions";
import { AppState } from "../../types/types";
import { MessageCreateForm } from "./MessageCreateForm";

type CreateMessage = (groupId: string) => (data: { text: string }) => void;

type Props = {
  groupId: string;
};

type StateProps = {};

type DispatchProps = {
  createMessage: CreateMessage;
};

type AllProps = Props & DispatchProps & StateProps;

class MessageCreateContainer extends React.Component<AllProps> {
  render() {
    const { groupId, createMessage } = this.props;
    return <MessageCreateForm onSubmit={createMessage(groupId)} />;
  }
}

const mapStateToProps = (state: AppState): StateProps => ({});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  createMessage: groupId => ({ text }) => dispatch(createMessage(groupId, text))
});

export const MessageCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageCreateContainer);
