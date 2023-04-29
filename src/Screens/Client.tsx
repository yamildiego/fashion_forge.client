import { Component } from "react";
import { NavigateFunction } from "react-router-dom";
import { Container, Box } from "@mui/material";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import MainUserView from "../Components/User/MainUserView";
import NewUserView from "../Components/User/NewUserView";
import SignInUserView from "../Components/User/SignInUserView";
import Jobs from "../Components/Client/Jobs";
import NewJob from "../Components/Client/NewJob";

import CustomAppBar from "../Components/Common/CustomAppBar";

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
    if (oldProps.currentView !== this.props.currentView && this.props.currentView === "reload") this.props.setCurrentView("jobs");
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
      <Container sx={{ display: "flex", flexDirection: "column", flex: 1, p: 0 }}>
        <CustomAppBar
          currentView={currentView}
          title="Client dashboard"
          user={`${user?.name ?? ""} ${user?.lastname ?? ""}`}
          handleOnClickBack={this.handleOnClickBack}
        />
        {currentView}
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Box maxWidth="sm" sx={{ padding: "0 10px", width: "100%" }}>
            {currentView === "main" && <MainUserView />}
            {currentView === "newUser" && <NewUserView title="Create your Meyd.it Account" userType="CLIENT" />}
            {currentView === "signInUser" && <SignInUserView userType="CLIENT" />}
            {currentView === "jobs" && <Jobs />}
            {currentView === "newJob" && <NewJob />}
          </Box>
        </Box>
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
