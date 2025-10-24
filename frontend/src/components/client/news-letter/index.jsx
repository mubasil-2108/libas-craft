import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { colors } from '../../../services'

const NewsLetter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        backgroundColor: colors.white,
        p: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          boxShadow: { md: "0px 4px 20px rgba(0,0,0,0.1)" },
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* LEFT IMAGE */}
        <Box
          component="img"
          src="/news-letter.jpg"
          alt="Newsletter"
          sx={{
            width: { xs: "100%", sm: "100%", md: "600px" },
            height: { xs: "220px", sm: "300px", md: "400px" },
            objectFit: "cover",
          }}
        />

        {/* RIGHT SECTION */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: colors.blueLight_2,
            flexGrow: 1,
            justifyContent: "center",
            px: { xs: 3, sm: 6, md: 10 },
            py: { xs: 4, sm: 5, md: 0 },
            width: { xs: "100%", md: "600px" },
            height: { xs: "auto", md: "400px" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Heading */}
          <Typography
            sx={{
              color: colors.textColor_7,
              fontSize: { xs: "38px", sm: "48px", md: "64px" },
              fontFamily: "playfairDisplay-regular",
              lineHeight: 0.9,
            }}
          >
            Join Our{" "}
            <Typography
              component="span"
              sx={{
                color: colors.textColor_7,
                fontSize: { xs: "38px", sm: "48px", md: "64px" },
                fontFamily: "playfairDisplay",
              }}
            >
              Newsletter
            </Typography>
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              color: colors.textColor_7,
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              fontFamily: "roboto-regular",
              mt: 1.5,
              mb: 2.5,
            }}
          >
            Receive exclusive deals, discounts and many offers.
          </Typography>

          {/* Email Input */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: { xs: 2, sm: 2.5 },
              width: { xs: "80%", sm: "80%", md: "100%" },
              mx: { xs: "auto", md: 0 },
            }}
          >
            <TextField
              type="email"
              placeholder="Enter your email address"

              sx={{
                width: { xs: "100%", sm: "70%", md: "350px" },
                backgroundColor: colors.white,
                borderRadius: "10px",
                fontSize: { xs: "14px", sm: "16px", },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: { xs: "45px", sm: "50px" },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.borderColor_7,
                },
              }}
            />

            {/* Subscribe Button */}
            <Button
              sx={{
                minWidth: "150px",
                color: colors.textColor_9,
                fontFamily: "roboto-regular",
                backgroundColor: colors.greenDark_1,
                textTransform: "none",
                fontSize: { xs: "14px", sm: "16px" },
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.2 },
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: colors.greenDark_2,
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsLetter;
