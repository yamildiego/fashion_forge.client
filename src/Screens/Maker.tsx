import { Component } from "react";
import { NavigateFunction } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import MainMakerView from "../Components/Maker/MainMakerView";

import * as appActions from "../Actions/appActions";
import * as makerActions from "../Actions/makerActions";

interface MakerProps {
  currentView: string;
  navigate: NavigateFunction;
  setCurrentView: (view: string) => void;
  getAllJobs: () => void;
}

class Maker extends Component<MakerProps> {
  componentDidMount() {
    this.props.getAllJobs();
  }

  componentDidUpdate(oldProps: MakerProps) {
    if (oldProps.currentView !== this.props.currentView && this.props.currentView == "main") this.props.getAllJobs();
  }

  // handleOnClickBack = () => {
  //   const { currentView, navigate, setCurrentView } = this.props;

  //   switch (currentView) {
  //     case "main":
  //     case "jobs":
  //       navigate("/");
  //       setCurrentView("main");
  //       break;
  //     case "existingMaker":
  //     case "newMaker":
  //       setCurrentView("main");
  //       break;
  //     case "newJob":
  //       setCurrentView("jobs");
  //       break;
  //     default:
  //       break;
  //   }
  // };

  render() {
    const { currentView } = this.props;

    return (
      <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* {currentView !== "jobs" && (
              <IconButton onClick={this.handleOnClickBack}>
                <ArrowBackIcon sx={{ color: "white" }} />
              </IconButton>
            )} */}
            <Typography variant="h6" component="div" sx={{ flex: 1, ml: 1 }}>
              Maker dashboard
            </Typography>
            {/* {currentView == "jobs" && (
              <>
                <Box sx={{ mr: 1 }}>{`${Maker?.name ?? ""} ${Maker?.lastname ?? ""}`}</Box>
                <IconButton onClick={this.handleOnClickBack}>
                  <ExitToAppIcon sx={{ color: "white" }} />
                </IconButton>
              </>
            )} */}
          </Toolbar>
        </AppBar>

        {currentView === "main" && <MainMakerView />}
        {/* {currentView === "viewJob" && <ViewJob />} */}
        {/* {currentView === "viewClient" && <ViewClient />} */}
      </Container>
    );
  }
}

const mapStateToProps = (state: StateType) => {
  return {
    currentView: state.appReducer.currentView,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
  getAllJobs: makerActions.getAllJobs,
};

export default withParamsAndNavigate(Maker, mapStateToProps, mapDispatchToProps);
