import { Box } from '@mui/system';
import React, { useEffect, useMemo } from 'react';
import { colors } from '../../../services';
import { Button, Icon, Rating, Typography } from '@mui/material';
import { IoIosArrowRoundForward } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByProduct } from '../../../store/slices/reviewsSlice';
import { useNavigate } from 'react-router-dom';

const SpecialPackageTile = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviewsByProduct[item?._id] || []);
    useEffect(() => {
        const fetchReview = async () => {
            await dispatch(fetchReviewsByProduct(item?._id));
        }
        fetchReview();
    }, [dispatch, item])
    const productPrice = useMemo(() => {
        return item?.salePrice ? item?.salePrice : item?.regularPrice;
    }, [item]);

    const averageRating = useMemo(() => {
        if (!reviews?.length) return 0;
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    }, [reviews]);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { md: 'row' },
                // gap: { xs: 2, md: 2 },
                gap: 2,
                justifyContent: { xs: 'center', md: 'space-between' },
                alignItems: { xs: 'flex-start', md: 'center' },
            }}
        >
            {/* --- Image Box --- */}
            <Box
                component="div"
                sx={{
                    width: '220px',
                    height: { xs: 200, sm: 250, md: 160 },
                    borderRadius: "15px",
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src={`https://www.googleapis.com/drive/v3/files/${item?.productPhoto?.[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                    alt={item.title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>

            {/* --- Content Box --- */}
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 1,
                    width: { xs: '200px', md: '400px' },
                    textAlign: { xs: 'left', md: 'left' },
                }}
            >
                {/* Title & Price */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                    }}
                >
                    <Typography
                        sx={{
                            color: colors.textColor_7,
                            fontFamily: 'playfairDisplay',
                            fontSize: { xs: '15px', sm: '16px', md: '17px' },
                        }}
                    >
                        {item?.productName}
                    </Typography>
                    <Typography
                        sx={{
                            color: colors.textColor_4,
                            fontSize: { xs: '18px', sm: '20px', md: '22px' },
                            fontFamily: 'openSans-bold',
                        }}
                    >
                        Rs. {productPrice.toFixed(2)}
                    </Typography>
                </Box>

                {/* Rating */}
                <Rating
                    size="small"
                    name="read-only"
                    value={averageRating.toFixed(1)}
                    precision={0.5}
                    readOnly
                    sx={{
                        color: colors.iconColor_16,
                    }}
                />

                {/* Description */}
                <Typography
                    sx={{
                        color: colors.textColor_7,
                        fontSize: { xs: '13px', sm: '14px' },
                        fontFamily: 'openSans-regular',
                        lineHeight: 1.5,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 3, sm: 4 },
                        WebkitBoxOrient: 'vertical',
                        width: { xs: '100%', sm: '90%', md: '350px' },
                    }}
                >
                    {item?.productDescription.slice(0, 80)}...
                </Typography>

                {/* See Details Button */}
                <Button
                    endIcon={
                        <Icon
                            sx={{ color: colors.textColor_7, fontSize: '20px' }}
                            component={IoIosArrowRoundForward}
                        />
                    }
                    onClick={()=> navigate(`/package/product/${item?._id}`)}
                    sx={{
                        textTransform: 'none',
                        width: 'fit-content',
                        m: 0,
                        p: 0,
                        mt: 0.5,
                        '&:hover': { background: 'transparent' },
                    }}
                >
                    <Typography
                        sx={{
                            color: colors.textColor_7,
                            fontSize: { xs: '12px', sm: '13px' },
                            fontFamily: 'openSans-regular',
                            cursor: 'pointer',
                        }}
                    >
                        See Details
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default SpecialPackageTile;
