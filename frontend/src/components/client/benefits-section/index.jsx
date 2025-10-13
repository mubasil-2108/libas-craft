import { Box, Typography } from "@mui/material";
import { benefits, colors } from "../../../services";

const BenefitsSection = () => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.greenLight_1,
        py: { xs: 5, sm: 7, md: 10 }, // vertical padding
        px: { xs: 2, sm: 4, md: 10 }, // horizontal padding
      }}
    >
      {/* Heading */}
      <Typography
        sx={{
          color: colors.textColor_7,
          fontSize: { xs: "26px", sm: "38px", md: "52px", lg: "64px" },
          textAlign: "center",
          fontFamily: "playfairDisplay",
          fontWeight: 600,
          mb: { xs: 4, sm: 5, md: 7 },
          lineHeight: 1.2,
        }}
      >
        Benefits for your expediency
      </Typography>

      {/* Benefits Container */}
      <Box
        component="div"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 4, sm: 5, md: 6 },
          width: "100%",
          maxWidth: "1200px",
          justifyItems: "center",
        }}
      >
        {benefits.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: colors.bgColor_4 || "transparent",
              borderRadius: "16px",
              p: { xs: 2, sm: 3 },
              width: "100%",
              maxWidth: { xs: "320px", sm: "300px", md: "340px" },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: item.bgColor,
                width: { xs: 60, sm: 70, md: 80 },
                height: { xs: 60, sm: 70, md: 80 },
                borderRadius: { xs: "14px", sm: "16px", md: "20px" },
                mb: { xs: 2, sm: 2.5 },
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: { xs: 28, sm: 34, md: 40 },
                  height: { xs: 28, sm: 34, md: 40 },
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              sx={{
                color: colors.textColor_8,
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                fontFamily: "playfairDisplay",
                fontWeight: 500,
                mb: 1,
              }}
            >
              {item.name}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                color: colors.textColor_8,
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
                fontFamily: "openSans-regular",
                lineHeight: 1.4,
                whiteSpace: "pre-line",
              }}
            >
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BenefitsSection;
