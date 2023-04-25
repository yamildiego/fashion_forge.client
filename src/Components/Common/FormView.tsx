import { ReactNode } from "react";
import { Typography, Box, Stack, Button } from "@mui/material";

interface FormViewProps {
  title: string;
  submitText?: string;
  children: ReactNode;
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
}

const FormView = (props: FormViewProps) => {
  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        {props.title}
      </Typography>
      <Box component="form" onSubmit={props.handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
        {props.children}
        {props.submitText && (
          <Button type="submit" variant="contained" color="primary" sx={styles.btn}>
            {props.submitText}
          </Button>
        )}
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
    mb: 2,
  },
  btn: { mt: 2 },
};

export default FormView;
