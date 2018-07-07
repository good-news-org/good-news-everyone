import * as React from "react";
import { connect } from "react-redux";
import { authInit } from "./authActions";
import { AppState } from "../types/types";
import { ConfirmationResult } from "@firebase/auth-types";
import { User } from "firebase";

type Props = {
  user: User;
  initialized: boolean;
  confirmationResult: ConfirmationResult;
  children: (user: User, confirmationResult: ConfirmationResult) => JSX.Element;
  init: () => void;
};

export class AuthProviderContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return this.props.initialized ? this.props.children(this.props.user, this.props.confirmationResult) : null;
  }
}

const mapStateToProps = (state: AppState) => ({
  initialized: state.auth.initialized,
  user: state.auth.user,
  confirmationResult: state.auth.confirmationResult
});

const mapDispatchToProps = (dispatch: any) => ({
  init: () => dispatch(authInit())
});

export const AuthProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProviderContainer);
