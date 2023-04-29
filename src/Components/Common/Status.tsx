import { Box } from "@mui/material";

const Status = (props: { status: StatusType; showLabel?: boolean; wasQuoted?: boolean }) => {
  const { status, showLabel, wasQuoted } = props;

  const colors: { [key: string]: string } = {
    DRAFT: "#AAAAAA",
    PUBLISHED: wasQuoted ? "#627cba" : "#17eba0",
    ASSINGNED: "#00e7ce",
    SHIPPED: "#ff8300",
    FINISHED: "#7630ea",
  };

  return (
    <Box sx={{ ...styles.label, background: `${colors[status]}33`, color: colors[status] }}>{`${status} ${
      showLabel ? (wasQuoted ? "(QUOTED)" : "(NEW)") : ""
    }`}</Box>
  );
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
