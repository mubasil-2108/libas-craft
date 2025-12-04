import { Box, Typography } from "@mui/material";
import { Banner, BenefitsSection, Categories, FeaturedProduct, MainProduct, NewArrival, PopularProduct, SpecialPackage } from "../../../components/client";
import { colors } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllProducts } from "../../../store/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Categories
  const categories = useMemo(() => {
    if (!products) return [];

    const uniqueCategories = [
      ...new Set(products.map((p) => p.category?.trim())),
    ];

    return uniqueCategories;
  }, [products]);
  // const {}= useSelector((state) => state.someSlice);
  return (
    <Box
      sx={{
        position: "relative",
      }}>
      <Banner />
      {
        categories && categories.length > 1 && (
          <Categories categoryList={categories} />
        )
      }
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
