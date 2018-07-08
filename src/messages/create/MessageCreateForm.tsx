import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "@material-ui/core";
import { TextField } from "redux-form-material-ui";

type Props = {
  handleSubmit: any;
};

const MessageCreateFormContainer = ({ handleSubmit }: Props) => (
  <form name="createMessage" onSubmit={handleSubmit}>
    <div className="flex">
      <div className="grow">
        <Field fullWidth name="text" component={TextField} label="Type good news..." />
      </div>
      <div className="flex end">
        <Button type="submit">Send</Button>
      </div>
    </div>
  </form>
);

export const MessageCreateForm = reduxForm({
  form: "messageCreate"
})(MessageCreateFormContainer);
