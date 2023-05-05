import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import withParamsAndNavigate from "./Hooks/withParamsAndNavigate";

import Template from "./Screens/Template";

import Home from "./Screens/Home";

import NewUserView from "./Components/User/NewUserView";
import SignInUserView from "./Components/User/SignInUserView";

import HomeClientView from "./Components/Client/HomeClientView";
import NewJob from "./Components/Client/NewJob";
import EditJob from "./Components/Client/EditJob";
import ViewJob from "./Components/Client/View";
import Quotes from "./Components/Client/Quotes";

import HomeMakerView from "./Components/Maker/HomeMakerView";
import ViewUserAndJob from "./Components/Maker/View";

import Loading from "./Components/Loading";
import Errors from "./Components/Errors";

import * as clientActions from "./Actions/clientActions";
import * as makerActions from "./Actions/makerActions";

const theme = {
  palette: {
    primary: { main: "#8BC34A", dark: "#71a436", light: "#b0d683", contrastText: "#FFFFFF" },
  },
  typography: { fontFamily: "Cabin" },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: { width: "100%!important" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: "2px", fontSize: "16px" },
      },
    },
  },
};

interface AppProps {
  filter: FilterType;
  isLoading: boolean;
  getJobs: () => void;
  getJobById: (id: number) => void;
  cleanFormNewJob: () => void;
  getJobsByFilter: (filter: FilterType) => void;
}

const App = (props: AppProps) => {
  const { isLoading } = props;
  let mdTheme = createTheme(theme);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* CLIENT */}
        <Route
          path="/client/newUser"
          element={<Template myProps={{ title: "Create your Meyd.it Account", userType: "CLIENT" }} mainView={NewUserView} />}
        />
        <Route path="/client/signInUser" element={<Template myProps={{ userType: "CLIENT" }} mainView={SignInUserView} />} />
        <Route
          path="/client/home"
          element={<Template myProps={{ userType: "CLIENT" }} didMount={() => props.getJobs()} mainView={HomeClientView} />}
        />
        <Route
          path="/client/newJob"
          element={<Template myProps={{ userType: "CLIENT" }} didMount={() => props.cleanFormNewJob()} mainView={NewJob} />}
        />
        <Route
          path="/client/editJob/:id"
          element={<Template myProps={{ userType: "CLIENT" }} didMount={(id: number) => props.getJobById(id)} mainView={EditJob} />}
        />
        <Route
          path="/client/viewQuotes/:id"
          element={<Template myProps={{ userType: "CLIENT" }} didMount={(id: number) => props.getJobById(id)} mainView={Quotes} />}
        />
        <Route
          path="/client/viewQuotes/:id"
          element={<Template myProps={{ userType: "CLIENT" }} didMount={(id: number) => props.getJobById(id)} mainView={ViewJob} />}
        />

        {/* MAKER */}
        <Route
          path="/maker/newUser"
          element={<Template myProps={{ title: "Become Our Partner", userType: "MAKER" }} mainView={NewUserView} />}
        />
        <Route path="/maker/signInUser" element={<Template myProps={{ userType: "MAKER" }} mainView={SignInUserView} />} />
        <Route
          path="/maker/home"
          element={
            <Template myProps={{ userType: "MAKER" }} didMount={() => props.getJobsByFilter(props.filter)} mainView={HomeMakerView} />
          }
        />
        <Route
          path="/maker/viewJob/:id"
          element={<Template myProps={{ userType: "MAKER" }} didMount={(id: number) => props.getJobById(id)} mainView={ViewUserAndJob} />}
        />
      </Routes>
      {isLoading && <Loading />}
      <Errors />
    </ThemeProvider>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    isLoading: state.appReducer.isLoading,
    filter: state.makerReducer.filter,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  getJobs: clientActions.getJobs,
  getJobById: clientActions.getJobById,
  cleanFormNewJob: clientActions.cleanFormNewJob,
  getJobsByFilter: makerActions.getJobsByFilter,
};

export default withParamsAndNavigate(App, mapStateToProps, mapDispatchToProps);
