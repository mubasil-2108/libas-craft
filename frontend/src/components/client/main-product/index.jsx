import {
    Box,
    Button,
    Chip,
    Icon,
    IconButton,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { colors } from "../../../services";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CartButton } from "../buttons";
import ReactImageMagnify from "react-image-magnify";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";

const MainProduct = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [selectedQuantity, setSelectedQuantity] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // ----------------- MEMOS -----------------
    const discountAmount = useMemo(
        () => (product?.regularPrice - product?.salePrice) || 0,
        [product?.regularPrice, product?.salePrice]
    );

    const isInCart = useMemo(
        () => cartItems.some((i) => i.id === product?._id),
        [cartItems, product?._id]
    );

    const imageURL = useMemo(
        () =>
            `https://www.googleapis.com/drive/v3/files/${product?.productPhoto?.[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
        [product?.productPhoto, ]
    );

    const renderedSizeChips = useMemo(
        () =>
            product?.sizes?.map((item, index) => (
                <Chip
                    key={index}
                    label={item}
                    clickable
                    onClick={() => handleSelectQuantity(index)}
                    sx={{
                        px: 2,
                        py: 1.5,
                        borderRadius: "30px",
                        fontSize: { xs: "13px", sm: "15px" },
                        fontFamily: "roboto-regular",
                        backgroundColor:
                            selectedQuantity === index
                                ? colors.greenDark_1
                                : colors.transparent,
                        color:
                            selectedQuantity === index
                                ? colors.textColor_5
                                : colors.textColor_7,
                        border: `2px solid ${colors.greenDark_1}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: `${colors.greenDark_1} !important`,
                            color: `${colors.textColor_5} !important`,
                        },
                    }}
                />
            )),
        [product?.sizes, selectedQuantity]
    );


    const handleIncrement = useCallback(
        () => setQuantity((prev) => prev + 1),
        []
    );
    const handleDecrement = useCallback(
        () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)),
        []
    );

    const handleSelectQuantity = useCallback(
        (index) => setSelectedQuantity(index),
        []
    );

    const handleCartAction = useCallback(() => {
        if (isInCart) {
            dispatch(removeFromCart(product?._id));
        } else {
            dispatch(
                addToCart({
                    id: product?._id,
                    name: product?.productName,
                    price: product?.salePrice || product?.regularPrice,
                    image: product?.productPhoto[0]?.id,
                    description: product?.productDescription,
                    quantity,
                })
            );
        }
    }, [
        isInCart,
        quantity,
        product?._id,
        product?.productName,
        product?.salePrice,
        product?.regularPrice,
        product?.productPhoto,
        product?.productDescription,
        dispatch,
    ]);
    
    return (
        <Box
            component="div"
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: { xs: 2, sm: 4, md: 10 },
                py: { xs: 4, md: 10 },
                gap: { xs: 6, md: 8 },
                backgroundColor: colors.greenLight_1,
                overflow: "hidden",
            }}
        >
            <Box
                component="img"
                src="/background-1.jpg"
                alt="Background"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.15, // light fade for better readability
                    zIndex: 0,
                    overflow: "hidden",
                }}
            />
            {/* Main Row */}

            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "center", md: "flex-start" },
                    justifyContent: "center",
                    gap: { xs: 6, sm: 8, md: 10 },
                    width: "100%",
                    maxWidth: "1300px",
                    zIndex: 1,
                }}
            >
                {/* Product Image */}
                <Box
                    component="div"
                    sx={{
                        width: { xs: '100%', sm: '80%', md: '500px' },
                        height: { xs: 300, sm: 400, md: 500 },
                        borderRadius: "20px",
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
                                    alt: product?.productName,
                                    width: 500, // fixed width
                                    height: 500, // fixed height
                                    src: imageURL,
                                },
                                largeImage: {
                                    src: `https://www.googleapis.com/drive/v3/files/${product?.productPhoto?.[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
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
                                    borderRadius: '20px',
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

                {/* Product Text Section */}
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        width: { xs: "100%", sm: "85%", md: "45%" },
                        gap: 2.5,
                    }}
                >
                    {/* Product Title */}
                    <Typography
                        sx={{
                            fontFamily: "cinzel-bold",
                            fontWeight: 700,
                            fontSize: { xs: "28px", sm: "36px", md: "48px", lg: "58px" },
                            color: colors.textColor_7,
                            textAlign: { xs: "center", md: "left" },
                            lineHeight: 1.2,
                        }}
                    >
                        {product?.productName}
                    </Typography>

                    {/* Price Row */}
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: { xs: "center", md: "flex-start" },
                            gap: 1.5,
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                color: colors.textColor_1,
                                textDecoration: "line-through",
                                fontFamily: "roboto-bold",
                                fontSize: { xs: "14px", md: "16px" },
                            }}
                        >
                            Rs.{product?.regularPrice?.toFixed(2)}
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                color: colors.textColor_4,
                                fontFamily: "roboto-bold",
                                fontSize: { xs: "16px", md: "18px" },
                            }}
                        >
                            Rs.{product?.salePrice?.toFixed(2)}
                        </Typography>
                        <Chip
                            label={`Save - Rs. ${discountAmount}`}
                            sx={{
                                borderRadius: "10px",
                                backgroundColor: colors.greenDark_1,
                                color: colors.textColor_5,
                                fontSize: "14px",
                                fontFamily: "roboto-bold",
                            }}
                        />
                    </Box>

                    {/* Quantity Chips */}
                    {
                        product && product?.sizes.length > 0 && (
                            <Box component="div" sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Typography
                                    component="p"
                                    sx={{
                                        color: colors.textColor_4,
                                        fontFamily: "roboto-regular",
                                        fontSize: { xs: "14px", md: "16px" },
                                        textAlign: { xs: "center", md: "left" },
                                    }}
                                >
                                    Quantity
                                </Typography>
                                <Box
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: { xs: "center", md: "flex-start" },
                                        gap: 1.5,
                                    }}
                                >
                                    {renderedSizeChips}
                                </Box>
                            </Box>
                        )
                    }
                    {/* Quantity Counter */}
                    <Typography
                        component="p"
                        sx={{
                            color: colors.textColor_4,
                            mt: 2,
                            fontFamily: "roboto-regular",
                            fontSize: { xs: "14px", md: "16px" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        Quantity
                    </Typography>

                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: { xs: 'center', md: 'center' },
                            maxWidth: { xs: '150px', md: '120px' },
                            mx: { xs: "auto", md: 0 },
                            p: "8px",
                            border: `2px solid ${colors.greenDark_1}`,
                            borderRadius: "30px",
                        }}
                    >
                        <IconButton size="small" onClick={handleDecrement}>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                            variant="standard"
                            inputProps={{
                                min: 1,
                                style: {
                                    textAlign: "center",
                                    fontFamily: "roboto-regular",
                                    fontSize: "18px",
                                    width: "40px",
                                },
                            }}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            sx={{
                                "& .MuiInputBase-root:before": { borderBottom: "none" },
                                "& .MuiInputBase-root:after": { borderBottom: "none" },
                            }}
                        />
                        <IconButton size="small" onClick={handleIncrement}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    {/* Buttons */}
                    <Box
                        component="div"
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            mt: 3,
                            gap: 1.5,
                            width: "100%",
                        }}
                    >
                        <CartButton
                            width={isMobile ? "280px" : isTablet ? "450px" : "580px"}
                            height="50px"
                            handleCartAction={handleCartAction}
                            isInCart={isInCart}
                            borderRadius="8px"
                            fontSize="15px"
                            textColor={colors.greenLight_1}
                            bgColor1={colors.greenDark_1}
                            bgColor2={colors.greenDark_2}
                            hoverColor1={colors.greenDark_1}
                            hoverColor2={colors.greenDark_3}
                            shadowColor={colors.teal_2}
                            successColor1={colors.greenDark_3}
                            successColor2={colors.greenDark_2}
                            progressColor={colors.greenLight_1}
                        />

                        <Button
                            variant="outlined"
                            endIcon={<Icon component={ArrowForwardIcon} />}
                            onClick={() => navigate(`/main-product/${product?._id}`)}
                            sx={{
                                color: colors.greenDark_1,
                                borderColor: colors.greenDark_1,
                                width: isMobile ? "280px" : "100%",
                                height: "50px",
                                borderRadius: "8px",
                                fontSize: "15px",
                                textTransform: "none",
                                fontFamily: "roboto-regular",
                                "&:hover": {
                                    backgroundColor: `${colors.greenDark_1}10`,
                                },
                            }}
                        >
                            View Details
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainProduct;
