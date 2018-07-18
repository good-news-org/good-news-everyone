import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { authRequestCode, authLogIn } from "../auth/authActions";
import { AppState } from "../types/types";
import { ConfirmationResult } from "@firebase/auth-types";
import { Card, Typography, Checkbox, FormControlLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { TextField } from "redux-form-material-ui";
import "./login.css";

type RequestCodeFormProps = {
  handleSubmit: any;
};

const RequestCodeFormContainer = ({ handleSubmit }: RequestCodeFormProps) => (
  <form onSubmit={handleSubmit}>
    <Field name="phone" type="text" label="Phone" component={TextField} fullWidth />
    <FormControlLabel control={<Checkbox value="qwe" />} label="Remember me" />
    <Button fullWidth={true} type="submit" className="button" variant="contained" color="primary">
      Login
    </Button>
    <div id="button-login" />
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
    <Field name="code" type="text" label="Code" component={TextField} fullWidth />
    <FormControlLabel control={<Checkbox value="qwe" />} label="Remember me" />
    <Button fullWidth={true} type="submit" className="button" variant="contained" color="primary">
      Login
    </Button>
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

const LoginContainer = ({ confirmationResult, requestCode, login }: LoginProps) => (
  <div className="flex grow center">
    <Card className="login">
      <Typography variant="title" color="inherit" gutterBottom>
        Sign in
      </Typography>
      {confirmationResult ? <LoginForm onSubmit={login} /> : <RequestCodeForm onSubmit={requestCode} />}
      <Typography gutterBottom>Error or something</Typography>
    </Card>
  </div>
);

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
