import {
  Box,
  Button,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef } from "react";
import { colors } from "../../../services";
import ProductTile from "../product-tile";
import Scrollbars from "react-custom-scrollbars";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { MdArrowRightAlt } from "react-icons/md";

const PopularProduct = () => {
  const listRef = useRef(null);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Dummy product array for rendering
  const products = [1, 2, 3, 4, 5, 6];

  // Smooth scroll helper
  const smoothScroll = (target, distance, duration = 400) => {
    if (!target || !target.view) return;
    const scrollView = target.view;
    const start = scrollView.scrollLeft;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      scrollView.scrollLeft = start + distance * progress;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const scrollLeft = () => listRef.current && smoothScroll(listRef.current, -250);
  const scrollRight = () => listRef.current && smoothScroll(listRef.current, 250);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, sm: 4, md: 0 },
        py: { xs: 5, sm: 7, md: 10 },
        gap: { xs: 3, sm: 4, md: 6 },
        backgroundColor: colors.white,
        overflow: "hidden",
      }}
    >
      {/* --- Title --- */}
      <Typography
        sx={{
          fontFamily: "playfairDisplay",
          fontSize: { xs: "28px", sm: "40px", md: "56px", lg: "64px" },
          textAlign: "center",
          color: colors.textColor_7,
          zIndex: 2,
          maxWidth: "90%",
          lineHeight: 1.2,
        }}
      >
        Popular Products
      </Typography>

      {/* Background Image */}
      <Box
        component="img"
        src="/background-3.png"
        alt="Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: "100%", sm: "70%", md: "50%" },
          height: "100%",
          objectFit: "cover",
        //   opacity: { xs: 0.08, sm: 0.15 },
          zIndex: 0,
        }}
      />

      {/* --- Scrollable Product List --- */}
      <Box component="div" sx={{ width: "100%", position: "relative" }}>
        <Scrollbars
          ref={listRef}
          autoHeight={false}
          renderView={(props) => (
            <div
              {...props}
              style={{
                ...props.style,
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
                overflowY: "hidden",
                gap: isMobile ? "12px" : "24px",
                // padding: isMobile ? "5px 0px" : "10px 0px",
                scrollBehavior: "smooth",
              }}
            />
          )}
          renderThumbHorizontal={(props) => (
            <div
              {...props}
              style={{
                ...props.style,
                backgroundColor: colors.greenDark_1,
                borderRadius: "6px",
              }}
            />
          )}
          style={{
            width: "100%",
            height: isMobile ? 400 : isTablet ? 400 : 500,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              pl: { xs: 2, sm: 6, md: 10 },
              display: "flex",
              flexDirection: "row",
            }}
          >
            {products.map((_, index) => (
              <ProductTile key={index} />
            ))}
          </Box>
        </Scrollbars>

        {/* --- Navigation Buttons --- */}
        <Box
          component="div"
          sx={{
            position: "absolute",
            bottom: isMobile ? -35 : -35,
            right: isMobile ? "50%" : 50,
            transform: isMobile ? "translateX(50%)" : "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 2,
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={scrollLeft}
            size="small"
            sx={{
              backgroundColor: colors.iconBgColor_6,
              "&:hover": { backgroundColor: colors.grayLight_1 },
            }}
          >
            <ArrowBackOutlinedIcon
              sx={{ fontSize: { xs: 16, sm: 18 }, color: colors.iconColor_14 }}
            />
          </IconButton>
          <IconButton
            onClick={scrollRight}
            size="small"
            sx={{
              backgroundColor: colors.iconBgColor_5,
              "&:hover": { backgroundColor: colors.grayLight_1 },
            }}
          >
            <ArrowForwardOutlinedIcon
              sx={{ fontSize: { xs: 16, sm: 18 }, color: colors.iconColor_14 }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* --- CTA Button --- */}
      <Button
        endIcon={<Icon component={MdArrowRightAlt} />}
        sx={{
          color: colors.textColor_9,
          fontFamily: "openSans-regular",
          backgroundColor: colors.greenDark_1,
          textTransform: "none",
          fontSize: { xs: "14px", sm: "16px" },
          mt: isMobile ? 4 : 3,
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.2 },
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: colors.greenDark_2,
          },
        }}
      >
        Explore all items
      </Button>
    </Box>
  );
};

export default PopularProduct;
