import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import { Grid } from "@mui/material";

import FormView from "../Common/FormView";

import JobView from "../Common/JobView";

interface ViewProps {
  job: JobType;
}

const View = (props: ViewProps) => {
  const { job } = props;

  return (
    <FormView title={`Job information`} handleSubmit={() => {}}>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        <JobView job={job} />
      </Grid>
    </FormView>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    job: state.appReducer.job,
  };
};

export default withParamsAndNavigate(View, mapStateToProps);
