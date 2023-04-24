import { ChangeEvent, useState } from "react";

import { TextField, Grid } from "@mui/material";

import Address from "./Address";
import FormView from "../Common/FormView";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";
import genericValidation from "../../Functions/genericValidation";
import * as userActions from "../../Actions/userActions";

interface NewUserViewProps {
  title: string;
  formUser: FormUserType;
  userType: string;
  setFormUser: (view: FormUserType) => void;
  newUser: (user: UserType, userType: string) => void;
}

const NewUserView = (props: NewUserViewProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { formUser, userType } = props;

  const handleOnChange = (value: FormUserType) => {
    if (submitted) props.setFormUser(runValidation(value));
    else props.setFormUser(value);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);
    let formValidated = runValidation(formUser);
    props.setFormUser(formValidated);

    let hasError = Object.values(formValidated).some((field) => field.error);
    let clientFormatted = Object.entries(formValidated).reduce((acc, [key, value]) => ({ ...acc, [key]: value.value }), {} as UserType);

    if (!hasError) props.newUser(clientFormatted, userType);
  };

  const runValidation = (formNew: FormUserType) => {
    let formValidated: FormUserType = {
      ...formNew,
      business_name: genericValidation(formNew.business_name.value, userType === "MAKER" ? "required" : "", "Name"),
      name: genericValidation(formNew.name.value, userType === "CLIENT" ? "required" : "", "Name"),
      lastname: genericValidation(formNew.lastname.value, userType === "CLIENT" ? "required" : "", "Lastname"),
      phone: genericValidation(formNew.phone.value, "required", "Phone"),
      email: genericValidation(formNew.email.value, "required", "Email"),
      password: genericValidation(formNew.password.value, "required", "Password"),
      address: genericValidation(formNew.address.value, userType === "CLIENT" ? "required" : "", "Address"),
    };

    if (!formValidated.email.error) formValidated.email = genericValidation(formNew.email.value, "email", "Email");

    return formValidated;
  };

  return (
    <FormView title={props.title} submitText="Create client" handleSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {userType === "MAKER" && (
          <Grid item xs={12}>
            <TextField
              autoFocus={userType === "MAKER"}
              required
              id="business"
              name="business"
              label="Business Name"
              fullWidth
              value={formUser.business_name.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleOnChange({ ...formUser, business_name: { ...formUser.business_name, value: event.target.value } })
              }
              error={formUser.business_name.error && submitted}
              helperText={submitted && formUser.business_name.error ? formUser.business_name.helperText : ""}
            />
          </Grid>
        )}
        {userType === "CLIENT" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus={userType === "CLIENT"}
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                value={formUser.name.value}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange({ ...formUser, name: { ...formUser.name, value: event.target.value } })
                }
                error={formUser.name.error && submitted}
                helperText={submitted && formUser.name.error ? formUser.name.helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastname"
                name="lastname"
                label="Last Name"
                fullWidth
                value={formUser.lastname.value}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange({ ...formUser, lastname: { ...formUser.lastname, value: event.target.value } })
                }
                error={formUser.lastname.error && submitted}
                helperText={submitted && formUser.lastname.error ? formUser.lastname.helperText : ""}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={formUser.email.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formUser, email: { ...formUser.email, value: event.target.value } })
            }
            error={formUser.email.error && submitted}
            helperText={submitted && formUser.email.error ? formUser.email.helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formUser.password.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formUser, password: { ...formUser.password, value: event.target.value } })
            }
            error={formUser.password.error && submitted}
            helperText={submitted && formUser.password.error ? formUser.password.helperText : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            value={formUser.phone.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formUser, phone: { ...formUser.phone, value: event.target.value } })
            }
            error={formUser.phone.error && submitted}
            helperText={submitted && formUser.phone.error ? formUser.phone.helperText : ""}
          />
        </Grid>

        {userType === "CLIENT" && <Address submitted={submitted} />}
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
  newUser: userActions.newUser,
};

export default withParamsAndNavigate(NewUserView, mapStateToProps, mapDispatchToProps);
