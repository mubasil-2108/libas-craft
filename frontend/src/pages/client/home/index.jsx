import { Box, Typography } from "@mui/material";
import { Banner, BenefitsSection, Categories, FeaturedProduct, IngredientCardSlider, MainProduct, NewArrival, PopularProduct, SpecialPackage } from "../../../components/client";
import { colors } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllProducts } from "../../../store/slices/productSlice";
import { getAllPackages } from "../../../store/slices/packageSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);
  const { isPackageLoading, packages } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);

  // Categories
  const categories = useMemo(() => {
    if (!products) return [];

    const uniqueCategories = [
      ...new Set(products.map((p) => p.category?.trim())),
    ];

    return uniqueCategories;
  }, [products]);

  // Find the product marked as mainProduct
  const mainProduct = useMemo(() => {
    return products.find((p) => p?.mainProduct === true) || null;
  }, [products]);

  const mainPackage = useMemo(() => {
    return packages.find((p) => p?.mainPackage === true) || null;
  }, [packages]);

  const newArrivals = useMemo(() => {
    if (!products) return [];

    const now = new Date();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    return [...products]
      .filter(product => {
        const date = new Date(product.updatedAt || product.createdAt);
        return now - date <= THIRTY_DAYS;
      })
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
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
      {/* Show only if main product exists */}
      {mainProduct && <MainProduct product={mainProduct} />}
      {/* Show only if main package exists */}
      {mainPackage && <SpecialPackage packages={packages} mainPackage={mainPackage} />}
      <BenefitsSection />
      <IngredientCardSlider />

      {/* <PopularProduct />
      <FeaturedProduct /> */}
      {newArrivals.length > 0 && <NewArrival products={newArrivals} />}
    </Box>
  );
};

export default Home;
