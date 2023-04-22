import { NavigateFunction } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

interface HomeProps {
  navigate: NavigateFunction;
}

const Home = (props: HomeProps) => {
  const { navigate } = props;
  return (
    <Box sx={styles.container}>
      <Stack spacing={2} direction="column" sx={{ mb: 10 }}>
        <Typography variant="h4" gutterBottom sx={styles.title}>
          Test Meyd.it Internship
        </Typography>
        <Button variant="contained" onClick={() => navigate("/client")}>
          Entry as Client
        </Button>
        <Button variant="contained" onClick={() => navigate("/maker")}>
          Entry as Maker
        </Button>
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
    mb: 8,
  },
};

export default withParamsAndNavigate(Home);
