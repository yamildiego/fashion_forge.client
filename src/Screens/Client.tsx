import { Component } from "react";
import { NavigateFunction } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import MainClientView from "../Components/Client/MainClientView";
import NewClientView from "../Components/Client/NewClientView";
import CreatedClientView from "../Components/Client/CreatedClientView";
import Jobs from "../Components/Job/Jobs";
import NewJob from "../Components/Job/NewJob";

import * as appActions from "../Actions/appActions";
import * as jobActions from "../Actions/jobActions";

interface ClientProps {
  client: ClientType;
  currentView: string;
  navigate: NavigateFunction;
  setCurrentView: (view: string) => void;
  getJobs: () => void;
}

class Client extends Component<ClientProps> {
  componentDidUpdate(oldProps: ClientProps) {
    if (oldProps.currentView !== this.props.currentView && this.props.currentView === "jobs") this.props.getJobs();
  }

  handleOnClickBack = () => {
    const { currentView, navigate, setCurrentView } = this.props;

    switch (currentView) {
      case "main":
      case "jobs":
        navigate("/");
        setCurrentView("main");
        break;
      case "createdClient":
      case "newClient":
        setCurrentView("main");
        break;
      case "newJob":
        setCurrentView("jobs");
        break;
      default:
        break;
    }
  };

  render() {
    const { currentView, client } = this.props;

    return (
      <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {currentView !== "jobs" && (
              <IconButton onClick={this.handleOnClickBack}>
                <ArrowBackIcon sx={{ color: "white" }} />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flex: 1, ml: 1 }}>
              Client dashboard
            </Typography>
            {currentView === "jobs" && (
              <>
                <Box sx={{ mr: 1 }}>{`${client?.name ?? ""} ${client?.lastname ?? ""}`}</Box>
                <IconButton onClick={this.handleOnClickBack}>
                  <ExitToAppIcon sx={{ color: "white" }} />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>

        {currentView === "main" && <MainClientView />}
        {currentView === "newClient" && <NewClientView />}
        {currentView === "createdClient" && <CreatedClientView />}
        {currentView === "jobs" && <Jobs />}
        {currentView === "newJob" && <NewJob />}
      </Container>
    );
  }
}

const mapStateToProps = (state: StateType) => {
  return {
    currentView: state.appReducer.currentView,
    client: state.appReducer.client,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  getJobs: jobActions.getJobs,
};

export default withParamsAndNavigate(Client, mapStateToProps, mapDispatchToProps);
