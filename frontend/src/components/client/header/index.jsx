import React, { useState } from 'react';
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
import { clientBar, colors, dummyCart } from '../../../services';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Drawer, Icon, Rating, TextField, useMediaQuery, useTheme } from '@mui/material';
import { CartDrawer, DrawerComponent } from '../drawer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
    const location = useLocation();
    const theme = useTheme();

    // Responsive breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);

    // Cart Drawer
    const [openCart, setOpenCart] = useState(false);
    
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Cart Drawer handlers
    const handleOpenCart = () => setOpenCart(true);
    const handleCloseCart = () => setOpenCart(false);
    return (
        <AppBar position="static" sx={{
            position: 'sticky', // 👈 keeps it visible while scrolling
            top: 0,
            zIndex: 1100,
            background: colors.white, py: 0.5, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Box component='img' src='/logo-1.png' sx={{
                        display: { xs: 'none', md: 'flex' },
                        objectFit: 'contain',
                        maxWidth: '120px',
                        alignSelf: 'center',
                        cursor: 'pointer',
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
                    <Box component='img' src='/logo-1.png' sx={{
                        display: { xs: 'flex', md: 'none' },
                        objectFit: 'contain',
                        maxWidth: '120px',
                        alignSelf: 'center',
                        cursor: 'pointer',
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
                                        component={RouterLink}
                                        to={page.link}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
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
                            <CartDrawer openCart={openCart} handleCloseCart={handleCloseCart} quantity={quantity} setQuantity={setQuantity} />
                            {
                                isAuthenticated ? (
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" />
                                    </IconButton>
                                ) : (
                                    <IconButton href='/account/orders'>
                                        <Icon component={AccountCircleOutlinedIcon} sx={{ color: colors.iconColor_12 }} fontSize='medium' />
                                    </IconButton>
                                )
                            }
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
