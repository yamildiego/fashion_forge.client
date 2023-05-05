import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Location } from "react-router-dom";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import * as userActions from "../../Actions/userActions";

interface CustomAppBarProps {
  userType: string;
  title: string;
  user: UserType;
  signOutUser: () => void;
  location: Location;
  navigate: NavigateFunction;
}

const CustomAppBar = (props: CustomAppBarProps) => {
  const { user, signOutUser, location, navigate, userType, title } = props;

  const rootsPath = location.pathname !== "/" && location.pathname !== "/maker/home" && location.pathname !== "/client/home";
  console.log(location.pathname);

  const handleOnClickBack = () => {
    switch (location.pathname) {
      case "/maker/signInUser":
        navigate("/maker/newUser");
        break;
      case "/client/signInUser":
        navigate("/client/newUser");
        break;
      case "/maker/newUser":
      case "/client/newUser":
        navigate("/");
        break;
      default:
        navigate(-1);
        break;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {rootsPath && (
          <IconButton onClick={handleOnClickBack}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flex: 1, ml: 1 }}>
          {title && <>{title}</>}
          {userType === "CLIENT" && "Client dashboard"}
          {userType === "MAKER" && "Maker dashboard"}
        </Typography>
        {user && (
          <>
            <Box sx={{ mr: 1 }}>
              {userType === "CLIENT" && `${user?.name ?? ""} ${user?.lastname ?? ""}`}
              {userType === "MAKER" && `${user?.business_name ?? ""}`}
            </Box>
            <IconButton onClick={() => signOutUser()}>
              <ExitToAppIcon sx={{ color: "white" }} />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    user: state.appReducer.user,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  signOutUser: userActions.signOutUser,
};

export default withParamsAndNavigate(CustomAppBar, mapStateToProps, mapDispatchToProps);
