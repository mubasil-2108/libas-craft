import { Box, Typography } from "@mui/material";
import { Banner, BenefitsSection, Categories, MainProduct, PopularProduct, SpecialPackage } from "../../../components/client";
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
      <SpecialPackage />
      <BenefitsSection />
      <PopularProduct />
    </Box>
  );
};

export default Home;
