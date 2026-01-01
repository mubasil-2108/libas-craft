import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { colors, reasons } from "../../../services";
import { useNavigate } from "react-router-dom";
import Note from "../note";

const Banner = ({ data }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const theme = useTheme();
  const navigate = useNavigate();
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const note = data?.note;
  const site = data?.site;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(site?.headline, "site.headline");
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: colors.white,
        display: "flex",
        alignItems: "center",
      }}
    >
      {
        note && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            zIndex: 20,
            width: '100%',
          }}>
            <Note note={note} />
          </Box>
        )
      }
      {/* Diagonal Curved Shape */}

      <Box
        component="svg"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
        width={width}
        height="100%"
        viewBox={`0 0 ${width} 100`}
        preserveAspectRatio="none"
      >
        <Box
          component="path"
          d={`
            M0,0
            C${width * 0.25},60 ${width * 0.75},30 ${width},100
            L${width},100
            L0,100
            Z
          `}
          fill={colors.greenLight_1}
        />
      </Box>

      {/* Image within Curved Shape */}
      <Box
        component="svg"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          transform: "rotate(180deg)",
        }}
        width={width}
        height="100%"
        viewBox={`0 0 ${width} 100`}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="imgPattern"
            patternUnits="userSpaceOnUse"
            patternTransform={`scale(-1.2,-1.2) translate(-${width * 3}, 205)`}
            width="100%"
            height="100%"
          >
            <image
              href="/libas-craft-2.jpg"
              width="50%"
              height="100%"
              x={width - width * 0.45}
              y={0}
              preserveAspectRatio="none"
            />
          </pattern>
        </defs>
        <Box
          component="path"
          d={`
            M0,0
            C${width * 0.15},130 ${width * 0.85},-50 ${width},500
            L${width},100
            L0,100
            Z
          `}
          fill="url(#imgPattern)"
        />
      </Box>

      {/* Content */}
      <Box
        component="div"
        sx={{
          position: "absolute",
          top: isMobile ? "15%" : "20%",
          left: isMobile ? "6%" : "10%",
          width: isMobile ? "85%" : "auto",
          zIndex: 10,
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "15px" : "20px",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
            sx={{
              color: colors.textColor_7,
              fontFamily: "cinzel-decorative",
              lineHeight: 1.3,
              fontWeight: isMobile ? 700 : 100,
            }}
          >
            {site?.headline.split(",").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
            {/* Nourish Your Hair,
            <br /> Radiate Beauty */}
          </Typography>

          <Typography
            sx={{
              color: colors.textColor_4,
              fontSize: isMobile ? "14px" : "18px",
              fontFamily: "nunito-sans",
              maxWidth: isMobile ? "100%" : "500px",
            }}
          >
           {site?.description}
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate('/collections/all')}
            sx={{
              backgroundColor: colors.greenDark_1,
              color: colors.textColor_5,
              borderRadius: "10px",
              padding: isMobile ? "10px 15px" : "15px 20px",
              fontSize: isMobile ? "14px" : "16px",
              fontFamily: "cinzel-bold",
              width: isMobile ? "150px" : "200px",
              "&:hover": {
                backgroundColor: colors.greenDark_2,
              },
            }}
          >
            Shop Now
          </Button>
        </Box>

        {/* WHY US section */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 4 : 15,
            mt: isMobile ? 15 : 10,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              color: colors.textColor_7,
              fontFamily: "cinzel",
            }}
          >
            WHY US?
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // always row
              flexWrap: "wrap", // allows wrapping on small screens
              gap: isMobile ? 3 : 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {reasons.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  width: isMobile ? "80px" : "auto", // optional, keeps layout tidy
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  width={isMobile ? 35 : 60} // smaller size on mobile
                  height={isMobile ? 35 : 60}
                  alt={item.reason}
                />
                <Typography
                  sx={{
                    color: colors.textColor_4,
                    ffontSize: isMobile ? "12px" : "18px",
                    textAlign: "center",
                    fontFamily: "nunito-sans",
                    whiteSpace: "pre-line", // keeps line breaks like “Natural\nIngredients”
                  }}
                >
                  {item.reason}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
