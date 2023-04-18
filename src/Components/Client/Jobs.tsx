import { Stack } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

interface JobsProps {
  // setJobsView: (view: string) => void;
}

const Jobs = (props: JobsProps) => {
  // const { setJobsView } = props;
  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      Jobs
    </Stack>
  );
};

const styles = {
  container: {
    mt: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
};

const mapStateToProps = (state: StateType) => {};

const mapDispatchToProps: MyMapDispatchToProps = {
  // setMainView: appActions.setMainView,
};

export default withParamsAndNavigate(Jobs, mapStateToProps, mapDispatchToProps);
