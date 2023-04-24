import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

interface ViewProps {
  job: JobType;
}

const View = (props: ViewProps) => {
  return <>{JSON.stringify(props.job)}</>;
};

const mapStateToProps = (state: StateType) => {
  return {
    job: state.makerReducer.job,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  //   setCurrentView: appActions.setCurrentView,
  //   setJob: makerActions.setJob,
};

export default withParamsAndNavigate(View, mapStateToProps, mapDispatchToProps);
