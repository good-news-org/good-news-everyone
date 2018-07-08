import Button from "@material-ui/core/Button";
import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { TextField } from 'redux-form-material-ui';

type Props = {
  handleSubmit: any;
};

const GroupCreateFormContainer = ({ handleSubmit }: Props) => (
  <form onSubmit={handleSubmit}>
    <label>
      <Field name="name" component={TextField} hintText="Group name" />
    </label>
    <Button type="submit" variant="contained" color="primary">
      Create group
    </Button>
  </form>
);

export const GroupCreateForm = reduxForm({
  form: "groupCreate"
})(GroupCreateFormContainer);
