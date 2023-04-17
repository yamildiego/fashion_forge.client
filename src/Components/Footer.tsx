import Box from "@mui/material/Box";

const Footer = () => {
  return <Box sx={styles.container}>Test Meyd.it Internship</Box>;
};

const styles = {
  container: {
    position: "absolute",
    color: "#777",
    userSelect: "none",
    fontSize: "12px",
    bottom: "10px",
    right: "10px",
  },
};

export default Footer;
