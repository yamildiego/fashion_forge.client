import React from "react";

import { Stack, Box, Button, Typography } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import ListJobs from "./ListJobs";

interface HomeClientViewProps {
  jobs: JobType[];
  navigate: NavigateFunction;
}

const HomeClientView = (props: HomeClientViewProps) => {
  const { navigate } = props;

  return (
    <Stack spacing={2} direction="column">
      <Stack spacing={2} direction="row" sx={styles.header}>
        <Typography variant="h4" sx={styles.title}>
          My jobs
        </Typography>
        <Button onClick={() => navigate("/client/newJob")} variant="contained" color="primary" sx={styles.btn}>
          New job
        </Button>
      </Stack>
      {props.jobs.length === 0 && <Box sx={styles.noElements}>No jobs added</Box>}
      {props.jobs.length > 0 && <ListJobs />}
    </Stack>
  );
};

const styles = {
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
  return {
    jobs: state.clientReducer.jobs,
  };
};

export default withParamsAndNavigate(HomeClientView, mapStateToProps);
