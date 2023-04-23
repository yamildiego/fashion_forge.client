import { Component } from "react";
import { NavigateFunction } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import MainUserView from "../Components/User/MainUserView";
import NewUserView from "../Components/User/NewUserView";
import SignInUserView from "../Components/User/SignInUserView";
// import Jobs from "../Components/Client/Jobs";
// import NewJob from "../Components/Client/NewJob";

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
              Maker dashboard
            </Typography>
            {currentView === "jobs" && (
              <>
                <Box sx={{ mr: 1 }}>{`${user?.business_name ?? ""}`}</Box>
                <IconButton onClick={this.handleOnClickBack}>
                  <ExitToAppIcon sx={{ color: "white" }} />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>

        {currentView === "main" && <MainUserView />}
        {currentView === "newUser" && <NewUserView title="Become Our Partner" userType="MAKER" />}
        {currentView === "signInUser" && <SignInUserView userType="MAKER" />}
        {/* {currentView === "jobs" && <Jobs />} */}
        {/* {currentView === "newJob" && <NewJob />} */}
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

// import { Component } from "react";
// import { NavigateFunction } from "react-router-dom";
// import { AppBar, Toolbar, Typography, Container, IconButton } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

// import MainMakerView from "../Components/Maker/MainMakerView";

// import * as appActions from "../Actions/appActions";
// import * as makerActions from "../Actions/makerActions";

// interface MakerProps {
//   currentView: string;
//   navigate: NavigateFunction;
//   setCurrentView: (view: string) => void;
//   getAllJobs: () => void;
// }

// class Maker extends Component<MakerProps> {
//   componentDidMount() {
//     this.props.getAllJobs();
//   }

//   componentDidUpdate(oldProps: MakerProps) {
//     if (oldProps.currentView !== this.props.currentView && this.props.currentView === "main") this.props.getAllJobs();
//   }

//   handleOnClickBack = () => {
//     const { currentView, navigate, setCurrentView } = this.props;
//     switch (currentView) {
//       case "main":
//         navigate("/");
//         setCurrentView("main");
//         break;
//       //     case "existingMaker":
//       //     case "newMaker":
//       //       setCurrentView("main");
//       //       break;
//       //     case "newJob":
//       //       setCurrentView("jobs");
//       //       break;
//       default:
//         break;
//     }
//   };

//   render() {
//     const { currentView } = this.props;

//     return (
//       <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
//         <AppBar position="static">
//           <Toolbar>
//             {currentView !== "jobs" && (
//               <IconButton onClick={this.handleOnClickBack}>
//                 <ArrowBackIcon sx={{ color: "white" }} />
//               </IconButton>
//             )}
//             <Typography variant="h6" component="div" sx={{ flex: 1, ml: 1 }}>
//               Maker dashboard
//             </Typography>
//             {/* {currentView == "jobs" && (
//               <>
//                 <Box sx={{ mr: 1 }}>{`${Maker?.name ?? ""} ${Maker?.lastname ?? ""}`}</Box>
//                 <IconButton onClick={this.handleOnClickBack}>
//                   <ExitToAppIcon sx={{ color: "white" }} />
//                 </IconButton>
//               </>
//             )} */}
//           </Toolbar>
//         </AppBar>

//         {currentView === "main" && <MainMakerView />}
//         {/* {currentView === "viewJob" && <ViewJob />} */}
//         {/* {currentView === "viewClient" && <ViewClient />} */}
//       </Container>
//     );
//   }
// }

// const mapStateToProps = (state: StateType) => {
//   return {
//     currentView: state.appReducer.currentView,
//   };
// };

// const mapDispatchToProps: MyMapDispatchToProps = {
//   setCurrentView: appActions.setCurrentView,
//   getAllJobs: makerActions.getAllJobs,
// };

// export default withParamsAndNavigate(Maker, mapStateToProps, mapDispatchToProps);
