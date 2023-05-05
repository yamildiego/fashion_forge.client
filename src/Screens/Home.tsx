import { Stack, Box, Container, Button } from "@mui/material";

import withParamsAndNavigate from "../Hooks/withParamsAndNavigate";

import CustomAppBar from "../Components/Common/CustomAppBar";

import logo from "../Assets/logo.png";

interface HomeProps {
  navigate: NavigateFunction;
}

const Home = (props: HomeProps) => {
  const { navigate } = props;
  return (
    <Container sx={{ display: "flex", flexDirection: "column", flex: 1, p: 0 }}>
      <CustomAppBar />

      <img src={logo} alt="" style={{ maxWidth: "200px", margin: "50px auto 20px auto" }} />
      <Box sx={{ textAlign: "center", fontFamily: "system-ui", textTransform: "uppercase", mb: 4 }}>
        Where your design, It is our craftsmanship.
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Box maxWidth="sm" sx={styles.container}>
          <Stack spacing={2} direction="row">
            <Button color="info" variant="contained" onClick={() => navigate("/client/newUser")}>
              Find a Design Workshop
            </Button>
            <Button color="warning" variant="contained" onClick={() => navigate("/maker/newUser")}>
              Join as a Maker
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 2,
  },
};

export default withParamsAndNavigate(Home);
