import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { authRequestCode, authLogIn } from "../auth/authActions";
import { AppState } from "../types/types";
import { ConfirmationResult } from "../../node_modules/@firebase/auth-types";

type RequestCodeFormProps = {
  handleSubmit: any;
};

const RequestCodeFormContainer = ({ handleSubmit }: RequestCodeFormProps) => (
  <form onSubmit={handleSubmit}>
    <label>
      Phone:
      <Field name="phone" type="text" component="input" />
    </label>
    <button id="button-login" type="submit">
      Login
    </button>
  </form>
);

export const RequestCodeForm = reduxForm({
  form: "requestCode"
})(RequestCodeFormContainer);

type LoginFormProps = {
  handleSubmit: any;
};

const LoginFormContainer = ({ handleSubmit }: LoginFormProps) => (
  <form onSubmit={handleSubmit}>
    <label>
      Code:
      <Field name="code" type="text" component="input" />
    </label>
    <button type="submit">Login</button>
  </form>
);

export const LoginForm = reduxForm({
  form: "requestCode"
})(LoginFormContainer);

type LoginProps = {
  confirmationResult?: ConfirmationResult;
  requestCode: ({ phone }: { phone: string }) => void;
  login: ({ code }: { code: string }) => void;
};

const LoginContainer = ({ confirmationResult, requestCode, login }: LoginProps) =>
  confirmationResult ? <LoginForm onSubmit={login} /> : <RequestCodeForm onSubmit={requestCode} />;

const mapStateToProps = (state: AppState) => ({
  confirmationResult: state.auth.confirmationResult
});

const mapDispatchToProps = (dispatch: any) => ({
  requestCode: ({ phone }: { phone: string }) => dispatch(authRequestCode(phone)),
  login: ({ code }: { code: string }) => dispatch(authLogIn(code))
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
