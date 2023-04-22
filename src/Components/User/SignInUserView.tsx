import { ChangeEvent, useState } from "react";

import { TextField, Grid } from "@mui/material";

import FormView from "../Common/FormView";
import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";
import genericValidation from "../../Functions/genericValidation";
import * as userActions from "../../Actions/userActions";

interface SignInUserViewProps {
  userEmail: ValidationType;
  userType: string;
  setEmail: (email: ValidationType) => void;
  signInUser: (email: string, userType: string) => void;
}

const SignInUserView = (props: SignInUserViewProps) => {
  const { userEmail } = props;
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleOnChange = (pEmail: ValidationType) => {
    if (submitted) props.setEmail(runValidation(pEmail));
    else props.setEmail(pEmail);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);

    let emailValidated = runValidation(userEmail);
    props.setEmail(emailValidated);

    if (!emailValidated.error) props.signInUser(userEmail.value, props.userType);
  };

  const runValidation = (email: ValidationType) => {
    let emailValidated = genericValidation(email.value, "required", "Email");
    if (!emailValidated.error) emailValidated = genericValidation(email.value, "email", "Email");
    return emailValidated;
  };

  return (
    <FormView title="Sign in" submitText="Enter" handleSubmit={handleSubmit}>
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
            value={userEmail.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChange({ ...userEmail, value: event.target.value })}
            error={userEmail.error && submitted}
            helperText={userEmail.helperText}
          />
        </Grid>
      </Grid>
    </FormView>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    userEmail: state.userReducer.userEmail,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setEmail: userActions.setEmail,
  signInUser: userActions.signInUser,
};

export default withParamsAndNavigate(SignInUserView, mapStateToProps, mapDispatchToProps);
