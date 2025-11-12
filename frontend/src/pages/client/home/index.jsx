import { Box, Typography } from "@mui/material";
import { Banner, BenefitsSection, Categories, FeaturedProduct, MainProduct, NewArrival, PopularProduct, SpecialPackage } from "../../../components/client";
import { colors } from "../../../services";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  // const dispatch = useDispatch();
  // const {}= useSelector((state) => state.someSlice);
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
      <FeaturedProduct />
      <NewArrival />
    </Box>
  );
};

export default Home;
