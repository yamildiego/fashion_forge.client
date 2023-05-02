import React, { Component } from "react";
import { Container, Box } from "@mui/material";
import { Location } from "react-router-dom";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import CustomAppBar from "../Components/Common/CustomAppBar";

import * as appActions from "../Actions/appActions";

interface TemplateProps {
  user: UserType;
  navigate: NavigateFunction;
  mainView: Component;
  job: JobType;
  didMount?: (id?: number) => void;
  location: Location;
  params?: { id?: number };
  myProps?: any;
  getCurrentUser: () => void;
}

class Template extends Component<TemplateProps> {
  componentDidMount() {
    const { didMount } = this.props;
    this.props.getCurrentUser();
    if (didMount) didMount(this.props?.params?.id ?? undefined);
  }

  componentDidUpdate(oldProps: TemplateProps) {
    const { navigate, didMount, myProps } = this.props;
    const { pathname } = this.props.location;
    if (oldProps.user !== this.props.user && this.props.user === null) {
      if (pathname !== "/client" && pathname !== "/maker" && pathname !== "/client/newUser" && pathname !== "/maker/newUser") {
        if (myProps.userType === "CLIENT") navigate("/client/signInUser");
        if (myProps.userType === "MAKER") navigate("/maker/signInUser");
      }
    }

    if (oldProps.user !== this.props.user && this.props.user !== null) {
      if (myProps.userType === "CLIENT") navigate("/client/home");
      if (myProps.userType === "MAKER") navigate("/maker/home");
    }

    if (oldProps.job !== this.props.job && this.props.job === null) {
      if (myProps.userType === "CLIENT") navigate("/client/home");
      if (myProps.userType === "MAKER") navigate("/maker/home");
    }

    if (didMount && oldProps.location.pathname !== this.props.location.pathname) didMount(this.props?.params?.id ?? undefined);
  }

  render() {
    const { mainView, myProps } = this.props;
    return (
      <Container sx={{ display: "flex", flexDirection: "column", flex: 1, p: 0 }}>
        <CustomAppBar userType={myProps?.userType ?? ""} />
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Box maxWidth="sm" sx={{ padding: "0 10px", width: "100%" }}>
            {
              /* @ts-ignore */
              React.createElement(mainView, { ...(myProps ? myProps : {}) })
            }
          </Box>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state: StateType) => {
  return {
    user: state.appReducer.user,
    job: state.appReducer.job,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  getCurrentUser: appActions.getCurrentUser,
};

export default withParamsAndNavigate(Template, mapStateToProps, mapDispatchToProps);
