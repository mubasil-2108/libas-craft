import { Avatar, Box, Button, Chip, Divider, Icon, IconButton, LinearProgress, linearProgressClasses, List, ListItem, ListItemIcon, ListItemText, Rating, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { colors, images, productSections, ratings, reviews, stringAvatar } from '../../../services'
import ReactImageMagnify from 'react-image-magnify'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ShareIcon from '@mui/icons-material/Share';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import { BorderLinearProgress } from '../../../components/client/progress-bar'
import { ProductTabs } from '../../../components/client'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../../store/slices/productSlice'
import { fetchReviewsByProduct } from '../../../store/slices/reviewsSlice'
import { addToCart, removeFromCart } from '../../../store/slices/cartSlice'

const ClientProductDetail = () => {

    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [visibleReviews, setVisibleReviews] = useState(3);
    useEffect(() => {
        const fetchProduct = async () => {
            await dispatch(getProductById(id)).then(async () => {
                await dispatch(fetchReviewsByProduct(id));
            })
        };
        fetchProduct();
    }, [dispatch, id]);
    useEffect(() => {
        const fetchProductReviews = async () => {
            await dispatch(fetchReviewsByProduct(id));
        };
        fetchProductReviews();
    }, [dispatch, id]);
    const { isLoading, selectedProduct } = useSelector((state) => state.product);
    const { productReviews } = useSelector((state) => state.reviews);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const isInCart = cartItems.some(i => i.id === selectedProduct?._id);




    const averageRating = productReviews?.length
        ? productReviews?.reduce((sum, r) => sum + r.rating, 0) / productReviews?.length
        : 0;
    // Count positive ratings (3, 4, 5 stars)
    const positiveRatingsCount = productReviews?.filter(r => r.rating >= 3).length || 0;

    // Total reviews
    const totalReviews = productReviews?.length || 0;

    // Percentage of positive ratings
    const positiveRatingPercentage = totalReviews > 0
        ? (positiveRatingsCount / totalReviews) * 100
        : 0;
    const [currentImage, setCurrentImage] = useState(0)
    const thumbnailsRef = useRef(null); // ✅ ref for the thumbnails container

    const [isFavorite, setIsFavorite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likes, setLikes] = useState(199);
    const [selectedTab, setSelectedTab] = useState('details');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleLoadMore = () => {
        setVisibleReviews((prev) => prev + 3); // load 3 more reviews each time
    };

    const handleCartAction = (e) => {
        e.stopPropagation(); // prevent navigation
        if (isInCart) {
            dispatch(removeFromCart(selectedProduct?._id));
        } else {
            dispatch(addToCart({
                id: selectedProduct?._id,
                name: selectedProduct?.productName,
                price: selectedProduct?.salePrice ? selectedProduct?.salePrice : selectedProduct?.regularPrice,
                image: selectedProduct?.productPhoto[0]?.id,
                description: selectedProduct?.productDescription,
                rating: averageRating,
                quantity: 1, // initial quantity
            }));
        }
    };

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    // 📤 Share handler
    const handleShare = async () => {
        const shareData = {
            title: 'Embrace Sideboard',
            text: 'Check out this beautiful product!',
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.clipboard) {
                // fallback: copy link to clipboard
                await navigator.clipboard.writeText(shareData.url);
                alert('🔗 Link copied to clipboard!');
            } else {
                // fallback: show manual message
                alert('Sharing not supported on this browser.');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    // ❤️ Favorite toggle
    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        setLikes(prev => (isFavorite ? prev - 1 : prev + 1));
    };

    // 🔖 Bookmark toggle
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handlePrev = () => {
        if (currentImage > 0) {
            const newIndex = currentImage - 1;
            setCurrentImage(newIndex);
            scrollToThumbnail(newIndex);
        }
    };

    const handleNext = () => {
        if (currentImage < images.length - 1) {
            const newIndex = currentImage + 1;
            setCurrentImage(newIndex);
            scrollToThumbnail(newIndex);
        }
    };

    // ✅ Automatically scrolls the thumbnail into view
    const scrollToThumbnail = (index) => {
        const container = thumbnailsRef.current;
        const thumbnail = container.children[index];
        if (thumbnail) {
            container.scrollTo({
                left: thumbnail.offsetLeft - container.clientWidth / 2 + thumbnail.clientWidth / 2,
                behavior: 'smooth',
            });
        }
    };
    // Images from selectedProduct
    const allImages = useMemo(() => [
        ...(selectedProduct?.productPhoto || []),
    ], [selectedProduct?.productPhoto])


    return (
        <Box component='div' sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.white,
            px: { xs: 2, sm: 4, md: 10 },
            py: { xs: 2, sm: 4, md: 6 },
            // alignItems: 'center',
        }}>
            <Box component='div' sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(2, 1fr)",
                },
                // alignItems: 'center',

                gap: { xs: 2, sm: 3, md: 4, lg: 5 },
                // flexDirection: 'row',
            }}>
                {/* Image Section */}

                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    <Box
                        component="div"
                        sx={{
                            width: { xs: '300px', sm: '400px', md: '500px' },
                            height: { xs: 300, sm: 400, md: 500 },
                            borderRadius: "15px",
                            overflow: "hidden",
                            flexShrink: 0,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            position: "relative",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', // ✅ centers horizontally & vertically
                        }}
                    >
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Smart Watch',
                                    width: 500, // fixed width
                                    height: 500, // fixed height
                                    // src: images[currentImage],
                                    src: `https://www.googleapis.com/drive/v3/files/${allImages[currentImage]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                                    // sizes: '100vw',
                                },
                                largeImage: {
                                    src: `https://www.googleapis.com/drive/v3/files/${allImages[currentImage]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
                                    width: 1200,
                                    height: 1200,
                                },
                                lensStyle: { backgroundColor: 'rgba(0,0,0,.2)' },
                                enlargedImageContainerDimensions: {
                                    width: '200%', // how large the zoom view is
                                    height: '100%',
                                },
                                enlargedImagePosition: 'over', // or 'beside'
                                imageStyle: {
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                },
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                            }}
                        />
                    </Box>

                    <Box
                        component='div'
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            mt: 2,
                            position: 'relative',
                            maxWidth: { xs: '350px', sm: '400px', md: '500px' },
                        }}
                    >
                        {/* Left Arrow */}
                        <IconButton
                            onClick={handlePrev}
                            disabled={currentImage === 0}
                            sx={{
                                backgroundColor: colors.white,
                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                '&:hover': { backgroundColor: colors.buttonColor_1, color: colors.white },
                                opacity: currentImage === 0 ? 0.4 : 1,
                                width: 36,
                                height: 36,
                            }}
                        >
                            <ArrowBackIosNewIcon fontSize="small" />
                        </IconButton>

                        {/* Thumbnail Images */}
                        <Box
                            ref={thumbnailsRef}
                            sx={{
                                display: 'flex',
                                gap: 1,
                                overflowX: 'auto',
                                scrollBehavior: 'smooth',
                                scrollbarWidth: 'none', // Firefox
                                '&::-webkit-scrollbar': { display: 'none' },
                            }}>
                            {allImages.map((img, index) => (
                                <Box
                                    key={index}
                                    component="div"
                                    onClick={() => {
                                        setCurrentImage(index);
                                        scrollToThumbnail(index);
                                    }}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        border: currentImage === index ? `2px solid ${colors.borderColor_7}` : "2px solid transparent",
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                    }}
                                >
                                    <Box
                                        component='img'
                                        src={`https://www.googleapis.com/drive/v3/files/${img?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                                        alt={`Thumbnail ${index}`}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>

                        {/* Right Arrow */}
                        <IconButton
                            onClick={handleNext}
                            disabled={currentImage === images.length - 1}
                            sx={{
                                backgroundColor: colors.white,
                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                '&:hover': { backgroundColor: colors.buttonColor_1, color: colors.white },
                                opacity: currentImage === images.length - 1 ? 0.4 : 1,
                                width: 36,
                                height: 36,
                            }}
                        >
                            <ArrowForwardIosIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                {/* Detail Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: { xs: 2, sm: 3, md: 0 },
                        gap: 2,
                    }}
                >
                    {/* Header Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: isMobile ? 'flex-start' : 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                        }}
                    >
                        {/* Product Title */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                sx={{
                                    fontFamily: 'inter-semibold',
                                    color: colors.textColor_4,
                                    fontSize: { xs: '22px', sm: '26px', md: '28px' },
                                }}
                            >
                                {selectedProduct?.productName || 'Dummy Product Name'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'inter-regular',
                                    color: colors.textColor_11,
                                    fontSize: { xs: '14px', md: '16px' },
                                }}
                            >
                                {selectedProduct?.category || 'Category Name'} | <b>SKU: {selectedProduct?.sku || 'XXXXXX'}</b>
                            </Typography>
                        </Box>

                        {/* Action Buttons */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: isMobile ? 'flex-start' : 'flex-end',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            <IconButton
                                size="medium"
                                onClick={handleFavorite}
                                sx={{
                                    borderRadius: '15px',
                                    px: 2,
                                    gap: 1,
                                    backgroundColor: colors.iconBgColor_7,
                                }}
                            >
                                <Icon
                                    fontSize="small"
                                    component={
                                        isFavorite ? FavoriteOutlinedIcon : FavoriteBorderOutlinedIcon
                                    }
                                    sx={{ color: colors.iconColor_17 }}
                                />
                                <Typography
                                    component="p"
                                    sx={{
                                        fontFamily: 'inter-semibold',
                                        fontSize: '14px',
                                        color: colors.textColor_12,
                                    }}
                                >
                                    {likes}
                                </Typography>
                            </IconButton>

                            <IconButton
                                size="medium"
                                onClick={handleBookmark}
                                sx={{ backgroundColor: colors.iconBgColor_8 }}
                            >
                                <Icon
                                    fontSize="small"
                                    component={
                                        isBookmarked
                                            ? BookmarkOutlinedIcon
                                            : BookmarkBorderOutlinedIcon
                                    }
                                    sx={{ color: colors.iconColor_12 }}
                                />
                            </IconButton>

                            <IconButton
                                size="medium"
                                onClick={handleShare}
                                sx={{ backgroundColor: colors.iconBgColor_8 }}
                            >
                                <Icon
                                    fontSize="small"
                                    component={ShareIcon}
                                    sx={{ color: colors.iconColor_12 }}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Price Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: isMobile ? 'flex-start' : 'center',
                            gap: isMobile ? 2 : 8,
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                sx={{
                                    fontFamily: 'inter-bold',
                                    color: colors.textColor_10,
                                    fontSize: { xs: '26px', md: '34px' },
                                }}
                            >
                                Rs.{selectedProduct?.salePrice.toFixed(2) || '0.00'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'inter-regular',
                                    opacity: 0.5,
                                    color: colors.textColor_4,
                                    fontSize: { xs: '16px', md: '21px' },
                                    textDecoration: 'line-through',
                                }}
                            >
                                Rs.{selectedProduct?.regularPrice.toFixed(2) || '0.00'}
                            </Typography>
                        </Box>

                        {/* Rating & Reviews */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        borderRadius: '20px',
                                        px: 2,
                                        py: 1,
                                        gap: 0.5,
                                        backgroundColor: colors.iconBgColor_9,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        fontSize="small"
                                        component={StarOutlineIcon}
                                        sx={{ color: colors.iconColor_18 }}
                                    />
                                    <Typography
                                        component="p"
                                        sx={{
                                            fontFamily: 'inter-semibold',
                                            fontSize: '14px',
                                            color: colors.textColor_13,
                                        }}
                                    >
                                        {averageRating.toFixed(1) || '0.0'}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        borderRadius: '20px',
                                        px: 2,
                                        py: 1,
                                        gap: 1,
                                        backgroundColor: colors.iconBgColor_8,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        fontSize="small"
                                        component={SmsOutlinedIcon}
                                        sx={{ color: colors.iconColor_12 }}
                                    />
                                    <Typography
                                        component="p"
                                        sx={{
                                            fontFamily: 'inter-semibold',
                                            fontSize: '14px',
                                            color: colors.textColor_10,
                                        }}
                                    >
                                        {productReviews?.length} Reviews
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography
                                sx={{
                                    fontFamily: 'inter-semibold',
                                    fontSize: '14px',
                                    color: colors.textColor_10,
                                }}
                            >
                                {positiveRatingPercentage}%{' '}
                                <Typography
                                    component="span"
                                    sx={{
                                        fontFamily: 'inter-regular',
                                        fontSize: '14px',
                                        color: colors.textColor_11,
                                    }}
                                >
                                    of buyers have recommended this.
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Color Selection */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography
                            sx={{
                                fontFamily: 'inter-medium',
                                fontSize: '16px',
                                color: colors.textColor_11,
                            }}
                        >
                            Choose a Color
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                maxWidth: { xs: '100%', md: '600px' },
                            }}
                        >
                            {[
                                { name: 'Black', code: '#000000' },
                                { name: 'White', code: '#ffffff' },
                                { name: 'Brown', code: '#8B4513' },
                                { name: 'Gray', code: '#808080' },
                                { name: 'Blue', code: '#1E90FF' },
                            ].map((colorItem, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setSelectedColor(colorItem.code)}
                                    sx={{
                                        width: { xs: 50, sm: 60 },
                                        height: { xs: 50, sm: 60 },
                                        borderRadius: '50%',
                                        border:
                                            selectedColor === colorItem.code
                                                ? `5px solid ${colorItem.code === '#ffffff'
                                                    ? colors.grayDark_4
                                                    : colorItem.code
                                                }`
                                                : '5px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        '&:hover': { transform: 'scale(1.05)' },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 40, sm: 50 },
                                            height: { xs: 40, sm: 50 },
                                            borderRadius: '50%',
                                            backgroundColor: colorItem.code,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                        }}
                                    >
                                        {selectedColor === colorItem.code && (
                                            <Icon

                                                fontSize={isMobile ? 'small' : isTablet ? 'medium' : 'large'}
                                                component={DoneOutlinedIcon}
                                                sx={{
                                                    color:
                                                        colorItem.code === '#ffffff'
                                                            ? colors.grayDark_4
                                                            : colors.iconColor_9,
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Size Selection */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography
                            sx={{
                                fontFamily: 'inter-medium',
                                fontSize: '16px',
                                color: colors.textColor_11,
                            }}
                        >
                            Choose a Size
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                maxWidth: { xs: '100%', md: '600px' },
                            }}
                        >
                            {selectedProduct?.sizes.map((size) => (
                                <Chip
                                    key={size}
                                    label={size}
                                    icon={
                                        <Icon
                                            fontSize="small"
                                            component={
                                                selectedSize === size
                                                    ? IoIosRadioButtonOn
                                                    : IoIosRadioButtonOff
                                            }
                                            sx={{
                                                color:
                                                    selectedSize === size
                                                        ? `${colors.iconColor_12} !important`
                                                        : colors.iconColor_19,
                                            }}
                                        />
                                    }
                                    onClick={() => setSelectedSize(size)}
                                    sx={{
                                        backgroundColor:
                                            selectedSize === size
                                                ? colors.iconBgColor_8
                                                : colors.grayLight_4,
                                        color:
                                            selectedSize === size
                                                ? colors.textColor_10
                                                : colors.textColor_14,
                                        fontFamily: 'inter-medium',
                                        fontSize: '14px',
                                        px: 1,
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: colors.iconBgColor_8,
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Quantity & Add to Cart */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        {/* Quantity Control */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxWidth: { xs: '150px', md: '120px' },
                                mx: { xs: 'auto', md: 0 },
                                p: '8px',
                                backgroundColor: colors.grayLight_10,
                                borderRadius: '30px',
                            }}
                        >
                            <IconButton
                                size="small"
                                sx={{ color: colors.iconColor_12 }}
                                onClick={handleDecrement}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <TextField
                                variant="standard"
                                inputProps={{
                                    min: 1,
                                    style: {
                                        textAlign: 'center',
                                        fontFamily: 'roboto-regular',
                                        fontSize: '18px',
                                        width: '40px',
                                    },
                                }}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Math.max(0, parseInt(e.target.value) || 0))
                                }
                                sx={{
                                    '& .MuiInputBase-root:before': { borderBottom: 'none' },
                                    '& .MuiInputBase-root:after': { borderBottom: 'none' },
                                }}
                            />
                            <IconButton
                                size="small"
                                sx={{ color: colors.iconColor_12 }}
                                onClick={handleIncrement}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Add to Cart Button */}
                        <Button
                            variant="contained"
                            onClick={handleCartAction}
                            startIcon={<Icon component={ShoppingBagOutlinedIcon} />}
                            sx={{
                                color: colors.textColor_5,
                                backgroundColor: colors.greenDark_1,
                                width: { xs: '100%', sm: '300px' },
                                height: '50px',
                                borderRadius: '50px',
                                fontSize: '16px',
                                textTransform: 'none',
                                fontFamily: 'inter-semibold',
                                '&:hover': {
                                    backgroundColor: colors.greenDark_2,
                                },
                            }}
                        >
                            {isInCart ? "Remove from Cart" : "Add to Cart"}
                        </Button>
                    </Box>

                    {/* Delivery Info */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 3,
                            px: { xs: 1, md: 2 },
                            py: 1,
                            borderRadius: '10px',
                            border: `1px solid ${colors.borderColor_8}`,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'flex-start',

                            }}
                        >
                            <Icon sx={{ color: colors.iconColor_20 }} component={LocalShippingOutlinedIcon} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', }}>
                                <Typography
                                    sx={{
                                        color: colors.textColor_10,
                                        fontFamily: 'inter-bold',
                                        fontSize: '17px',
                                    }}
                                >
                                    Free Delivery
                                </Typography>
                                <Typography
                                    sx={{
                                        color: colors.textColor_14,
                                        fontFamily: 'inter-regular',
                                        fontSize: '14px',
                                    }}
                                >
                                    Enter your Postal code for Delivery Availability
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Icon sx={{ color: colors.iconColor_20 }} component={ShoppingBagOutlinedIcon} />
                            <Box>
                                <Typography
                                    sx={{
                                        color: colors.textColor_10,
                                        fontFamily: 'inter-bold',
                                        fontSize: '17px',
                                    }}
                                >
                                    Return Delivery
                                </Typography>
                                <Typography
                                    sx={{
                                        color: colors.textColor_14,
                                        fontFamily: 'inter-regular',
                                        fontSize: '14px',
                                    }}
                                >
                                    Free 30 days Delivery Return. Details
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Product Detail, Reviews, Ingredients */}
            <ProductTabs
                selectedTab={selectedTab}
                productId={id}
                setSelectedTab={setSelectedTab}
                reviews={productReviews}
                productSections={selectedProduct}
                averageRating={averageRating}
                visibleReviews={visibleReviews}
                handleLoadMore={handleLoadMore}
            />
        </Box>
    )
}

export default ClientProductDetail
