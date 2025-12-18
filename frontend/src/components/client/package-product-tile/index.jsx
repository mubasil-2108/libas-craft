import { Box, Button, Icon, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { colors } from "../../../services";

const PackageProductTile = ({ item }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box
            sx={{
                p: isMobile ? 2 : 2.5,
                width: {
                    xs: 230,   // fixed width for horizontal scroll
                    sm: 270,
                    md: 250,
                    lg: 250,
                },
                height: {
                    xs: 270,
                    sm: 300,
                    md: 300,
                    lg: 310,
                },
                flexShrink: 0,
                minHeight: isMobile ? 160 : 280,
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                justifyContent: "space-between",
                background: "#e8e8e8",
                boxShadow:
                    "5px 5px 6px #dadada, -5px -5px 6px #f6f6f6",
                transition: "0.3s ease",
                // mx: "auto",
                "&:hover": {
                    transform: isDesktop ? "translateY(-10px)" : "none",
                },
            }}
        >
                <Box>

            {/* Image */}
            <Box
                component='img'
                src={`https://www.googleapis.com/drive/v3/files/${item?.productPhoto?.[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                sx={{
                    height: isMobile ? 140 : isTablet ? 155 : 170,
                    borderRadius: "15px",
                    objectFit: "cover",
                    width: "100%",
                    backgroundColor: "#c9c9c9",
                    boxShadow:
                        "inset 8px 8px 10px #c3c3c3, inset -8px -8px 10px #cfcfcf",
                }}
            />

            {/* Title */}
            <Typography
                sx={{
                    fontSize: {
                        xs: "15px",
                        sm: "16px",
                        md: "18px",
                    },
                    fontWeight: 600,
                    fontFamily: "openSans-bold",
                    color: colors.textColor_10,
                    mt: 2,
                    ml: 1,
                }}
            >
                {item?.productName}
            </Typography>

            {/* Body */}
            <Typography
                sx={{
                    mt: 1.5,
                    ml: 1,
                    fontSize: {
                        xs: "13.5px",
                        sm: "14.5px",
                        md: "15px",
                    },
                    fontFamily: "inter-regular",
                    color: colors.textColor_1,
                    lineHeight: 1.5,
                }}
            >
                {item?.productDescription?.slice(0, 80) + (item?.productDescription?.length > 80 ? "..." : "")}
            </Typography>
</Box>
            {/* Footer */}
            <Typography href={`/package/product/${item?._id}`} component='a' sx={{
                alignSelf: 'flex-end',
                fontFamily: "openSans-regular",
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: "14px",
                color: colors.textColor_4,
                "&:hover": {
                    color: colors.textColor_7,
                },
            }}>View Detail</Typography>
        </Box>
    );
};

export default PackageProductTile;
