import { Box } from "@mui/material";
import { Banner, Categories } from "../../../components/client";

const Home = () => {

  return (
    <Box
      sx={{
        position: "relative",
      }}>
      <Banner />
      <Categories />
    </Box>
  );
};

export default Home;
