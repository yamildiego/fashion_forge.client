import { Stack } from "@mui/material";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

interface ExistingClientProps {
  // setExistingClientView: (view: string) => void;
}

const ExistingClient = (props: ExistingClientProps) => {
  // const { setExistingClientView } = props;
  return (
    <Stack spacing={2} direction="column" sx={styles.container}>
      introduca email
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
  // setExistingClientView: appActions.setExistingClientView,
};

export default withParamsAndNavigate(ExistingClient, mapStateToProps, mapDispatchToProps);
