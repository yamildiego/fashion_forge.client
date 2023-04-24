import { Stack, Button } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import * as appActions from "../../Actions/appActions";
import * as userActions from "../../Actions/userActions";

interface MainUserViewProps {
  setCurrentView: (view: string) => void;
  cleanFormUser: () => void;
}

const MainUserView = (props: MainUserViewProps) => {
  const { setCurrentView, cleanFormUser } = props;
  const handleNewUser = () => {
    cleanFormUser();
    setCurrentView("newUser");
  };

  const handleSignInUser = () => {
    cleanFormUser();
    setCurrentView("signInUser");
  };

  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Button variant="contained" sx={styles.btn} onClick={handleNewUser}>
        Create Account
      </Button>
      <Button sx={styles.btn} onClick={handleSignInUser}>
        Sign in instead
      </Button>
    </Stack>
  );
};

const styles = {
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    mt: 4,
  },
  btn: {
    width: "150px",
  },
};

const mapStateToProps = (state: StateType) => {
  return {};
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  cleanFormUser: userActions.cleanFormUser,
};

export default withParamsAndNavigate(MainUserView, mapStateToProps, mapDispatchToProps);
