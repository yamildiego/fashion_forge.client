import { ReactNode } from "react";
import { Typography, Box, Stack, Button } from "@mui/material";

interface FormViewProps {
  title: string;
  submitText?: string;
  children: ReactNode;
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
  firstExtraBtnText?: string;
  handleActionFirstExtraBtn?: () => void;
  secondExtraBtnText?: string;
  handleActionSecondExtraBtn?: () => void;
}

const FormView = (props: FormViewProps) => {
  const handleExtraAction = () => {
    if (props.handleActionFirstExtraBtn) props.handleActionFirstExtraBtn();
  };

  const handleSecondExtraAction = () => {
    if (props.handleActionSecondExtraBtn) props.handleActionSecondExtraBtn();
  };

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
        {props.firstExtraBtnText && props.handleActionFirstExtraBtn && (
          <Button onClick={handleExtraAction} variant="contained" color="warning" sx={styles.btn}>
            {props.firstExtraBtnText}
          </Button>
        )}
        {props.secondExtraBtnText && props.handleActionSecondExtraBtn && (
          <Button onClick={handleSecondExtraAction} variant="contained" color="inherit" sx={styles.btn}>
            {props.secondExtraBtnText}
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
  btn: { mt: 2, mr: 2 },
};

export default FormView;
