import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Icon,
    IconButton,
    Rating,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { colors, dummyPackages } from "../../../services";
import { LuExpand } from "react-icons/lu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import Scrollbars from "react-custom-scrollbars";
import SpecialPackageTile from "../special-package-tile";
import ImageDialog from "../image-dialog";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const SpecialPackage = ({ mainPackage, packages }) => {
    const listRef = useRef(null);
    const theme = useTheme();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [expanded, setExpanded] = useState(false);
    const isInCart = cartItems.some(i => i.id === mainPackage?._id);
    const toggleExpand = () => setExpanded((prev) => !prev);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpenDialog = (imgSrc) => {
        setSelectedImage(imgSrc);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedImage(null);
    };

    const packgePrice = useMemo(() => {
        return mainPackage?.packageSalePrice ? mainPackage?.packageSalePrice : mainPackage?.packageRegularPrice;
    }, [mainPackage]);

    const handleCartAction = useCallback((e) => {
        e.stopPropagation(); // prevent navigation
        if (isInCart) {
            dispatch(removeFromCart(mainPackage?._id));
        } else {
            dispatch(addToCart({
                id: mainPackage?._id,
                name: mainPackage?.packageName,
                price: mainPackage?.packageSalePrice ? mainPackage?.packageSalePrice : mainPackage?.packageRegularPrice,
                image: mainPackage?.packageImage?.id,
                description: mainPackage?.packageDescription,
                rating: 0,
                quantity: 1, // initial quantity
            }));
        }
    }, [
        dispatch,
        isInCart,
        mainPackage?._id,
        mainPackage?.packageName,
        mainPackage?.packageSalePrice,
        mainPackage?.packageRegularPrice,
        mainPackage?.packageImage?.id,
        mainPackage?.packageDescription,
    ]);

    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: { xs: 2, sm: 4, md: 10 },
                py: { xs: 5, sm: 7, md: 10 },
                gap: { xs: 3, md: 5 },
                backgroundColor: colors.white,
            }}
        >
            {/* --- Title --- */}
            <Typography
                sx={{
                    fontFamily: "playfairDisplay",
                    fontSize: { xs: "32px", sm: "48px", md: "64px" },
                    textAlign: "center",
                    color: colors.textColor_7,
                }}
            >
                Special Package
            </Typography>

            {/* --- Content Layout --- */}
            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "center", md: "flex-start" },
                    justifyContent: "center",
                    gap: { xs: 4, sm: 5, md: 8 },
                    width: "100%",
                }}
            >
                {/* --- Left Section (Main Image + Product Info) --- */}
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        alignItems: { xs: "center", md: "flex-start" },
                        // width: { xs: "100%", md: "45%" },
                    }}
                >
                    {/* Product Image */}
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: { xs: "100%", sm: 450, md: 500 },
                            height: { xs: 240, sm: 350, md: 400 },
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            component="img"
                            src={`https://www.googleapis.com/drive/v3/files/${mainPackage?.packageImage?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <IconButton
                            onClick={() => handleOpenDialog(mainPackage?.packageImage?.id)}
                            size="medium"
                            sx={{
                                position: "absolute",
                                bottom: "10px",
                                right: "10px",
                                backgroundColor: colors.iconColor_11,
                                "&:hover": {
                                    backgroundColor: colors.iconColor_12,
                                },
                            }}
                        >
                            <Icon
                                component={LuExpand}
                                sx={{
                                    color: colors.iconColor_15,
                                    fontSize: "16px",
                                }}
                            />
                        </IconButton>
                    </Box>

                    {/* Product Info */}
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            width: "100%",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: colors.textColor_4,
                                    fontSize: { xs: "20px", sm: "22px", md: "24px" },
                                    fontFamily: "openSans-regular",
                                }}
                            >
                                {mainPackage?.packageName}
                            </Typography>
                            <Typography
                                sx={{
                                    color: colors.textColor_4,
                                    fontSize: { xs: "18px", sm: "20px" },
                                    fontFamily: "openSans-bold",
                                }}
                            >
                                Rs. {packgePrice.toFixed(2)}
                            </Typography>
                        </Box>

                        <Button
                            onClick={handleCartAction}
                            endIcon={<Icon component={ShoppingCartOutlinedIcon} />}
                            sx={{
                                color: colors.textColor_9,
                                fontFamily: "openSans-regular",
                                backgroundColor: colors.greenDark_1,
                                textTransform: "none",
                                fontSize: { xs: "14px", sm: "16px" },
                                px: { xs: 2, sm: 3 },
                                py: { xs: 1, sm: 1.2 },
                                borderRadius: "10px",
                                "&:hover": {
                                    backgroundColor: colors.greenDark_2,
                                },
                            }}
                        >
                            {isInCart ? "Remove from Cart" : "Add to Cart"}
                        </Button>
                    </Box>
                </Box>

                {/* --- Right Section --- */}
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 2, sm: 3 },
                        width: { xs: "100%", md: "50%" },
                    }}
                >
                    {/* Description */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography
                            sx={{
                                color: colors.textColor_7,
                                fontFamily: "openSans-bold",
                                fontSize: { xs: "20px", md: "24px" },
                            }}
                        >
                            Description
                        </Typography>
                        <Typography
                            sx={{
                                color: colors.textColor_4,
                                fontFamily: "openSans-regular",
                                fontSize: { xs: "14px", sm: "16px" },
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: expanded ? "unset" : 3,
                                WebkitBoxOrient: "vertical",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {mainPackage?.packageDescription?.slice(0, 200).concat('...')}
                        </Typography>
                    </Box>
                    {
                        expanded && (
                            <Typography href={`package/${mainPackage?._id}`} component='a' sx={{
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
                        )
                    }

                    <Button
                        onClick={toggleExpand}
                        endIcon={
                            <Icon
                                component={
                                    expanded
                                        ? KeyboardArrowUpOutlinedIcon
                                        : KeyboardArrowDownOutlinedIcon
                                }
                            />
                        }
                        sx={{
                            color: colors.textColor_4,
                            fontFamily: "openSans-regular",
                            textTransform: "none",
                            fontSize: "14px",
                            width: "fit-content",
                            "&:hover": {
                                color: colors.textColor_7,
                            },
                        }}
                    >
                        {expanded ? "See Less" : "See More"}
                    </Button>

                    {/* Small product section */}
                    {/* <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column-reverse", sm: "row" },
                            gap: { xs: 2, sm: 3 },
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "40%", md: "250px" },
                                height: { xs: 200, sm: 150, md: 150 },
                                borderRadius: "15px",
                                overflow: "hidden",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Box
                                component="img"
                                src="/watch.jpg"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: 1,
                                width: { xs: "300px", sm: "40%", md: "550px" },
                                height: { xs: 150, sm: 150, md: 150 },
                                backgroundColor: colors.blueLight_2,
                                px: 2,
                                // py: 2,
                                borderRadius: "15px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: colors.textColor_7,
                                        fontFamily: "openSans-regular",
                                        fontSize: { xs: "18px", sm: "20px" },
                                    }}
                                >
                                    Living Room Family Set
                                </Typography>
                                <Typography
                                    sx={{
                                        color: colors.textColor_4,
                                        fontSize: { xs: "18px", sm: "20px" },
                                        fontFamily: "openSans-bold",
                                    }}
                                >
                                    Rs.229.99
                                </Typography>
                            </Box>
                            <Rating
                                size="small"
                                name="read-only"
                                value={5}
                                precision={0.5}
                                readOnly
                                sx={{ color: colors.iconColor_16 }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Button sx={{ textTransform: "none", m: 0, p: 0 }}>
                                    <Typography
                                        sx={{
                                            color: colors.textColor_7,
                                            fontSize: { xs: "14px", sm: "16px" },
                                            fontFamily: "openSans-regular",
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                        }}
                                    >
                                        See Details
                                    </Typography>
                                </Button>
                                <IconButton
                                    onClick={() => handleOpenDialog("/herbal.png")}
                                    size="medium"
                                    sx={{
                                        borderRadius: "10px",
                                        backgroundColor: colors.iconColor_11,
                                        "&:hover": { backgroundColor: colors.iconColor_12 },
                                    }}
                                >
                                    <Icon
                                        component={ZoomInOutlinedIcon}
                                        sx={{
                                            color: colors.iconColor_9,
                                            fontSize: "20px",
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box> */}

                    {/* Scrollable List */}
                    <Scrollbars
                        ref={listRef}
                        autoHeight
                        autoHeightMax={isMobile ? 220 : 320}
                        renderView={(props) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    display: "flex",
                                    flexDirection: isMobile ? "row" : "column",
                                    overflowX: isMobile ? "scroll" : "hidden",
                                    overflowY: isMobile ? "hidden" : "scroll",
                                    gap: "10px",
                                    paddingRight: isMobile ? 0 : "15px", // ✅ space between scrollbar and items (desktop)
                                    paddingBottom: isMobile ? "10px" : 0, // ✅ space between scrollbar and items (mobile)
                                }}
                            />
                        )}
                        renderThumbVertical={
                            !isMobile
                                ? (props) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            backgroundColor: colors.greenDark_1,
                                            borderRadius: "2px",
                                        }}
                                    />
                                )
                                : () => <div style={{ display: "none" }} />
                        }
                        renderThumbHorizontal={
                            isMobile
                                ? (props) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            backgroundColor: colors.greenDark_1,
                                            borderRadius: "2px",
                                        }}
                                    />
                                )
                                : () => <div style={{ display: "none" }} />
                        }
                        style={{
                            width: "100%",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}
                    >
                        {mainPackage?.packageProducts?.map((item) => (
                            <SpecialPackageTile key={item._id} item={item} />
                        ))}
                    </Scrollbars>

                </Box>
            </Box>

            <ImageDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} ImageId={selectedImage} />
        </Box>
    );
};

export default SpecialPackage;
