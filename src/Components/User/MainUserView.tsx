import { Stack, Button } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

interface MainUserViewProps {
  userType: string;
  navigate: NavigateFunction;
}

const MainUserView = (props: MainUserViewProps) => {
  const { navigate, userType } = props;
  const handleNewUser = () => navigate(userType === "MAKER" ? "/maker/newUser" : "/client/newUser");

  const handleSignInUser = () => navigate(userType === "MAKER" ? "/maker/signInUser" : "/client/signInUser");

  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Button variant="contained" sx={styles.btn} onClick={handleNewUser}>
        Create Account
      </Button>
      <Button sx={styles.btn} onClick={handleSignInUser}>
        Sign in
      </Button>
    </Stack>
  );
};

const styles = {
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    mt: 10,
  },
  btn: {
    width: "150px",
  },
};

export default withParamsAndNavigate(MainUserView);
