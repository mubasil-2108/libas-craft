import React from "react";
import {
    Avatar,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Rating,
    Tab,
    Tabs,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    linearProgressClasses,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { colors, stringAvatar } from "../../../services";
import { BorderLinearProgress } from "../progress-bar";

const ProductTabs = ({
    selectedTab,
    setSelectedTab,
    reviews,
    productSections,
    averageRating,
    ratings,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box
            sx={{
                mt: 5,
                backgroundColor: colors.white,
                borderRadius: "15px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                px: { xs: 2, sm: 4, md: 6 },
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
                        fontSize: { xs: "14px", sm: "15px", md: "16px" },
                        color: colors.textColor_14,
                        mr: { xs: 2, sm: 3, md: 4 },
                    },
                    "& .Mui-selected": { color: colors.textColor_10 },
                }}
            >
                <Tab label="Product Details" value="details" />
                <Tab label={`Reviews (${reviews.length})`} value="reviews" />
                <Tab label="Ingredients" value="ingredients" />
            </Tabs>

            <Divider sx={{ my: 2 }} />

            {/* DETAILS TAB */}
            {selectedTab === "details" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {productSections.map((section, index) => (
                        <Box key={index}>
                            {section.title && (
                                <Typography
                                    sx={{
                                        fontFamily: "inter-bold",
                                        fontSize: { xs: "18px", sm: "20px", md: "24px" },
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
                                        fontSize: { xs: "14px", sm: "15px", md: "16px" },
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
                                                    sx={{
                                                        fontSize: 18,
                                                        color: colors.greenDark_3,
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "inter-regular",
                                                            fontSize: {
                                                                xs: "14px",
                                                                sm: "15px",
                                                            },
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

            {/* REVIEWS TAB */}
            {selectedTab === "reviews" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography
                        sx={{
                            fontFamily: "inter-bold",
                            fontSize: { xs: "20px", md: "24px" },
                            color: colors.textColor_10,
                        }}
                    >
                        Customers Feedback
                    </Typography>

                    {/* Rating Summary */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2,
                        }}
                    >
                        {/* Average Rating */}
                        <Box
                            sx={{
                                flex: "1",
                                borderRadius: "15px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1,
                                display: "flex",
                                flexDirection: "column",
                                py: 3,
                                background: colors.grayLight_11,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "inter-bold",
                                    fontSize: { xs: "45px", sm: "55px", md: "60px" },
                                    color: colors.textColor_10,
                                    lineHeight: 1,
                                }}
                            >
                                {averageRating.toFixed(1)}
                            </Typography>
                            <Rating
                                name="half-rating-read"
                                defaultValue={averageRating}
                                precision={0.5}
                                readOnly
                            />
                            <Typography
                                sx={{
                                    fontFamily: "inter-regular",
                                    fontSize: { xs: "14px", sm: "16px" },
                                    color: colors.textColor_11,
                                }}
                            >
                                Product Rating
                            </Typography>
                        </Box>

                        {/* Ratings Breakdown */}
                        <Box
                            sx={{
                                flex: "2",
                                borderRadius: "15px",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1,
                                px: 2,
                                py: 3,
                                background: colors.grayLight_11,
                            }}
                        >
                            {ratings.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        gap: 1,
                                    }}
                                >
                                    <Box sx={{ flexGrow: 1 }}>
                                        <BorderLinearProgress
                                            sx={{
                                                height: 7,
                                                [`& .${linearProgressClasses.bar}`]: {
                                                    borderRadius: 5,
                                                    backgroundColor: colors.greenDark_3,
                                                },
                                            }}
                                            variant="determinate"
                                            value={item.value}
                                        />
                                    </Box>
                                    <Rating
                                        name="half-rating-read"
                                        size="small"
                                        defaultValue={item.stars}
                                        precision={1}
                                        readOnly
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: "inter-regular",
                                            fontSize: { xs: "13px", sm: "15px" },
                                            color: colors.textColor_11,
                                        }}
                                    >
                                        {item.value}%
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Individual Reviews */}
                    <Typography
                        sx={{
                            fontFamily: "inter-semibold",
                            fontSize: { xs: "18px", md: "24px" },
                            color: colors.textColor_10,
                            mt: 2,
                        }}
                    >
                        Reviews
                    </Typography>

                    {reviews.slice(0, 3).map((item) => (
                        <Box key={item.id}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 2,
                                    alignItems: { xs: "flex-start", sm: "center" },
                                    p: 2,
                                }}
                            >
                                <Avatar
                                    {...stringAvatar(item.name)}
                                    sx={{
                                        ...stringAvatar(item.name).sx,
                                        width: 50,
                                        height: 50,
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        maxWidth: { xs: "100%", md: "700px" },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "inter-medium",
                                            fontSize: { xs: "15px", sm: "17px" },
                                            color: colors.textColor_4,
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Rating
                                        name="half-rating-read"
                                        size="small"
                                        defaultValue={item.rating}
                                        precision={0.5}
                                        readOnly
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: "inter-regular",
                                            fontSize: { xs: "14px", sm: "15px" },
                                            color: colors.textColor_11,
                                        }}
                                    >
                                        {item.comment}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    ))}

                    {/* Write a Review Section */}
                    <Box sx={{ mt: 3 }}>
                        <Typography
                            sx={{
                                fontFamily: "inter-semibold",
                                fontSize: { xs: "18px", sm: "20px" },
                                color: colors.textColor_10,
                                mb: 2,
                            }}
                        >
                            Write a Review
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography
                                sx={{
                                    fontFamily: "inter-regular",
                                    fontSize: { xs: "14px", sm: "16px" },
                                    color: colors.textColor_14,
                                }}
                            >
                                How would you rate this product?
                            </Typography>
                            <Rating name="half-rating" size="medium" precision={1} />

                            {/* Responsive TextFields */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Review Title"
                                sx={{
                                    width: { xs: "100%", sm: "90%", md: "700px" },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        "& fieldset": { borderColor: colors.borderColor_9 },
                                        "&:hover fieldset": {
                                            borderColor: colors.borderColor_9,
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: colors.borderColor_9,
                                        },
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={6}
                                placeholder="Write your review here..."
                                sx={{
                                    width: { xs: "100%", sm: "90%", md: "700px" },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "15px",
                                        "& fieldset": { borderColor: colors.borderColor_9 },
                                        "&:hover fieldset": {
                                            borderColor: colors.borderColor_9,
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: colors.borderColor_9,
                                        },
                                    },
                                }}
                            />

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.buttonColor_1,
                                    color: colors.textColor_5,
                                    textTransform: "none",
                                    px: 3,
                                    py: 1.5,
                                    fontFamily: "inter-semibold",
                                    fontSize: { xs: "14px", sm: "16px" },
                                    borderRadius: "50px",
                                    alignSelf: { xs: "center", sm: "flex-start" },
                                    width: { xs: "100%", sm: "auto" },
                                }}
                            >
                                Submit Review
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}

            {/* INGREDIENTS TAB */}
            {selectedTab === "ingredients" && (
                <Typography
                    sx={{
                        fontFamily: "inter-regular",
                        fontSize: { xs: "14px", sm: "15px" },
                        color: colors.textColor_11,
                        lineHeight: 1.8,
                    }}
                >
                    Oak Wood, Matte Varnish Finish, Stainless Steel Handles.
                </Typography>
            )}
        </Box>
    );
};

export default ProductTabs;
