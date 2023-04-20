import { NavigateFunction } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import Main from "../Components/Client/Main";
import NewClient from "../Components/Client/NewClient";
import ExistingClient from "../Components/Client/ExistingClient";
import Jobs from "../Components/Client/Jobs";
import NewJob from "../Components/Client/NewJob";

import * as appActions from "../Actions/appActions";

interface ClientProps {
  currentView: string;
  navigate: NavigateFunction;
  setCurrentView: (view: string) => void;
}

const Client = (props: ClientProps) => {
  const { currentView, navigate } = props;

  const handleOnClickBack = () => {
    switch (currentView) {
      case "main":
      case "jobs":
        navigate("/");
        props.setCurrentView("main");
        break;
      case "existingClient":
      case "newClient":
        props.setCurrentView("main");
        break;
      case "newJob":
        props.setCurrentView("jobs");
        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {currentView !== "jobs" && (
            <IconButton onClick={handleOnClickBack}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flex: 1, ml: 1 }}>
            Client dashboard
          </Typography>
          {currentView == "jobs" && (
            <IconButton onClick={handleOnClickBack}>
              <ExitToAppIcon sx={{ color: "white" }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {currentView === "main" && <Main />}
      {currentView === "newClient" && <NewClient />}
      {currentView === "existingClient" && <ExistingClient />}
      {currentView === "jobs" && <Jobs />}
      {currentView === "newJob" && <NewJob />}
    </Container>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    currentView: state.appReducer.currentView,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
};

export default withParamsAndNavigate(Client, mapStateToProps, mapDispatchToProps);
