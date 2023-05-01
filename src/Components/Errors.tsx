import React from "react";
import { MapDispatchToProps } from "react-redux";
import { TransitionGroup } from "react-transition-group";

import { Box, Alert, AlertTitle, List, Collapse } from "@mui/material";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";
import * as appActions from "../Actions/appActions";

interface ErrorsProps {
  errors: [ErrorType];
  removeError: (key: number) => void;
}

class Errors extends React.Component<ErrorsProps> {
  close = (key: number) => this.props.removeError(key);

  componentDidUpdate(oldProps: ErrorsProps) {
    if (oldProps.errors !== this.props.errors && this.props.errors.length > 0) {
      let lastOne = this.props.errors[this.props.errors.length - 1];
      setTimeout(() => this.props.removeError(lastOne.key), 5000);
    }
  }

  render() {
    const { errors } = this.props;

    return (
      <Box sx={styles.container}>
        <List>
          <TransitionGroup>
            {errors.map((error, index) => (
              <Collapse key={index}>
                <Alert sx={{ ...styles.error, width: "100%" }} severity={error.severity}>
                  <AlertTitle>{error.title}</AlertTitle>
                  {error.description}
                  <Box onClick={() => this.close(error.key)} sx={styles.close}>
                    X
                  </Box>
                </Alert>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    );
  }
}

const styles = {
  container: {
    width: "100%",
    position: "fixed",
    zIndex: 220,
    userSelect: "none",
    transform: "translateX(-50%)",
    top: 0,
    left: "50%",
    padding: "0 2%",
    margin: "auto",
    mt: 1,
    maxWidth: "400px",
  },
  error: {
    position: "relative",
    mb: "10px",
  },
  close: {
    position: "absolute",
    right: "6px",
    top: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

const mapStateToProps = (state: StateType) => ({
  errors: state.appReducer.errors,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  removeError: appActions.removeError,
};

export default withParamsAndNavigate(Errors, mapStateToProps, mapDispatchToProps);
