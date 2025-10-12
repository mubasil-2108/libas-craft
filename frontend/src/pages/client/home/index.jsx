import { Box } from "@mui/material";
import { Banner, Categories, MainProduct } from "../../../components/client";

const Home = () => {

  return (
    <Box
      sx={{
        position: "relative",
      }}>
      <Banner />
      <Categories />
      <MainProduct />
      
    </Box>
  );
};

export default Home;
