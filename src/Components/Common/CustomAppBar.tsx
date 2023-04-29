import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";

import * as userActions from "../../Actions/userActions";

interface CustomAppBarProps {
  title: string;
  user?: string;
  currentView?: string;
  handleOnClickBack?: () => void;
  signOutUser: () => void;
}

const CustomAppBar = (props: CustomAppBarProps) => {
  const { title, user, currentView, handleOnClickBack, signOutUser } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        {currentView && currentView !== "jobs" && (
          <IconButton onClick={handleOnClickBack}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flex: 1, ml: 1 }}>
          {title}
        </Typography>
        {currentView && currentView === "jobs" && (
          <>
            <Box sx={{ mr: 1 }}>{user ? user : ""}</Box>
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
  return {};
};

const mapDispatchToProps: MyMapDispatchToProps = {
  signOutUser: userActions.signOutUser,
};

export default withParamsAndNavigate(CustomAppBar, mapStateToProps, mapDispatchToProps);
