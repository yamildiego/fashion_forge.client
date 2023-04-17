import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <Box sx={styles.container}>
      <Stack spacing={2} direction="column" sx={{ mb: 10 }}>
        <Typography variant="h4" gutterBottom sx={styles.title}>
          Test Meyd.it Internship
        </Typography>
        <Button variant="contained">Entry as Consumer</Button>
        <Button variant="contained">Entry as Maker</Button>
      </Stack>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  title: {
    userSelect: "none",
  },
};

export default Home;
