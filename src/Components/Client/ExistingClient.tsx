import { ChangeEvent, useState } from "react";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import { Typography, TextField, Grid, Box, Stack, Button } from "@mui/material";

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
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Existing client
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
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
        <Button type="submit" variant="contained" color="primary" sx={styles.btn}>
          Enter
        </Button>
      </Box>
    </Stack>
  );
};

const styles = {
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    mt: 4,
  },
  title: {
    textAlign: "left",
    width: "100%",
  },
  btn: { mt: 2 },
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
