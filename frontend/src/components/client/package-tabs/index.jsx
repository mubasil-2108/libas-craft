import React, { useCallback, useMemo, useRef } from "react";
import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Scrollbars from "react-custom-scrollbars";
import { colors } from "../../../services";
import PackageProductTile from "../package-product-tile";

const PackageTabs = ({ selectedTab, setSelectedTab, packageSections }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const listRef = useRef(null);

    const productDetails = useMemo(
        () =>
            [
                packageSections?.packageDescription && {
                    title: "Package Description",
                    paragraph: packageSections?.packageDescription,
                },
                packageSections?.packageDetails?.length > 0 && {
                    title: "Package Details",
                    points: packageSections?.packageDetails,
                },
                packageSections?.packageBenefits?.length > 0 && {
                    title: "Package Benefits",
                    points: packageSections?.packageBenefits,
                },
                packageSections?.packageExtraDetails && {
                    title: "Additional Details",
                    paragraph: packageSections?.packageExtraDetails,
                },
            ].filter(Boolean),
        [packageSections]
    );

    const smoothScroll = useCallback((target, distance, duration = 400) => {
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
    }, []);

    // Scroll handlers
    const scrollLeft = useCallback(
        () => listRef.current && smoothScroll(listRef.current, -250),
        [smoothScroll]
    );
    const scrollRight = useCallback(
        () => listRef.current && smoothScroll(listRef.current, 250),
        [smoothScroll]
    );

    // Determine carousel height dynamically
    const carouselHeight = isMobile ? 350 : isTablet ? 380 : 400;
    const gapSize = isMobile ? "12px" : isTablet ? "20px" : "24px";

    return (
        <Box
            sx={{
                mt: { xs: 3, sm: 4, md: 5 },
                backgroundColor: colors.white,
                borderRadius: "15px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                px: { xs: 2, sm: 3, md: 6 },
                py: { xs: 2, sm: 3, md: 4 },
            }}
        >
            {/* Tabs Header */}
            <Tabs
                value={selectedTab}
                onChange={(e, newValue) => setSelectedTab(newValue)}
                textColor="inherit"
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
                allowScrollButtonsMobile
                TabIndicatorProps={{
                    sx: { backgroundColor: colors.greenDark_3 },
                }}
                sx={{
                    "& .MuiTab-root": {
                        textTransform: "none",
                        fontFamily: "inter-semibold",
                        fontSize: { xs: "13px", sm: "15px", md: "16px" },
                        color: colors.textColor_14,
                        mr: { xs: 1, sm: 2, md: 3 },
                    },
                    "& .Mui-selected": { color: colors.textColor_10 },
                }}
            >
                <Tab label="Product Details" value="details" />
                <Tab label="Products" value="products" />
            </Tabs>

            <Divider sx={{ my: { xs: 1, sm: 2, md: 3 } }} />

            {/* DETAILS TAB */}
            {selectedTab === "details" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: gapSize }}>
                    {productDetails.map((section, index) => (
                        <Box key={index}>
                            {section.title && (
                                <Typography
                                    sx={{
                                        fontFamily: "inter-bold",
                                        fontSize: { xs: "16px", sm: "18px", md: "22px" },
                                        color: colors.textColor_10,
                                        mb: 1,
                                    }}
                                >
                                    {section.title}
                                </Typography>
                            )}
                            {section.paragraph && (
                                <Typography
                                    sx={{
                                        fontFamily: "inter-regular",
                                        fontSize: { xs: "13px", sm: "14px", md: "16px" },
                                        color: colors.textColor_14,
                                        lineHeight: 1.7,
                                        mb: section.points ? 1 : 0,
                                    }}
                                >
                                    {section.paragraph}
                                </Typography>
                            )}
                            {section.points && section.points.length > 0 && (
                                <List sx={{ pl: 1 }}>
                                    {section.points.map((point, i) => (
                                        <ListItem key={i} disablePadding>
                                            <ListItemIcon sx={{ minWidth: 28 }}>
                                                <CheckCircleOutlinedIcon
                                                    sx={{ fontSize: 18, color: colors.greenDark_3 }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "inter-regular",
                                                            fontSize: { xs: "13px", sm: "14px", md: "15px" },
                                                            color: colors.textColor_14,
                                                        }}
                                                    >
                                                        {point}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>
                    ))}
                </Box>
            )}

            {/* PRODUCTS TAB */}
            {selectedTab === "products" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography
                        sx={{
                            fontFamily: "inter-bold",
                            fontSize: { xs: "18px", sm: "20px", md: "24px" },
                            color: colors.textColor_10,
                        }}
                    >
                        Package Products
                    </Typography>

                    <Box
                        component="div"
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
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
                                        gap: gapSize,
                                        padding: isMobile ? "10px" : "15px",
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
                                height: carouselHeight,
                                overflow: "hidden",
                            }}
                        >
                            {packageSections?.packageProducts?.map((item) => (
                                <Box
                                    key={item?._id}
                                    sx={{
                                        display: "flex",
                                        width: isMobile ? "100%" : "auto",
                                    }}
                                >
                                    <PackageProductTile item={item} />
                                </Box>
                            ))}
                        </Scrollbars>


                    </Box>
                    {/* Navigation Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: isMobile ? "center" : "flex-end",
                            gap: 1.5,
                            zIndex: 5,
                        }}
                    >
                        <IconButton
                            disabled={
                                packageSections?.packageProducts?.length <=
                                (isMobile ? 2 : isTablet ? 3 : 4)
                            }
                            onClick={scrollLeft}
                            size="small"
                            sx={{
                                backgroundColor: colors.iconBgColor_6,
                                "&:hover": { backgroundColor: colors.grayLight_1 },
                            }}
                        >
                            <ArrowBackOutlinedIcon
                                sx={{
                                    fontSize: { xs: 16, sm: 18, md: 20 },
                                    color: colors.iconColor_14,
                                }}
                            />
                        </IconButton>
                        <IconButton
                            disabled={
                                packageSections?.packageProducts?.length <=
                                (isMobile ? 2 : isTablet ? 3 : 4)
                            }
                            onClick={scrollRight}
                            size="small"
                            sx={{
                                backgroundColor: colors.iconBgColor_5,
                                "&:hover": { backgroundColor: colors.grayLight_1 },
                            }}
                        >
                            <ArrowForwardOutlinedIcon
                                sx={{
                                    fontSize: { xs: 16, sm: 18, md: 20 },
                                    color: colors.iconColor_14,
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default PackageTabs;
