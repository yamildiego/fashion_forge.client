import Box from "@mui/material/Box";

interface StatusProps {
  status: string;
  len: number;
}

const statusData = {
  new: { title: "PUBLISHED (NEW)", color: "#b8e0d2", textColor: "#35c290" },
  with_quotes: { title: "PUBLISHED (%Q_TOTAL% QUOTES)", color: "#ce82ea", textColor: "#8d38ad" },
  quoted: { title: "QUOTED WAITING FOR AN ANSWER (%Q_TOTAL% QUOTES)", color: "#9ccff3", textColor: "#287bb6" },
};

const Status = (props: StatusProps) => {
  return (
    //@ts-ignore
    <Box sx={{ ...styles.label, background: statusData[props.status].color }}>
      <span
        style={{
          ...styles.text,
          //@ts-ignore
          color: statusData[props.status].textColor,
        }}
      >
        {
          //@ts-ignore
          statusData[props.status].title.replace("%Q_TOTAL%", props.len)
        }
      </span>
    </Box>
  );
};

const styles = {
  label: {
    position: "absolute",
    top: "0",
    right: "0",
    padding: "12px",
  },
  text: {
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default Status;
