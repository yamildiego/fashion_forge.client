import { ChangeEvent } from "react";
import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import Address from "../Address";

import { Typography, TextField, Grid, Stack, Button } from "@mui/material";

import * as clientActions from "../../Actions/clientActions";

interface NewClientProps {
  formNewClient: FormClientType;
  setFormNewClient: (view: FormClientType) => void;
}

const NewClient = (props: NewClientProps) => {
  const { formNewClient } = props;

  const handleOnChange = (value: FormClientType) => {
    props.setFormNewClient(value);
  };

  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Typography variant="h4">New client</Typography>
      <form>
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
            />
          </Grid>
          <Address />
        </Grid>
        <Button variant="contained" color="primary" sx={styles.btn}>
          Submit
        </Button>
      </form>
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
