import { Box, Button, Divider, Icon, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { colors } from '../../../services';
import ReactImageMagnify from 'react-image-magnify';
import ShareIcon from '@mui/icons-material/Share';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { PackageTabs } from '../../../components/client';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePackage } from '../../../store/slices/packageSlice';
import { addToCart, removeFromCart } from '../../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const ClientPackageDetail = () => {
    const { id } = useParams();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('details');


    useEffect(() => {
        const fetchProduct = async () => {
            await dispatch(getSinglePackage(id));
        };
        fetchProduct();
    }, [dispatch, id]);

    const { isPackageLoading, selectedPackage } = useSelector((state) => state.packages);

    const cartItems = useSelector((state) => state.cart.cartItems);

    const isInCart = useMemo(() => {
        return cartItems.some(i => i.id === selectedPackage?._id);
    }, [cartItems, selectedPackage?._id]);

    const handleCartAction = useCallback((e) => {
        e.stopPropagation(); // prevent navigation
        if (isInCart) {
            dispatch(removeFromCart(selectedPackage?._id));
        } else {
            dispatch(addToCart({
                id: selectedPackage?._id,
                name: selectedPackage?.packageName,
                price: selectedPackage?.packageSalePrice ? selectedPackage?.packageSalePrice : selectedPackage?.packageRegularPrice,
                image: selectedPackage?.packageImage?.id,
                description: selectedPackage?.packageDescription,
                rating: 0,
                quantity: 1, // initial quantity
            }));
        }
    }, [
        dispatch,
        isInCart,
        selectedPackage?._id,
        selectedPackage?.packageName,
        selectedPackage?.packageSalePrice,
        selectedPackage?.packageRegularPrice,
        selectedPackage?.packageImage?.id,
        selectedPackage?.packageDescription,
    ]);

    const handleIncrement = useCallback(() => {
        setQuantity(q => q + 1);
    }, []);
    const handleDecrement = useCallback(() => {
        setQuantity(q => (q > 1 ? q - 1 : 1));
    }, []);

    const handleShare = useCallback(async () => {
        const shareUrl = window.location.href;
        const shareTitle = selectedPackage?.packageName || "Package Details";
        const shareText = `Check out this package: ${shareTitle}`;

        const shareData = { title: shareTitle, text: shareText, url: shareUrl };

        try {
            if (navigator.share && window.isSecureContext) {
                await navigator.share(shareData);
                toast.success("Shared successfully!");
                return;
            }

            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Link copied to clipboard!");
                return;
            }

            const tempInput = document.createElement("input");
            tempInput.value = shareUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);

            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error(err);
            toast.error("Unable to share.");
        }
    }, [selectedPackage?.packageName]);

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
                                    src: `https://www.googleapis.com/drive/v3/files/${selectedPackage?.packageImage?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                                    // sizes: '100vw',
                                },
                                largeImage: {
                                    src: `https://www.googleapis.com/drive/v3/files/${selectedPackage?.packageImage?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
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
                                {selectedPackage?.packageName || 'Dummy Package Name'}
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
                                Rs.{selectedPackage?.packageSalePrice.toFixed(2) || '0.00'}
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
                                Rs.{selectedPackage?.packageRegularPrice.toFixed(2) || '0.00'}
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

                    {/* For ads of GoogleAdsense */}

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
            <PackageTabs
                selectedTab={selectedTab}
                productId={id}
                setSelectedTab={setSelectedTab}
                packageSections={selectedPackage}
            />
        </Box>
    )
}

export default ClientPackageDetail
