import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux'
import { clientBar, colors, dummyCart, socialMediaLinks } from '../../../services';
import { Icon, IconButton, MenuItem, Slider, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Scrollbars from 'react-custom-scrollbars';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';
import { clearCart, decrement, increment, removeFromCart, updateQuantity } from '../../../store/slices/cartSlice';


export const DrawerComponent = ({ toggleDrawer, open }) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div>
            <Drawer open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: 250,
                        px: 2,
                        py: 1,
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                        backgroundColor: colors.white, // optional
                        mb: { xs: 2, sm: 0 }, // margin-bottom only on mobile
                        height: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 16px)' },
                    },
                }}>
                <Box role="presentation" justifyContent={'space-between'} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={toggleDrawer(false)}>
                    <List>
                        {clientBar.map((item) => {
                            const isActive = location.pathname === item.link

                            return (
                                <ListItem key={item.id} disablePadding sx={{
                                    borderRadius: "20px",
                                    color: isActive ? colors.white : colors.textColor_4,
                                    background: isActive ? colors.greenDark_2 : colors.transparent,
                                }}>
                                    <ListItemButton onClick={() => navigate(item.link)} >
                                        <ListItemIcon>
                                            <Icon component={item.icon} sx={{ color: isActive ? colors.white : null }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} sx={{ fontFamily: 'cinzel', fontSize: '16px', }} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', mb: 2, padding: '0px 15px', }}>
                        <Divider variant="fullWidth" sx={{ my: 2, borderWidth: 1, backgroundColor: colors.greenDark_2, opacity: 0.4 }} />
                        <Box component={Link} href={'/account'}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',

                                gap: 2,
                                color: colors.greenDark_2,
                                textDecoration: 'none',
                            }}
                        >
                            <Icon component={PersonIcon} sx={{ color: colors.iconColor_11 }} />
                            <Typography variant='h5' sx={{ fontFamily: 'nunito-sans', fontWeight: '600', fontSize: '18px', }}>Account</Typography>
                        </Box>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, mt: 3 }}>
                            {
                                socialMediaLinks.map((item) => {
                                    return (
                                        <Icon key={item.id}
                                            component={item.icon}
                                            sx={{ color: colors.iconColor_1, cursor: 'pointer' }}
                                            onClick={() => window.open(item.link, '_blank')} />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}

export const CartDrawer = ({ openCart, handleCloseCart, handleOpenForm, cartItems, totalAmount }) => {
    const dispatch = useDispatch();
    
    const theme = useTheme();
    const navigate = useNavigate();

    // Responsive breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    return (
        <Drawer anchor="right" open={openCart} onClose={handleCloseCart}>
            <Box
                sx={{
                    width: { xs: 280, sm: 350 },
                    height: "100vh", // ✅ full viewport height
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* 🔹 Fixed Header */}
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: colors.white,
                        zIndex: 2,
                        p: 2,
                        borderBottom: "1px solid #ddd",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "inter-medium",
                                color: colors.textColor_4,
                                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                            }}
                        >
                            Shopping Cart
                        </Typography>
                        <IconButton onClick={handleCloseCart}>
                            <Icon component={CancelIcon} sx={{ color: colors.iconColor_1 }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* 🔹 Scrollable Cart Items */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: 1,
                        py: 1
                    }}
                >
                    {cartItems.length === 0 ? (
                        <Typography
                            sx={{
                                textAlign: "center",
                                mt: 4,
                                fontFamily: "inter-regular",
                                color: colors.textColor_2,
                            }}
                        >
                            Your cart is empty.
                        </Typography>
                    ) : (
                        cartItems.map((item) => (
                            <Box
                                component='div'
                                key={item.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: colors.grayLight_1,
                                    borderRadius: "10px",
                                    px: 1,
                                    py: 1,
                                    mb: 1,
                                    position: 'relative'
                                }}
                            >
                                {/* Product Image */}
                                <Box
                                    component='div'
                                    onClick={() => {
                                        navigate(`/collections/${item.id}`)
                                        handleCloseCart();
                                    }}
                                    sx={{
                                        width: { xs: 80, sm: 100, md: 60 },
                                        height: { xs: 80, sm: 100, md: 60 },
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>

                                {/* Product Info */}
                                <Box sx={{ flexGrow: 1, ml: 1 }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "inter-medium",
                                            color: colors.textColor_4,
                                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                                        }}
                                    >
                                        {item.name?.slice(0, 10).concat("...")}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "inter-medium",
                                            color: colors.textColor_1,
                                            fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                        }}
                                    >
                                        Rs.{item.price}
                                    </Typography>
                                </Box>

                                {/* Quantity Controls */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 1000,
                                    }}
                                >
                                    <IconButton size="small" onClick={() => dispatch(decrement(item.id))}>
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <TextField
                                        variant="standard"
                                        inputProps={{
                                            min: 1,
                                            style: {
                                                textAlign: "center",
                                                fontFamily: "roboto-regular",
                                                fontSize: "16px",
                                                width: "40px",
                                            },
                                        }}
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const value = Math.max(1, parseInt(e.target.value) || 1);
                                            dispatch(updateQuantity({ id: item.id, quantity: value }));
                                        }}
                                        sx={{
                                            "& .MuiInputBase-root:before": { borderBottom: "none" },
                                            "& .MuiInputBase-root:after": { borderBottom: "none" },
                                        }}
                                    />
                                    <IconButton size="small" onClick={() => dispatch(increment(item.id))}>
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <IconButton
                                    size="small"
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    sx={{
                                        // ml: 0.5,
                                        position: "absolute",
                                        top: -5,
                                        right: -5,
                                        // zIndex: 1000,
                                        color: colors.iconColor_20 || "#e53935",
                                        backgroundColor: colors.iconBgColor_6,
                                        "&:hover": { backgroundColor: colors.iconBgColor_8 },
                                    }}
                                >
                                    <DeleteOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )
                        ))}
                </Box>

                {/* 🔹 Fixed Footer */}
                <Box
                    sx={{
                        position: "sticky",
                        bottom: 0,
                        backgroundColor: colors.white,
                        p: 2,
                        borderTop: "1px solid #ddd",
                        zIndex: 2,
                    }}
                >
                    {/* Total */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "inter-bold",
                                color: colors.textColor_4,
                                fontSize: { xs: "14px", sm: "16px", md: "20px" },
                            }}
                        >
                            Total Amount
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "inter-medium",
                                color: colors.textColor_4,
                                fontSize: { xs: "14px", sm: "16px", md: "20px" },
                            }}
                        >
                            Rs.{totalAmount.toFixed(2)}
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Button
                        variant="contained"
                        onClick={handleOpenForm}
                        disabled={cartItems.length === 0}
                        endIcon={<Icon component={ShoppingCartOutlinedIcon} />}
                        sx={{
                            color: colors.textColor_5,
                            backgroundColor: colors.greenDark_1,
                            width: "100%",
                            height: "50px",
                            borderRadius: "8px",
                            textTransform: "none",
                            fontFamily: "roboto-regular",
                        }}
                    >
                        Proceed To Checkout
                    </Button>
                    {/* Cancel the order and empty the cart */}
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(clearCart())}
                        sx={{
                            color: colors.greenDark_1,
                            borderColor: colors.greenDark_1,
                            width: "100%",
                            height: "50px",
                            borderRadius: "8px",
                            mt: 1,
                            textTransform: "none",
                            fontFamily: "roboto-regular",
                            "&:hover": {
                                backgroundColor: `${colors.greenDark_1}10`,
                            },
                        }}
                    >
                        Cancel Order
                    </Button>
                </Box>
            </Box>
        </Drawer>
    )
}

export const FilterSortDrawer = ({ drawerOpen, toggleDrawer, priceRange, handlePriceChange, handleMaxChange, handleMinChange, sortOption, setSortOption }) => {
    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
                sx: {
                    width: { xs: 320, sm: 380, md: 400 }, // 📱 100% on phones, fixed width on larger screens
                    borderRadius: { xs: 0, sm: "12px 0 0 12px" },
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    backgroundColor: colors.white,
                },
            }}
        >
            {/* ✅ Smooth Scroll Area */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 3 },
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: colors.grayDark_1,
                        borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f0f0f0",
                    },
                }}
            >
                {/* === Drawer Content === */}
                <Typography
                    sx={{
                        fontFamily: "playfairDisplay",
                        fontSize: { xs: "20px", sm: "24px" },
                        mb: 2,
                        color: colors.textColor_3,
                        textAlign: "left",
                    }}
                >
                    Filter & Sort
                </Typography>

                {/* === Price Filter === */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            fontFamily: "roboto-medium",
                            fontSize: { xs: "15px", sm: "16px" },
                            mb: 1,
                            color: colors.textColor_1,
                        }}
                    >
                        Price Range
                    </Typography>

                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        sx={{
                            color: colors.textColor_3,
                            mt: 1,
                        }}
                    />

                    <Typography
                        sx={{
                            fontFamily: "roboto-regular",
                            fontSize: "14px",
                            color: colors.textColor_1,
                            mb: 2,
                        }}
                    >
                        ${priceRange[0]} – ${priceRange[1]}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexDirection: { xs: "column", sm: "row" },
                        }}
                    >
                        <TextField
                            label="Min"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={priceRange[0]}
                            onChange={handleMinChange}
                            fullWidth
                        />
                        <TextField
                            label="Max"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={priceRange[1]}
                            onChange={handleMaxChange}
                            fullWidth
                        />
                    </Box>
                </Box>

                {/* === Sort Options === */}
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "roboto-medium",
                            fontSize: { xs: "15px", sm: "16px" },
                            mb: 1,
                            color: colors.textColor_1,
                        }}
                    >
                        Sort by
                    </Typography>

                    {[
                        "Default",
                        "Alphabetically: A → Z",
                        "Alphabetically: Z → A",
                        "Price: Low → High",
                        "Price: High → Low",
                        "Newest",
                        "Oldest",
                    ].map((option) => {
                        const isSelected = option === sortOption;
                        return (
                            <MenuItem
                                key={option}
                                onClick={() => setSortOption(option)}
                                sx={{
                                    fontFamily: "roboto-regular",
                                    fontSize: "16px",
                                    color: isSelected
                                        ? `${colors.white} !important`
                                        : `${colors.textColor_3}`,
                                    backgroundColor: isSelected
                                        ? `${colors.greenDark_1} !important`
                                        : colors.transparent,
                                    borderRadius: "8px",
                                    transition: "all 0.25s ease-in-out",
                                    ":hover": {
                                        backgroundColor: `${colors.greenLight_2} !important`,
                                        color: `${colors.textColor_3} !important`,
                                    },
                                    mb: 0.5,
                                }}
                            >
                                {option}
                            </MenuItem>
                        );
                    })}
                </Box>
            </Box>

            {/* === Done Button === */}
            <Box
                sx={{
                    borderTop: `1px solid ${colors.borderColor}`,
                    p: { xs: 2, sm: 3 },
                    backgroundColor: colors.white,
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    onClick={toggleDrawer(false)}
                    sx={{
                        backgroundColor: colors.greenDark_1,
                        textTransform: "none",
                        fontFamily: "roboto-medium",
                        fontSize: "16px",
                        color: colors.white,
                        borderRadius: "8px",
                        py: 1.2,
                        ":hover": { backgroundColor: colors.greenDark_2 },
                    }}
                >
                    Apply
                </Button>
            </Box>
        </Drawer>
    )
}
