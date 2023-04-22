import { Component } from "react";
import { NavigateFunction } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import MainUserView from "../Components/User/MainUserView";
import NewUserView from "../Components/User/NewUserView";
import SignInUserView from "../Components/User/SignInUserView";
import Jobs from "../Components/Client/Jobs";
import NewJob from "../Components/Client/NewJob";

import * as appActions from "../Actions/appActions";
import * as clientActions from "../Actions/clientActions";

interface ClientProps {
  user: UserType;
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
      case "signInUser":
      case "newUser":
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
    const { currentView, user } = this.props;

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
                <Box sx={{ mr: 1 }}>{`${user?.name ?? ""} ${user?.lastname ?? ""}`}</Box>
                <IconButton onClick={this.handleOnClickBack}>
                  <ExitToAppIcon sx={{ color: "white" }} />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>

        {currentView === "main" && <MainUserView />}
        {currentView === "newUser" && <NewUserView title="Create your Meyd.it Account" userType="CLIENT" />}
        {currentView === "signInUser" && <SignInUserView userType="CLIENT" />}
        {currentView === "jobs" && <Jobs />}
        {currentView === "newJob" && <NewJob />}
      </Container>
    );
  }
}

const mapStateToProps = (state: StateType) => {
  return {
    currentView: state.appReducer.currentView,
    user: state.appReducer.user,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  getJobs: clientActions.getJobs,
};

export default withParamsAndNavigate(Client, mapStateToProps, mapDispatchToProps);
