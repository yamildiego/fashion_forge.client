import { ChangeEvent, useState } from "react";

import { TextField, Grid } from "@mui/material";

import FormView from "../Common/FormView";
import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";
import genericValidation from "../../Functions/genericValidation";
import * as userActions from "../../Actions/userActions";

interface SignInUserViewProps {
  formUser: FormUserType;
  userType: string;
  setFormUser: (userForm: FormUserType) => void;
  signInUser: (email: string, password: string, userType: string) => void;
}

const SignInUserView = (props: SignInUserViewProps) => {
  const { formUser } = props;
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleOnChange = (formUser: FormUserType) => {
    if (submitted) props.setFormUser(runValidation(formUser));
    else props.setFormUser(formUser);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);

    let formValidated = runValidation(formUser);
    props.setFormUser(formValidated);

    let hasError = Object.values(formValidated).some((field) => field.error);
    let userFormatted = Object.entries(formValidated).reduce((acc, [key, value]) => ({ ...acc, [key]: value.value }), {} as UserType);

    if (!hasError) props.signInUser(userFormatted.email, userFormatted?.password ?? "", props.userType);
  };

  const runValidation = (formNew: FormUserType) => {
    let formValidated: FormUserType = {
      ...formNew,
      email: genericValidation(formNew.email.value, "required", "Email"),
      password: genericValidation(formNew.password.value, "required", "Password"),
    };

    if (!formValidated.email.error) formValidated.email = genericValidation(formNew.email.value, "email", "Email");

    return formValidated;
  };

  return (
    <FormView title="Sign in" submitText="Sign in" handleSubmit={handleSubmit}>
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
            value={formUser.email.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formUser, email: { ...formUser.email, value: event.target.value } })
            }
            error={formUser.email.error && submitted}
            helperText={formUser.email.helperText}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            placeholder="Password"
            value={formUser.password.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formUser, password: { ...formUser.password, value: event.target.value } })
            }
            error={formUser.password.error && submitted}
            helperText={formUser.password.helperText}
          />
        </Grid>
      </Grid>
    </FormView>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    formUser: state.userReducer.formUser,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormUser: userActions.setFormUser,
  signInUser: userActions.signInUser,
};

export default withParamsAndNavigate(SignInUserView, mapStateToProps, mapDispatchToProps);
