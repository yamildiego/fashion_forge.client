import { ChangeEvent, useState } from "react";

import { TextField, Grid } from "@mui/material";

import FormView from "../FormView";
import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";
import genericValidation from "../../Functions/genericValidation";
import * as clientActions from "../../Actions/clientActions";

interface ExistingClientProps {
  email: ValidationType;
  setEmail: (email: ValidationType) => void;
  getExistingClient: (email: string) => void;
}

const ExistingClient = (props: ExistingClientProps) => {
  const { email } = props;
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleOnChange = (pEmail: ValidationType) => {
    if (submitted) props.setEmail(runValidation(pEmail));
    else props.setEmail(pEmail);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);

    let emailValidated = runValidation(email);
    props.setEmail(emailValidated);

    if (!emailValidated.error) props.getExistingClient(email.value);
  };

  const runValidation = (email: ValidationType) => {
    let emailValidated = genericValidation(email.value, "required", "Email");
    if (!emailValidated.error) emailValidated = genericValidation(email.value, "email", "Email");
    return emailValidated;
  };

  return (
    <FormView title="Existing client" submitText="Enter" handleSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus={true}
            required
            id="name"
            name="name"
            label="Email"
            fullWidth
            placeholder="Enter your email address"
            value={email.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChange({ ...email, value: event.target.value })}
            error={email.error && submitted}
            helperText={email.helperText}
          />
        </Grid>
      </Grid>
    </FormView>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    email: state.clientReducer.existing_customer_email,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setEmail: clientActions.setEmail,
  getExistingClient: clientActions.getExistingClient,
};

export default withParamsAndNavigate(ExistingClient, mapStateToProps, mapDispatchToProps);
