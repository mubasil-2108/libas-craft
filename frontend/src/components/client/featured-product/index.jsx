import { Box, Button, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { colors, dummyCatalog } from '../../../services'
import Scrollbars from 'react-custom-scrollbars';
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ProductTile from '../product-tile';
import { MdArrowRightAlt } from "react-icons/md";

const FeaturedProduct = () => {
    const listRef = useRef(null);

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    // const products = [1, 2, 3, 4, 5, 6];

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
                // zIndex: 2,
                py: { xs: 5, sm: 7, md: 10 },
                gap: { xs: 3, sm: 4, md: 6 },
                backgroundColor: colors.white,
                overflow: "hidden",
            }}
        >

            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: "-100px",
                    width: { xs: 180, sm: 250, md: 300 },
                    height: { xs: 180, sm: 250, md: 300 },
                    borderRadius: "50%",
                    background: `radial-gradient(circle at center, ${colors.greenDark_1}60, transparent 70%)`,
                    zIndex: 4,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    right: "-100px",
                    width: { xs: 180, sm: 250, md: 300 },
                    height: { xs: 180, sm: 250, md: 300 },
                    borderRadius: "50%",
                    background: `radial-gradient(circle at center, ${colors.greenDark_2}60, transparent 70%)`,
                    zIndex: 4,
                }}
            />
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
                Featured Products
            </Typography>
            <Box component='div' sx={{
                display: 'flex',
                flexDirection: 'column',
                width: "100%",
                alignItems: "center",
                position: "relative",
            }}>
                <Box component="div" sx={{ width: "100%", position: "relative" }}>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none" },
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: "100px",
                            borderTopRightRadius: "50%",
                            borderBottomRightRadius: "50%",
                            background: "linear-gradient(to right, rgba(255,255,255,0.9) 0%, transparent 100%)",
                            zIndex: 3,
                            backdropFilter: "blur(1px)",
                            WebkitBackdropFilter: "blur(1px)",
                            pointerEvents: "none",
                        }}
                    />
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none" },
                            position: "absolute",
                            top: 0,
                            right: 0,
                            height: "100%",
                            width: "100px",
                            borderTopLeftRadius: "50%",
                            borderBottomLeftRadius: "50%",
                            background: "linear-gradient(to left, rgba(255,255,255,0.9) 0%, transparent 100%)",
                            zIndex: 3,
                            backdropFilter: "blur(1px)",
                            WebkitBackdropFilter: "blur(1px)",
                            pointerEvents: "none",
                        }}
                    />
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
                                pl: { xs: 0, sm: 0, md: 10 },
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                           {dummyCatalog.map((item) => (
                                <ProductTile key={item.id} item={item} />
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
                            zIndex: 5,
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
                <Button
                    endIcon={<Icon component={MdArrowRightAlt} />}
                    sx={{
                        color: colors.textColor_9,
                        fontFamily: "openSans-regular",
                        backgroundColor: colors.greenDark_1,
                        textTransform: "none",
                        fontSize: { xs: "14px", sm: "16px" },
                        mt: isMobile ? 7 : 3,
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
        </Box>
    )
}

export default FeaturedProduct
