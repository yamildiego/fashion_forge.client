import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import withParamsAndNavigate from "./Hooks/withParamsAndNavigate";

import Home from "./Screens/Home";
import Client from "./Screens/Client";
import Maker from "./Screens/Maker";

import Loading from "./Components/Loading";

const theme = {
  palette: {
    primary: { main: "#9b70fe", dark: "#8460c2", light: "#a09fcf", contrastText: "#FFFFFF" },
  },
  typography: { fontFamily: "Cabin" },
};

interface AppProps {
  isLoading: boolean;
}

const App = (props: AppProps) => {
  const { isLoading } = props;
  let mdTheme = createTheme(theme);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<Client />} />
        <Route path="/maker" element={<Maker />} />
      </Routes>
      {isLoading && <Loading />}
    </ThemeProvider>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    isLoading: state.appReducer.isLoading,
  };
};

export default withParamsAndNavigate(App, mapStateToProps);
