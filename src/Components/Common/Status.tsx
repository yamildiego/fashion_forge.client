import { Box } from "@mui/material";

const Status = (props: { status: StatusType }) => {
  const { status } = props;
  const colors: { [key: string]: string } = {
    DRAFT: "#AAAAAA",
    PUBLISHED: "#17eba0",
    ASSINGNED: "#00e7ce",
    SHIPPED: "#ff8300",
    FINISHED: "#7630ea",
  };

  return <Box sx={{ ...styles.label, background: `${colors[status]}33`, color: colors[status] }}>{status}</Box>;
};

const styles = {
  label: {
    position: "absolute",
    top: "0",
    right: "0",
    padding: "12px",
    cursor: "default",
    userSelect: "none",
  },
};

export default Status;
