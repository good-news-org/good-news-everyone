import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "@material-ui/core";
import { TextField } from 'redux-form-material-ui';

type Props = {
  handleSubmit: any;
};

const MessageCreateFormContainer = ({ handleSubmit }: Props) => (
  <form name="createMessage" onSubmit={handleSubmit}>
    <label>
      <Field name="text" component={TextField} label="Type good news..." />      
    </label>
    <Button type="submit">Send</Button>
  </form>
);

export const MessageCreateForm = reduxForm({
  form: "messageCreate"
})(MessageCreateFormContainer);
