import { Box, Button, Chip, Dialog, DialogActions, DialogContent, Icon, IconButton, InputAdornment, Menu, MenuItem, Paper, Popper, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { dummyProducts, notifications } from '../../../services/utils/constants';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchAnchorEl, setSearchAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllResults, setShowAllResults] = useState(false);

    // Example: filtered products based on search
    const filteredProducts = dummyProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleSortClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSortClose = () => {
        setAnchorEl(null);
    };

    const handleSearchProductClick = (product) => {
        setShowSearch(false);
        setSearchQuery('');
        setShowAllResults(false);
        const route = navigate(`/admin/products/${product.id}`);
        console.log(route);
    }

    return (
        <Box component='div' bgcolor={'#FAFAFA'} maxWidth={'100%'} minHeight={'70px'} sx={{
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
                            setSearchQuery(e.target.value);
                            if (!searchAnchorEl) setSearchAnchorEl(e.currentTarget);
                        }}
                        onFocus={(event => setSearchAnchorEl(event.currentTarget))}
                        sx={{
                            width: 250,
                            background: '#fff',
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                '& fieldset': {
                                    borderColor: '#003F62',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#003F62',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#003F62',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon fontSize='small' sx={{ color: '#70706E' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end" sx={{
                                    borderLeft: '1px solid #003F62',
                                    pl: '10px',
                                }}>
                                    <IconButton onClick={() => { setShowSearch(false); setSearchQuery(''); }} sx={{ color: '#003F62', width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #003F62' }}>
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
                                <Typography variant="h5" sx={{ py: 1, fontWeight: 'bold', color: '#232321' }}>Products</Typography>
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
                                                            src={product.image}
                                                            alt={product.name}
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
                                                            sx={{ color: '#232321', fontWeight: 'bold' }}
                                                        >
                                                            {product.name}
                                                        </Typography>
                                                    </Box>
                                                </MenuItem>
                                            ))}

                                        {!showAllResults && filteredProducts.length > 3 && (
                                            <MenuItem onClick={() => setShowAllResults(true)}>
                                                <Typography variant="body2" sx={{ color: '#003F62', fontWeight: 'bold' }}>
                                                    See all products
                                                </Typography>
                                            </MenuItem>
                                        )}
                                    </>
                                ) : (
                                    <MenuItem disabled>
                                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
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
                    <SearchOutlinedIcon sx={{ color: '#000' }} />
                </IconButton>
            )}
            <IconButton onClick={() => setOpen(true)} sx={{
                color: '#000', '&:hover': { color: '#000' }
            }}>
                <Icon sx={{
                    color: '#000'
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
                            <Typography variant='h6' component='p' sx={{ color: '#232321', fontWeight: 'bold' }}>Notifications</Typography>
                            <IconButton onClick={() => setOpen(false)} sx={{ color: '#000', width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #000' }}>
                                <Icon fontSize='inherit' sx={{ color: '#232321', fontSize: '12px' }} component={CloseOutlinedIcon} />
                            </IconButton>
                        </Box>
                    </Box>
                    <DialogContent sx={{ p: 1, maxHeight: '300px', }}>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {
                                notifications.length > 0 ?
                                    notifications.map((notification) => (
                                        <Box key={notification.id} component='div' sx={{ display: 'flex', gap: 2, flexDirection: 'row', background: '#FAFAFA', p: 1, borderRadius: '10px' }}>
                                            <Box component='img' src='/productImg.png' sx={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '10px' }} />
                                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', }}>
                                                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography component='p' sx={{ color: '#232321', fontSize: '16px', fontWeight: 600 }}>{notification.title}</Typography>
                                                        <Typography component='p' sx={{ color: '#232321', fontSize: '14px', fontWeight: 600 }}>{notification.price === null ? '' : `Rs.${notification.price}`}</Typography>
                                                    </Box>
                                                    <Chip variant='filled' color='default' sx={{ background: '#003F62', color: '#FAFAFA', borderRadius: '10px' }} label={notification.status} />
                                                </Box>
                                                <Typography component='p' sx={{ color: 'rgba(35,35,33,0.8)', fontSize: '12px', fontWeight: 600 }}>{notification.date}</Typography>
                                            </Box>
                                        </Box>
                                    ))
                                    :
                                    <Typography variant='body1' component='p' sx={{ color: '#232321', fontSize: '14px', fontWeight: 600 }}>No new notifications</Typography>
                            }
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                        <Button startIcon={<Icon component={DoneOutlinedIcon} />} sx={{ color: '#003F62', borderRadius: '10px', fontSize: '14px' }}>Mark all as read</Button>
                        <Button sx={{ background: '#003F62', color: '#FFFFFF', borderRadius: '10px', fontSize: '12px', px: 2 }}>View all notificaton</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
            <Button variant='outlined' onClick={handleSortClick} endIcon={<Icon component={KeyboardArrowDownIcon} />}
                sx={{
                    color: anchorEl ? '#fff' : '#000',
                    padding: '10px 15px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    backgroundColor: anchorEl ? '#003F62' : 'transparent',
                    border: `1px solid ${anchorEl ? '#003F62' : '#000'}`,
                    '&:hover': {
                        color: '#000',
                        border: '1px solid #000',
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
                    <Typography variant='h6' component='p' sx={{ color: '#232321', fontWeight: 'bold' }}>Admin</Typography>
                </Box>
                <MenuItem onClick={handleSortClose} sx={{ justifyContent: 'space-between', color: '#232321', fontSize: '14px', py: 1.5 }}>Change password <Icon fontSize='inherit' sx={{ fontSize: '14px' }} component={ArrowForwardIosOutlinedIcon} /></MenuItem>
                <MenuItem onClick={handleSortClose} sx={{ justifyContent: 'space-between', color: '#232321', fontSize: '14px', py: 1.5 }}>LOG OUT <Icon fontSize='inherit' sx={{ fontSize: '14px' }} component={LogoutOutlinedIcon} /></MenuItem>
            </Menu>
        </Box>
    )
}

export default AdminHeader
