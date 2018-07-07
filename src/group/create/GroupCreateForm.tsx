import * as React from "react";
import { Field, reduxForm } from "redux-form";

type Props = {
  handleSubmit: any;
};

const GroupCreateFormContainer = ({ handleSubmit }: Props) => (
  <form onSubmit={handleSubmit}>
    <label>
      Name:
      <Field name="name" type="text" component="input" />
    </label>
    <button type="submit">Create group</button>
  </form>
);

export const GroupCreateForm = reduxForm({
  form: "groupCreate"
})(GroupCreateFormContainer);
