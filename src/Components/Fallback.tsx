import Box from "@mui/material/Box";

const Fallback = () => {
  return <Box sx={styles.fallback}>Loading...</Box>;
};

const styles = {
  fallback: {
    fontSize: "25px",
    textAlign: "center",
    fontFamily: "monospace",
  },
};

export default Fallback;
