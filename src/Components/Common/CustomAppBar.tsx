import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface CustomAppBarProps {
  title: string;
  user?: string;
  currentView?: string;
  handleOnClickBack?: () => void;
}

const CustomAppBar = (props: CustomAppBarProps) => {
  const { title, user, currentView, handleOnClickBack } = props;
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
            <IconButton onClick={handleOnClickBack}>
              <ExitToAppIcon sx={{ color: "white" }} />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
