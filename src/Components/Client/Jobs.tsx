import React, { useState } from "react";

import { Stack, Box, Button, Typography } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import * as appActions from "../../Actions/appActions";

interface JobsProps {
  setCurrentView: (view: string) => void;
}

const Jobs = (props: JobsProps) => {
  const handleOnClick = () => {
    props.setCurrentView("newJob");
  };

  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      <Stack spacing={2} direction="row" sx={styles.header}>
        <Typography variant="h4" sx={styles.title}>
          My jobs
        </Typography>
        <Button onClick={handleOnClick} variant="contained" color="primary" sx={styles.btn}>
          New job
        </Button>
      </Stack>
      <Box sx={styles.noElements}>No elements added</Box>
    </Stack>
  );
};

const styles = {
  container: {},
  header: {
    mt: 4,
  },
  title: {
    flex: 1,
    textAlign: "left",
  },
  btn: {
    mt: 2,
    minWidth: "100px",
  },
  noElements: {
    pt: 8,
    textAlign: "center",
  },
};

const mapStateToProps = (state: StateType) => {
  return {};
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setCurrentView: appActions.setCurrentView,
};

export default withParamsAndNavigate(Jobs, mapStateToProps, mapDispatchToProps);
