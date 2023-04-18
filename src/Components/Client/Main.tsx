import { Stack, Button } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import * as appActions from "../../Actions/appActions";

interface MainProps {
  setCurrentView: (view: string) => void;
}

const Main = (props: MainProps) => {
  const { setCurrentView } = props;
  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Button variant="contained" sx={styles.btn} onClick={() => setCurrentView("newClient")}>
        New Client
      </Button>
      <Button variant="contained" sx={styles.btn} onClick={() => setCurrentView("existingClient")}>
        Existing Client
      </Button>
    </Stack>
  );
};

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    mt: 8,
  },
  btn: {
    width: "150px",
  },
};

const mapStateToProps = (state: StateType) => {};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
};

export default withParamsAndNavigate(Main, mapStateToProps, mapDispatchToProps);
