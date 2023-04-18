import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./Screens/Home";
import Client from "./Screens/Client";
import Maker from "./Screens/Maker";

interface AppProps {}

const theme = {
  palette: {
    primary: { main: "#9b70fe", dark: "#8460c2", light: "#a09fcf", contrastText: "#FFFFFF" },
  },
  typography: { fontFamily: "Cabin" },
};

class App extends Component<AppProps> {
  render() {
    let mdTheme = createTheme(theme);
    return (
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/maker" element={<Maker />} />
        </Routes>
      </ThemeProvider>
    );
  }
}

export default App;
