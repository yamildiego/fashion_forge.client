import { NavigateFunction } from "react-router-dom";

import { Stack, Box, Container, Button } from "@mui/material";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import CustomAppBar from "../Components/Common/CustomAppBar";

interface HomeProps {
  navigate: NavigateFunction;
}

const Home = (props: HomeProps) => {
  const { navigate } = props;
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", flex: 1, p: 0 }}>
      <CustomAppBar title="Test Meyd.it Internship" />
      <Box sx={styles.container}>
        <Stack spacing={2} direction="column">
          <Button variant="contained" onClick={() => navigate("/client")}>
            Entry as Client
          </Button>
          <Button variant="contained" onClick={() => navigate("/maker")}>
            Entry as Maker
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 10,
  },
};

export default withParamsAndNavigate(Home);
