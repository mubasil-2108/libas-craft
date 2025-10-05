import { Box, Button, Chip, Dialog, DialogActions, DialogContent, Icon, IconButton, InputAdornment, Menu, MenuItem, Paper, Popper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { notifications } from '../../../services/utils/constants';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../services';
import { searchProduct } from '../../../store/slices/productSlice';
import { useCallback } from 'react';

const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchProducts } = useSelector((state) => state.product);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchAnchorEl, setSearchAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllResults, setShowAllResults] = useState(false);

    // Example: filtered products based on search
    const filteredProducts = searchProducts;

    const handleSortClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleSortClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleSearchChange = useCallback(async (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim() !== '') {
            await dispatch(searchProduct(value));
        }
    }, [dispatch]);

    const handleSearchProductClick = useCallback((product) => {
        setShowSearch(false);
        setSearchQuery('');
        setShowAllResults(false);
        navigate(`/admin/products/${product?._id}`);
    }, [navigate]);

    return (
        <Box component='div' bgcolor={colors.grayLight_1} maxWidth={'100%'} minHeight={'70px'} sx={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
            pr: '30px',
            gap: 3
        }}>
            {showSearch ? (
                <>
                    <TextField
                        autoFocus
                        size="small"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => {
                            handleSearchChange(e);
                            if (!searchAnchorEl) setSearchAnchorEl(e.currentTarget);
                        }}
                        onFocus={(event => setSearchAnchorEl(event.currentTarget))}
                        sx={{
                            width: 250,
                            background: colors.white,
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '& fieldset': {
                                    borderColor: colors.borderColor_2,
                                },
                                '&:hover fieldset': {
                                    borderColor: colors.borderColor_2,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: colors.borderColor_2,
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon fontSize='small' sx={{ color: colors.iconColor_1 }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end" sx={{
                                    borderLeft: `1px solid ${colors.borderColor_2}`,
                                    pl: '10px',
                                }}>
                                    <IconButton onClick={() => { setShowSearch(false); setSearchQuery(''); }} sx={{ color: colors.iconColor_5, width: '10px', height: '10px', borderRadius: '50%', border: `1px solid ${colors.borderColor_2}` }}>
                                        <CloseOutlinedIcon fontSize='inherit' sx={{ fontSize: '10px', }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Popper
                        open={Boolean(searchAnchorEl) && searchQuery.trim() !== ''}
                        anchorEl={searchAnchorEl}
                        placement="bottom-end"
                        style={{ zIndex: 1300 }} // above most elements
                    >
                        <Paper
                            sx={{
                                mt: 1,
                                p: 1,
                                px: 2,
                                width: 250,
                                maxHeight: 400,
                                overflowY: 'auto',
                                borderRadius: '8px',
                            }}
                        >
                            <Box component='div'>
                                <Typography variant="h5" sx={{ py: 1, fontWeight: 'bold', color: colors.textColor_3 }}>Products</Typography>
                            </Box>
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {filteredProducts.length > 0 ? (
                                    <>
                                        {(showAllResults ? filteredProducts : filteredProducts.slice(0, 3))
                                            .map((product) => (
                                                <MenuItem
                                                    key={product.id}
                                                    sx={{ p: 0 }}
                                                    onClick={() => handleSearchProductClick(product)}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box
                                                            component="img"
                                                            src={`https://www.googleapis.com/drive/v3/files/${product?.productPhoto[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                                                            alt={product?.productPhoto[0]?.name}
                                                            sx={{
                                                                width: '50px',
                                                                height: '50px',
                                                                objectFit: 'contain',
                                                                borderRadius: '5px',
                                                                mr: 1,
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ color: colors.textColor_3, fontWeight: 'bold' }}
                                                        >
                                                            {product.productName}
                                                        </Typography>
                                                    </Box>
                                                </MenuItem>
                                            ))}

                                        {!showAllResults && filteredProducts.length > 3 && (
                                            <MenuItem onClick={() => setShowAllResults(true)}>
                                                <Typography variant="body2" sx={{ color: colors.textColor_6, fontWeight: 'bold' }}>
                                                    See all products
                                                </Typography>
                                            </MenuItem>
                                        )}
                                    </>
                                ) : (
                                    <MenuItem disabled>
                                        <Typography variant="body2" color={colors.textColor_3} sx={{ fontStyle: 'italic' }}>
                                            No products found
                                        </Typography>
                                    </MenuItem>
                                )}
                            </Box>
                        </Paper>
                    </Popper>
                </>
            ) : (
                <IconButton onClick={() => setShowSearch(true)}>
                    <SearchOutlinedIcon sx={{ color: colors.iconColor_7 }} />
                </IconButton>
            )}
            <IconButton onClick={() => setOpen(true)} sx={{
                color: colors.black, '&:hover': { color: colors.iconColor_7 }
            }}>
                <Icon sx={{
                    color: colors.iconColor_7
                }} component={NotificationsIcon} />
            </IconButton>
            <Fragment>
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth='md'
                    PaperProps={{
                        sx: {
                            position: 'absolute',
                            top: '80px',  // adjust as needed
                            right: '170px', // adjust as needed
                            m: 0,
                            borderRadius: '10px',
                            minHeight: '200px',
                        }
                    }}
                    hideBackdrop
                >
                    <Box sx={{ p: 2, width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h6' component='p' sx={{ color: colors.textColor_3, fontWeight: 'bold' }}>Notifications</Typography>
                            <IconButton onClick={() => setOpen(false)} sx={{ color: colors.iconColor_7, width: '10px', height: '10px', borderRadius: '50%', border: `1px solid ${colors.borderColor_3}` }}>
                                <Icon fontSize='inherit' sx={{ color: colors.iconColor_6, fontSize: '12px' }} component={CloseOutlinedIcon} />
                            </IconButton>
                        </Box>
                    </Box>
                    <DialogContent sx={{ p: 1, maxHeight: '300px', }}>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {
                                notifications.length > 0 ?
                                    notifications.map((notification) => (
                                        <Box key={notification.id} component='div' sx={{ display: 'flex', gap: 2, flexDirection: 'row', background: colors.grayLight_1, p: 1, borderRadius: '10px' }}>
                                            <Box component='img' src='/productImg.png' sx={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '10px' }} />
                                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', }}>
                                                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '16px', fontWeight: 600 }}>{notification.title}</Typography>
                                                        <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '14px', fontWeight: 600 }}>{notification.price === null ? '' : `Rs.${notification.price}`}</Typography>
                                                    </Box>
                                                    <Chip variant='filled' color='default' sx={{ background: colors.primary, color: colors.grayLight_1, borderRadius: '10px' }} label={notification.status} />
                                                </Box>
                                                <Typography component='p' sx={{ color: colors.textColor_2, fontSize: '12px', fontWeight: 600 }}>{notification.date}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                    :
                                    <Typography variant='body1' component='p' sx={{ color: colors.textColor_3, fontSize: '14px', fontWeight: 600 }}>No new notifications</Typography>
                            }
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                        <Button startIcon={<Icon component={DoneOutlinedIcon} />} sx={{ color: colors.primary, borderRadius: '10px', fontSize: '14px' }}>Mark all as read</Button>
                        <Button sx={{ background: colors.primary, color: colors.white, borderRadius: '10px', fontSize: '12px', px: 2 }}>View all notificaton</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
            <Button variant='outlined' onClick={handleSortClick} endIcon={<Icon component={KeyboardArrowDownIcon} />}
                sx={{
                    color: anchorEl ? colors.white : colors.black,
                    padding: '10px 15px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    backgroundColor: anchorEl ? colors.primary : colors.transparent,
                    border: `1px solid ${anchorEl ? colors.borderColor_2 : colors.borderColor_3}`,
                    '&:hover': {
                        color: colors.black,
                        border: `1px solid ${colors.borderColor_3}`,
                    }
                }}
            >ADMIN</Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSortClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right', // menu opens to the left
                }}
                disableScrollLock
                PaperProps={{
                    sx: {
                        mt: 4,
                        width: '200px',
                        borderRadius: '10px',
                        gap: 1
                    }
                }}
            >
                <Box sx={{ p: 2, pt: 0, pb: 1, display: 'flex', flexDirection: 'column', }}>
                    <Typography variant='h6' component='p' sx={{ color: colors.textColor_3, fontWeight: 'bold' }}>Admin</Typography>
                </Box>
                <MenuItem onClick={handleSortClose} sx={{ justifyContent: 'space-between', color: colors.textColor_3, fontSize: '14px', py: 1.5 }}>Change password <Icon fontSize='inherit' sx={{ fontSize: '14px' }} component={ArrowForwardIosOutlinedIcon} /></MenuItem>
                <MenuItem onClick={handleSortClose} sx={{ justifyContent: 'space-between', color: colors.textColor_3, fontSize: '14px', py: 1.5 }}>LOG OUT <Icon fontSize='inherit' sx={{ fontSize: '14px' }} component={LogoutOutlinedIcon} /></MenuItem>
            </Menu>
        </Box>
    )
}

export default AdminHeader
