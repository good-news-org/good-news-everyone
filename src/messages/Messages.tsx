import * as React from "react";
import { AppState, MapObject } from "../types/types";
import { connect } from "react-redux";
import { loadMessages } from "./messagesActions";
import { Message } from "../models/message";
import { Dispatch } from "../../node_modules/redux";
import { MessageCreateForm } from "./create/MessageCreateForm";
import { MessageCreate } from "./create/MessageCreate";

type Props = {
  groupId: string;
};

type StateProps = {
  messages: Array<Message>;
};

type DispatchProps = {
  loadMessages: () => void;
};

type AllProps = Props & StateProps & DispatchProps;

class MessagesContainer extends React.Component<AllProps> {
  componentDidMount() {
    this.props.loadMessages();
  }
  render() {
    if (this.props.messages) {
      return (
        <div>
          {this.props.messages.map(x => <div key={x.id}>{x.text}</div>)}
          <MessageCreate groupId={this.props.groupId} />
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
  messages: state.messages.messages[props.groupId]
});

const mapDispatchToProps = (dispatch: Dispatch, props: Props) => ({
  loadMessages: () => dispatch(loadMessages(props.groupId))
});

export const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
