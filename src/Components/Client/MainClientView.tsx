import { Stack, Button } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import * as appActions from "../../Actions/appActions";
import * as clientActions from "../../Actions/clientActions";

interface MainClientViewProps {
  setCurrentView: (view: string) => void;
  cleanFormNewClient: () => void;
  cleanEmail: () => void;
}

const MainClientView = (props: MainClientViewProps) => {
  const { setCurrentView, cleanFormNewClient, cleanEmail } = props;
  const handleNewClient = () => {
    cleanFormNewClient();
    setCurrentView("newClient");
  };
  const handleCreatedClient = () => {
    cleanEmail();
    setCurrentView("createdClient");
  };

  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Button variant="contained" sx={styles.btn} onClick={handleNewClient}>
        New Client
      </Button>
      <Button variant="contained" sx={styles.btn} onClick={handleCreatedClient}>
        Existing Client
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
  cleanFormNewClient: clientActions.cleanFormNewClient,
  cleanEmail: clientActions.cleanEmail,
};

export default withParamsAndNavigate(MainClientView, mapStateToProps, mapDispatchToProps);
