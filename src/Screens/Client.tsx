import { AppBar, Toolbar, Typography, Container } from "@mui/material";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import Main from "../Components/Client/Main";
import NewClient from "../Components/Client/NewClient";
import ExistingClient from "../Components/Client/ExistingClient";
import Jobs from "../Components/Client/Jobs";

interface ClientProps {
  currentView: string;
}

const Client = (props: ClientProps) => {
  const { currentView } = props;

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Client dashboard
          </Typography>
          {/* <FormControl className={classes.formControl}> */}
          {/* <FormControl>
            <Select value={state} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
              <MenuItem value="" disabled>
                Select a state
              </MenuItem>
              {states.map((state) => (
                <MenuItem key={state.value} value={state.value}>
                  {state.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select your state</FormHelperText>
          </FormControl> */}
        </Toolbar>
      </AppBar>

      {currentView === "main" && <Main />}
      {currentView === "newClient" && <NewClient />}
      {currentView === "existingClient" && <ExistingClient />}
      {currentView === "jobs" && <Jobs />}
    </Container>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    currentView: state.appReducer.currentView,
  };
};

export default withParamsAndNavigate(Client, mapStateToProps);
