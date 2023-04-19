import { ChangeEvent, useState } from "react";
import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import { Typography, TextField, Grid, Box, Stack, Button } from "@mui/material";

import genericValidation from "../../Functions/genericValidation";

import Address from "../Address";

import * as clientActions from "../../Actions/clientActions";

interface NewClientProps {
  formNewClient: FormClientType;
  setFormNewClient: (view: FormClientType) => void;
}

const NewClient = (props: NewClientProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { formNewClient } = props;

  const handleOnChange = (value: FormClientType) => {
    if (submitted) props.setFormNewClient(runValidation(value));
    else props.setFormNewClient(value);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);
    let formValidated = runValidation(formNewClient);
    props.setFormNewClient(formValidated);
    let hasError = Object.values(formValidated).some((field) => (field as ValidationType)?.error);

    if (!hasError) console.log("send the form");
  };

  const runValidation = (formNew: FormClientType) => {
    let formValidated: FormClientType = {
      ...formNew,
      name: genericValidation(formNew.name.value, "required", "Name"),
      lastname: genericValidation(formNew.lastname.value, "required", "Lastname"),
      phone: genericValidation(formNew.phone.value, "required", "Phone"),
      email: genericValidation(formNew.email.value, "required", "Email"),
      address: genericValidation(formNew.address.value, "required", "Address"),
    };

    if (!formValidated.email.error) formValidated.email = genericValidation(formNew.email.value, "email", "Email");

    return formValidated;
  };

  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Typography variant="h4">New client</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus={true}
              required
              id="name"
              name="name"
              label="Name"
              fullWidth
              value={formNewClient.name.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleOnChange({ ...formNewClient, name: { ...formNewClient.name, value: event.target.value } })
              }
              error={formNewClient.name.error && submitted}
              helperText={formNewClient.name.helperText}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Last Name"
              fullWidth
              value={formNewClient.lastname.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleOnChange({ ...formNewClient, lastname: { ...formNewClient.lastname, value: event.target.value } })
              }
              error={formNewClient.lastname.error && submitted}
              helperText={formNewClient.lastname.helperText}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
              value={formNewClient.phone.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleOnChange({ ...formNewClient, phone: { ...formNewClient.phone, value: event.target.value } })
              }
              error={formNewClient.phone.error && submitted}
              helperText={formNewClient.phone.helperText}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              value={formNewClient.email.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleOnChange({ ...formNewClient, email: { ...formNewClient.email, value: event.target.value } })
              }
              error={formNewClient.email.error && submitted}
              helperText={formNewClient.email.helperText}
            />
          </Grid>
          <Address submitted={submitted} />
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={styles.btn}>
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    mt: 4,
  },
  btn: { mt: 2 },
};

const mapStateToProps = (state: StateType) => {
  return {
    formNewClient: state.clientReducer.formNewClient,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormNewClient: clientActions.setFormNewClient,
};

export default withParamsAndNavigate(NewClient, mapStateToProps, mapDispatchToProps);
