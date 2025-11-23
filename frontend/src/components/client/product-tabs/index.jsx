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
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import { useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { createReview, resetReviewsState } from "../../../store/slices/reviewsSlice";
import toast from "react-hot-toast";

const initialState = {
    title: "",
    comment: "",
    rating: 0,
    images: [],
};

const ProductTabs = ({
    selectedTab,
    setSelectedTab,
    reviews,
    productId,
    productSections,
    averageRating,
    ratings,
}) => {
    const theme = useTheme();
    const thumbRef = useRef(null);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.reviews);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [formData, setFormData] = useState(initialState);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageUpload = useCallback((e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
                size: file.size,
                type: file.type,
            }));
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }));
            setCurrentIndex(0);
        }
    }, []);

    const handleCreateReview = useCallback(async () => {
        console.log("Submitting review with data:", formData);
        const form = new FormData();
        form.append('user', '64a7f0c2e4b0f5a3c8d6e1b2'); // Example user ID
        form.append('product', productId); // Example product ID
        form.append('title', formData.title);
        form.append('comment', formData.comment);
        form.append('rating', formData.rating);
        formData.images.forEach((img) => {
            form.append('images', img.file);
        });

        await dispatch(createReview(form)).then((data) => {
            if (data?.type !== 'product/add-new-product/rejected') {
                setFormData(initialState);
                setCurrentIndex(0);
                dispatch(resetReviewsState());
            } else {
                toast.error(data?.payload || 'Failed to add product');
            }
        }).catch((error) => {
            toast.error(error?.message || 'Failed to add product');
        });
    }, [dispatch, formData, productId]);

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
                                    alignItems: { xs: "flex-start", md: "flex-start" },
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
                                    {/* Images/ Screenshots */}
                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "10px",
                                                overflow: "hidden",
                                            }}>
                                            <Box
                                                component='img'
                                                src={'/watch.jpg'}
                                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </Box>
                                    </Box>
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
                            <Rating name="half-rating" size="medium" precision={1}
                                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} />

                            {/* Responsive TextFields */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Review Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                            {/* Upload Screenshots */}

                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <Typography component='p' sx={{
                                    ontFamily: "inter-regular",
                                    fontSize: { xs: "12px", sm: "14px" },
                                    color: colors.textColor_14,
                                }}>Note:Max 5 images</Typography> {/*Max 5 images. Each image should be less than 2MB.*/}
                                {/* Scrollable Thumbnails */}
                                <Box
                                    ref={thumbRef}
                                    sx={{
                                        display: 'flex',
                                        gap: { xs: 0.5, sm: 1 },
                                        mt: 1,
                                        overflowX: { xs: 'auto', sm: 'hidden' },
                                        scrollBehavior: 'smooth',
                                        p: 0.5,
                                        flexWrap: { xs: 'wrap', sm: 'nowrap' }, // wrap on small screens
                                    }}
                                >
                                    {formData.images.map((img, index) => (
                                        <Box
                                            key={index}
                                            component='img'
                                            src={img.preview}
                                            alt={`Thumbnail ${index}`}
                                            onClick={() => setCurrentIndex(index)}
                                            sx={{
                                                width: { xs: '48px', sm: '60px' },
                                                height: { xs: '48px', sm: '60px' },
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                border:
                                                    currentIndex === index
                                                        ? `2px solid ${colors.borderColor_2}`
                                                        : `2px solid ${colors.transparent}`,
                                                transition: '0.2s',
                                            }}
                                        />
                                    ))}

                                    {/* Add More Button */}
                                    {formData.images.length < 5 &&
                                        <Box
                                            component='label'
                                            htmlFor='upload-more'
                                            sx={{
                                                cursor: 'pointer',
                                                width: { xs: '48px', sm: '60px' },
                                                height: { xs: '48px', sm: '60px' },
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                border: `2px dashed ${colors.primary}`,
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <PhotoOutlinedIcon sx={{ fontSize: { xs: 22, sm: 30 }, color: colors.iconColor_5 }} />
                                            <input
                                                id='upload-more'
                                                type='file'
                                                multiple
                                                accept='image/*'
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </Box>
                                    }
                                </Box>

                                {/* Arrows (only on larger screens & if scrollable) */}
                                {formData.images.length > 5 && (
                                    <>
                                        <ArrowBackIosNewIcon
                                            onClick={() =>
                                                thumbRef.current.scrollBy({ left: -100, behavior: 'smooth' })
                                            }
                                            sx={{
                                                display: { xs: 'none', sm: 'block' },
                                                position: 'absolute',
                                                left: -10,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                color: colors.iconColor_5,
                                                fontSize: 28,
                                                bgcolor: colors.iconBgColor_2,
                                                borderRadius: '50%',
                                                p: 0.5,
                                                boxShadow: `0px 2px 4px ${colors.blackLight_20}`,
                                            }}
                                        />

                                        <ArrowForwardIosIcon
                                            onClick={() =>
                                                thumbRef.current.scrollBy({ left: 100, behavior: 'smooth' })
                                            }
                                            sx={{
                                                display: { xs: 'none', sm: 'block' },
                                                position: 'absolute',
                                                right: -10,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                color: colors.iconColor_5,
                                                fontSize: 28,
                                                bgcolor: colors.iconBgColor_2,
                                                borderRadius: '50%',
                                                p: 0.5,
                                                boxShadow: `0px 2px 4px ${colors.blackLight_20}`,
                                            }}
                                        />
                                    </>
                                )}
                            </Box>

                            <TextField
                                fullWidth
                                variant="outlined"
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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
                                onClick={handleCreateReview}
                                disabled={isLoading}
                                loading={isLoading}
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
