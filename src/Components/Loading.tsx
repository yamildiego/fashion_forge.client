import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Backdrop sx={styles.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const styles = {
  backdrop: {
    zIndex: 10,
    color: "#fff",
  },
};

export default Loading;
