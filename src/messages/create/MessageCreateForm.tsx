import * as React from "react";
import { Field, reduxForm } from "redux-form";

type Props = {
  handleSubmit: any;
};

const MessageCreateFormContainer = ({ handleSubmit }: Props) => (
  <form name="createMessage" onSubmit={handleSubmit}>
    <label>
      Message:
      <Field name="text" type="text" component="input" />
    </label>
    <button type="submit">Send</button>
  </form>
);

export const MessageCreateForm = reduxForm({
  form: "messageCreate"
})(MessageCreateFormContainer);
