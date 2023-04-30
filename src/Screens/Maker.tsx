import { Component } from "react";
import { NavigateFunction } from "react-router-dom";
import { Container, Box } from "@mui/material";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import MainUserView from "../Components/User/MainUserView";
import NewUserView from "../Components/User/NewUserView";
import SignInUserView from "../Components/User/SignInUserView";
import Jobs from "../Components/Maker/Jobs";
import View from "../Components/Maker/View";

import CustomAppBar from "../Components/Common/CustomAppBar";

import * as appActions from "../Actions/appActions";
import * as makerActions from "../Actions/makerActions";

import UploadImages from "../Components/UploadImages";

interface MakerProps {
  user: UserType;
  currentView: string;
  navigate: NavigateFunction;
  filter: FilterType;
  setCurrentView: (view: string) => void;
  getJobsByFilter: (filter: FilterType) => void;
}

class Maker extends Component<MakerProps> {
  componentDidUpdate(oldProps: MakerProps) {
    if (oldProps.currentView !== this.props.currentView && this.props.currentView === "jobs") this.props.getJobsByFilter(this.props.filter);
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
      case "view":
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
          title="Maker dashboard"
          user={`${user?.business_name ?? ""}`}
          handleOnClickBack={this.handleOnClickBack}
        />
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Box maxWidth="sm" sx={{ padding: "0 10px", width: "100%" }}>
            {currentView === "main" && <MainUserView />}
            {currentView === "newUser" && <NewUserView title="Become Our Partner" userType="MAKER" />}
            {currentView === "signInUser" && <SignInUserView userType="MAKER" />}
            {currentView === "jobs" && <Jobs />}
            {currentView === "view" && <View />}
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
    filter: state.makerReducer.filter,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  getJobsByFilter: makerActions.getJobsByFilter,
};

export default withParamsAndNavigate(Maker, mapStateToProps, mapDispatchToProps);
