import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "../../node_modules/redux";
import { Message } from "../models/message";
import { AppState } from "../types/types";
import { MessageCreate } from "./create/MessageCreate";
import "./messages.css";
import { loadMessages } from "./messagesActions";
import { MessageComponent } from "./Message";

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

  componentWillReceiveProps(nextProps: AllProps) {    
    if (this.props.groupId !== nextProps.groupId) {
      this.props.loadMessages();
    }
  }

  render() {
    return (
      <div className="flex vertical grow messages">
        <div className="grow list">
          {this.props.messages ? this.props.messages.map(x => <MessageComponent key={x.id} message={x} />) : null}
        </div>
        <MessageCreate groupId={this.props.groupId} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
  messages: state.messages.messages[props.groupId]
});

const mapDispatchToProps = (dispatch: Dispatch, props: Props): DispatchProps => ({
  loadMessages: () => dispatch(loadMessages(props.groupId))
});

export const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
