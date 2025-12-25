import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { clientBar, colors, dummyCart, stringAvatar } from '../../../services';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Divider, Drawer, Icon, Rating, TextField, useMediaQuery, useTheme } from '@mui/material';
import { CartDrawer, DrawerComponent } from '../drawer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ShoppingFormDialog } from '../dialog';
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPassword, SignIn, SignUp } from '../../common';
import { getUser, loginStatus, logoutUser } from '../../../store/slices/authSlice';

const settings = ['Profile', 'Orders', 'Logout'];

const Header = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    // Responsive breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [signInOpen, setSignInOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    // Cart Drawer
    const [openCart, setOpenCart] = useState(false);

    useEffect(() => {
        const loggedInUser = async () => {
            await dispatch(loginStatus()).then(async (data) => {
                if (data?.type === 'auth/loginStatus/fulfilled') {
                    await dispatch(getUser());
                }
            })
        }
        loggedInUser();
    }, [dispatch]);
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    const handleSignInClose = () => {
        setSignInOpen(false);
    };

    const handleSignUpClose = () => {
        setSignUpOpen(false);
    };

    const handleForgotPasswordClose = () => {
        setForgotPasswordOpen(false);
    };

    // 🧾 Total calculation
    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = async (setting) => {
        handleCloseUserMenu();
        switch (setting) {
            case 'Profile':
                navigate('/account/profile');
                break;

            case 'Orders':
                navigate('/account/orders');
                break;

            case 'Logout':
                await dispatch(logoutUser()).then((data) => {
                    console.log(data);
                    if (data?.type === 'auth/logoutUser/fulfilled') {
                        navigate('/');
                    }
                });
                break;

            default:
                break;
        }
    };

    // Cart Drawer handlers
    const handleOpenCart = () => setOpenCart(true);
    const handleCloseCart = () => setOpenCart(false);

    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
    return (
        <>
            <AppBar position="static" sx={{
                position: 'sticky', // 👈 keeps it visible while scrolling
                top: 0,
                zIndex: 1100,
                background: colors.white, py: 0.5, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters >
                        <Box component='img' onClick={() => window.location.href = '/'} src='/logo-1.png' sx={{
                            display: { xs: 'none', md: 'flex' },
                            objectFit: 'contain',
                            maxWidth: '120px',
                            alignSelf: 'center',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                        }} />
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleDrawer(true)}
                                color="inherit"
                            >
                                <MenuIcon sx={{ color: colors.iconColor_7 }} />
                            </IconButton>
                            <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
                        </Box>
                        <Box component='img' onClick={() => navigate('/')} src='/logo-1.png' sx={{
                            display: { xs: 'flex', md: 'none' },
                            objectFit: 'contain',
                            maxWidth: '120px',
                            alignSelf: 'center',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                        }} />
                        <Box sx={{ flexGrow: isTablet || isMobile ? 0.5 : 1, display: { xs: 'flex', md: 'none' } }} />

                        <Box sx={{ flexGrow: 1, justifyContent: 'center', gap: 7, display: { xs: 'none', md: 'flex' } }}>
                            {clientBar.map((page) => {
                                const isActive = location.pathname === page.link
                                return (
                                    <Box key={page.id} sx={{
                                        justifyContent: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5
                                    }}>
                                        <Box
                                            component='div'
                                            onClick={() => navigate(page.link)}
                                            sx={{
                                                position: "relative",
                                                zIndex: 10,
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                color: colors.textColor_4,
                                                textDecoration: 'none',
                                                transition: 'color 0.3s ease',
                                                '&:hover': {
                                                    color: colors.textColor_7,
                                                },
                                            }}
                                        >
                                            <Typography variant='h6' sx={{ fontFamily: 'nunito-sans', fontSize: '16px', fontWeight: isActive ? '600' : 'normal' }}>{page.name}</Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                height: '3px',
                                                width: '80%',
                                                alignSelf: 'center',
                                                // borderRadius: '2px',
                                                backgroundColor: isActive ? colors.greenDark_3 : 'transparent',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                        />
                                    </Box>
                                )
                            })}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip>
                                <IconButton onClick={handleOpenCart}>
                                    <Icon component={ShoppingCartOutlinedIcon} sx={{ color: colors.iconColor_12 }} fontSize='medium' />
                                </IconButton>
                                {/* Cart Sidebar */}
                                <CartDrawer cartItems={cartItems} totalAmount={totalAmount} handleOpenForm={handleOpenForm} openCart={openCart} handleCloseCart={handleCloseCart} />
                                {
                                    isLoggedIn ? (
                                        <IconButton onClick={handleOpenUserMenu} >
                                            <Avatar
                                                {...stringAvatar(user?.name || "Unknown User")}
                                                sx={{
                                                    ...stringAvatar(user?.name || "Unknown User").sx,
                                                    width: 30,
                                                    height: 30,
                                                    p:0.2,
                                                    fontSize: 14
                                                }}
                                            />
                                        </IconButton>
                                    ) : (
                                        // onClick={() => navigate('/account/orders')}
                                        <IconButton onClick={() => setSignInOpen(true)}>
                                            <Icon component={AccountCircleOutlinedIcon} sx={{ color: colors.iconColor_12 }} fontSize='medium' />
                                        </IconButton>
                                    )
                                }
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                PaperProps={{
                                    sx: {
                                        mt: '45px',
                                        borderRadius: '15px',
                                        minWidth: 220,
                                        boxShadow: '0px 6px 20px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                <Box sx={{ px: 2, py: 1 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            textAlign: 'center',
                                            color: colors.textColor_7,
                                        }}
                                    >
                                        {user?.name}, Welcome Back!
                                    </Typography>
                                </Box>
                                <Divider />
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() => handleMenuClick(setting)}
                                        sx={{
                                            py: 1,
                                            px: 2,
                                            '&:hover': {
                                                backgroundColor: colors.greenLight_1,
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 14 }}>
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ShoppingFormDialog cartItems={cartItems} handleCloseCart={handleCloseCart} totalAmount={totalAmount} open={openForm} handleClose={handleCloseForm} />
            <SignIn open={signInOpen} handleClose={handleSignInClose} setForgotPasswordOpen={setForgotPasswordOpen} setSignUpOpen={setSignUpOpen} />
            <SignUp open={signUpOpen} handleClose={handleSignUpClose} setSignInOpen={setSignInOpen} />
            <ForgotPassword open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} handleCloseSignIn={handleSignInClose} setSignUpOpen={setSignUpOpen} />
            {/* <OtpInput open={resetPasswordOpen} handleClose={handleResetPasswordClose} /> */}
        </>
    );
}
export default Header;
