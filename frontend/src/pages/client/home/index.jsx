import { Box, Typography } from "@mui/material";
import { Banner, BenefitsSection, Categories, MainProduct } from "../../../components/client";
import { colors } from "../../../services";

const Home = () => {

  return (
    <Box
      sx={{
        position: "relative",
      }}>
      <Banner />
      <Categories />
      <MainProduct />
      <BenefitsSection />
    </Box>
  );
};

export default Home;
