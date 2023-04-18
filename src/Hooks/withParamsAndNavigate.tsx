import { useParams, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

const withParamsAndNavigate = (Component: any, mapStateToProps?: any, mapDispatchToProps?: any) => {
  let Connect = connect(mapStateToProps, mapDispatchToProps)(Component);
  return (props: any) => (
    <Connect {...props} params={useParams()} location={useLocation()} navigate={useNavigate()} dispatch={useDispatch()} />
  );
};

export default withParamsAndNavigate;
