import { Box, Button, Checkbox, Chip, Divider, Grid, Icon, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import React, { useState } from 'react'
import { productOrders } from '../../../services/utils/constants';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../services';

const OrderDetail = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Delivered');
    const isSelected = (id) => selected.includes(id);
    const [statusAnchorEl, setStatusAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const discount = 0;
    const shippingRate = 0;
    const subtotal = productOrders.reduce((acc, item) => acc + Number(item.total || 0), 0);
    const total = subtotal - discount + shippingRate;

    console.log(discount, " ", shippingRate, " ", subtotal, " ", total);

    const handleSortClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSortClose = () => {
        setAnchorEl(null);
    };

    const handleStatusClick = (event) => {
        setStatusAnchorEl(event.currentTarget);
    };

    const handleStatusClose = () => {
        setStatusAnchorEl(null);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        handleStatusClose();
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        handleSortClose();
    };

    const sortedOrders = [...productOrders].sort((a, b) => {
        if (!sortConfig.key) return 0; // no sorting if no key selected

        if (sortConfig.key === 'product') {
            const nameA = a.product.toLowerCase();
            const nameB = b.product.toLowerCase();
            if (nameA < nameB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (nameA > nameB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        }

        if (sortConfig.key === 'amount') {
            const amountA = Number(a.total);
            const amountB = Number(b.total);
            return sortConfig.direction === 'asc'
                ? amountA - amountB
                : amountB - amountA;
        }

        return 0;
    });

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter((item) => item !== id);
        }

        setSelected(newSelected);
    };

    return (
        <Box component='div' sx={{
            maxWidth: '100%',
            m: '15px 15px',
            // position: 'fixed'
        }}>
            <Box component='div' sx={{
                width: '97%',
                background: '#FFFFFF',
                display: 'flex',
                p: '20px 20px',
                mt: 2,
                gap: 1,
                flexDirection: 'column',
                borderRadius: '20px'
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    <Box component='div' sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: 'row' }}>
                        <Typography component='p' sx={{ color: '#232321', fontWeight: 700, fontSize: '20px' }}>Orders ID:{' '}
                            <Typography component='span' sx={{ color: '#232321', fontWeight: 700, fontSize: '20px' }}>#6743</Typography>
                        </Typography>
                        <Chip label="Pending" sx={{ background: 'rgba(255, 165, 47, 0.8)', color: '#232321', borderRadius: '10px', fontSize: '12px', fontWeight: 600 }} />
                    </Box>
                    <Box component='div' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Box component='div' sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            maxWidth: '238px',
                            justifyContent: 'end',
                            gap: 0.5,
                            alignItems: 'center',
                        }}>
                            <Box>
                                <Icon component={CalendarMonthOutlinedIcon} sx={{ color: '#232321', }} />
                            </Box>
                            <Box>
                                <Typography component='p' sx={{
                                    color: '#000000',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                }}>Feb 16,2022 - Feb 20,2022</Typography>
                                {/* {dateRange} */}
                            </Box>
                        </Box>
                        <Box component='div' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
                            <Box component='div' sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '180px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: '10px',
                                p: '5px 10px',
                                background: '#F4F2F2'
                            }}>
                                <Box>
                                    <Typography component='p' sx={{
                                        color: '#232321',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}>{selectedStatus ? selectedStatus : 'All'}</Typography>
                                </Box>
                                <Box>
                                    <IconButton sx={{ color: '#232321', }} onClick={handleStatusClick}>
                                        <Icon component={KeyboardArrowDownRoundedIcon} sx={{
                                            transform: statusAnchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }} />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={statusAnchorEl}
                                    open={Boolean(statusAnchorEl)}
                                    onClose={handleStatusClose}
                                    disableScrollLock
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right', // menu opens to the left
                                    }}
                                    PaperProps={{
                                        sx: {
                                            minWidth: '200px',
                                            mt: '10px',
                                            borderRadius: '10px'
                                        }
                                    }}
                                >
                                    <MenuItem onClick={() => handleStatusChange('Delivered')} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.primary }} component={FiberManualRecordIcon} /> Deliverd</MenuItem>
                                    <Divider variant='middle' />
                                    <MenuItem onClick={() => handleStatusChange('Pending')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: 'rgba(255, 165, 47, 0.8)' }} component={FiberManualRecordIcon} /> Pending</MenuItem>
                                    <Divider variant='middle' />
                                    <MenuItem onClick={() => handleStatusChange('Cancelled')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: '#FFC107' }} component={FiberManualRecordIcon} /> Cancelled</MenuItem>
                                </Menu>
                            </Box>
                            <IconButton sx={{ background: '#F4F2F2', p: '12px 15px', borderRadius: '10px' }}><Icon fontSize='medium' component={PrintOutlinedIcon} /></IconButton>
                            <IconButton sx={{ background: '#F4F2F2', p: '12px 15px', borderRadius: '10px' }}><Typography component='p' sx={{ color: '#232321', fontSize: '14px', fontWeight: 500 }}>Save</Typography></IconButton>
                        </Box>
                    </Box>
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '280px', borderRadius: '15px', border: '1px solid #E7E7E3', p: '15px 20px' }}>
                                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <Box component='div' sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '56px',
                                        width: '56px',
                                        borderRadius: '10px',
                                        background: '#232321'
                                    }}>
                                        <Icon fontSize='large' sx={{ color: '#FFFFFF' }} component={PersonOutlinedIcon} />
                                    </Box>
                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexShrink: 1, gap: 1 }}>
                                        <Typography cpmonent='p' sx={{ color: '#232321', fontSize: '20px', fontWeight: 600 }}>Customer</Typography>
                                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Full Name: Shristi Singh</Typography>
                                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Email: shristi@gmail.com</Typography>
                                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Phone: +91 904 231 1212</Typography>

                                    </Box>
                                </Box>
                                <Button variant='contained' sx={{ background: colors.primary, p: '7px 15px', borderRadius: '10px' }}>
                                    <Typography component='p' sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500, textTransform: 'none' }}>View profile</Typography>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '280px', borderRadius: '15px', border: '1px solid #E7E7E3', p: '15px 20px' }}>
                                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <Box component='div' sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '56px',
                                        width: '56px',
                                        borderRadius: '10px',
                                        background: '#232321'
                                    }}>
                                        <Icon fontSize='large' sx={{ color: '#FFFFFF' }} component={LocalMallOutlinedIcon} />
                                    </Box>
                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexShrink: 1, gap: 1 }}>
                                        <Typography cpmonent='p' sx={{ color: '#232321', fontSize: '20px', fontWeight: 600 }}>Order Info</Typography>
                                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Shipping: Next express</Typography>
                                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Payment Method: Paypal</Typography>
                                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Status: Pending</Typography>

                                    </Box>
                                </Box>
                                <Button variant='contained' sx={{ background: colors.primary, p: '7px 15px', borderRadius: '10px' }}>
                                    <Typography component='p' sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500, textTransform: 'none' }}>View profile</Typography>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2, minWidth: '280px', minHeight: '175px', borderRadius: '15px', border: '1px solid #E7E7E3', p: '15px 20px' }}>
                                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <Box component='div' sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '56px',
                                        width: '56px',
                                        borderRadius: '10px',
                                        background: '#232321'
                                    }}>
                                        <Icon fontSize='large' sx={{ color: '#FFFFFF' }} component={LocalMallOutlinedIcon} />
                                    </Box>
                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', width: '200px', gap: 1 }}>
                                        <Typography cpmonent='p' sx={{ color: '#232321', fontSize: '20px', fontWeight: 600 }}>Deliver to</Typography>
                                        <Typography cpmonent='p' sx={{
                                            color: '#70706E',
                                            fontSize: '16px', fontWeight: 600,
                                        }}>Address: Dharam Colony, Palam Vihar, Gurgaon, Haryana</Typography>
                                    </Box>
                                </Box>
                                <Button variant='contained' sx={{ background: colors.primary, p: '7px 15px', borderRadius: '10px' }}>
                                    <Typography component='p' sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500, textTransform: 'none' }}>View profile</Typography>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 1, minWidth: '280px', borderRadius: '15px', border: '1px solid #E7E7E3', p: '15px 20px' }}>
                        <Typography cpmonent='p' sx={{ color: '#232321', fontSize: '20px', fontWeight: 600 }}>Deliver to</Typography>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                            <Box component='img' src='/master-card.png' sx={{ objectFit: 'contain', maxWidth: '40px' }} />
                            <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Master Card **** **** 6557</Typography>
                        </Box>
                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Business name: Shristi Singh</Typography>
                        <Typography cpmonent='p' sx={{ color: '#70706E', fontSize: '16px', fontWeight: 600 }}>Phone: +91 904 231 1212</Typography>
                    </Box>
                    <Box>
                        <Typography cpmonent='p' sx={{ color: '#232321', fontSize: '20px', fontWeight: 600 }}>Note</Typography>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', minWidth: '650px', borderRadius: '15px', border: '1px solid #E7E7E3', p: '10px 5px' }}>
                            <TextField multiline rows={4} placeholder='Type some notes' sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                    '&:hover fieldset': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    '::placeholder': {
                                        color: '#70706E',
                                        fontSize: '16px',
                                    },
                                },
                            }} />
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Products list */}

            <Box component='div' sx={{
                width: '97%',
                background: '#FFFFFF',
                display: 'flex',
                p: '20px 20px',
                mt: 2,
                gap: 1,
                flexDirection: 'column',
                borderRadius: '20px'
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2
                }}>
                    <Typography component='h3' sx={{
                        color: '#000000',
                        fontSize: '20px',
                        fontWeight: 600
                    }}>Products</Typography>
                    <Box component='div'>
                        <IconButton onClick={handleSortClick} sx={{ color: '#000000' }}><Icon fontSize='small' component={MoreVertRoundedIcon} /></IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleSortClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right', // menu opens to the left
                            }}
                            disableScrollLock
                            sx={{ position: 'fixed' }}
                        >
                            <MenuItem onClick={() => handleSort('product')} sx={{ gap: 1.5 }}><Icon fontSize='small' component={SortByAlphaRoundedIcon} /> Sort by Product</MenuItem>
                            <MenuItem onClick={() => handleSort('amount')} sx={{ gap: 1.5 }}><Icon fontSize='small' component={MonetizationOnOutlinedIcon} /> Sort by Amount</MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Divider />

                <TableContainer  >
                    <Table sx={{ minWidth: 650 }} aria-label="recent purchases table">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8, }}>Product Name</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8, }}>Order ID</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Quantity</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}></TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                productOrders.length > 0 ? sortedOrders.map((product) => {
                                    return (
                                        <TableRow key={product.orderId} sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            cursor: 'pointer'
                                        }}
                                            onClick={() => navigate(`/admin/products/${product.orderId}`)}
                                        >
                                            {/* <TableCell padding='checkbox'>
                                                
                                            </TableCell> */}
                                            <TableCell component='th' scope='row' sx={{ fontSize: '14px', fontWeight: 600, color: '#000000' }}>
                                                <Box component='div' sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}>
                                                    <Checkbox
                                                        checked={isSelected(product.orderId)}
                                                        onChange={() => handleClick(product.orderId)}
                                                        sx={{
                                                            color: '#000000',
                                                            '&.Mui-checked': {
                                                                color: '#000000',
                                                            },
                                                        }} />

                                                    <Box component='img' src='/productImg.png' sx={{ width: '40px', height: '40px', borderRadius: '10px' }} />
                                                    {product.product}
                                                </Box>

                                            </TableCell>
                                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: '#000000', }}>{product.orderId}</TableCell>
                                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: '#000000', }}>{product.qty}</TableCell>
                                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: '#000000', }}></TableCell>
                                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: '#000000', }}></TableCell>
                                            <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: '#000000', }}></TableCell>
                                            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#000000' }} align="right">₹{product.total}</TableCell>
                                        </TableRow>
                                    )
                                })
                                    :
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ color: '#70706E', fontSize: '16px' }}>No products found</TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'end', mt: 4, }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                        <Typography component='p' sx={{ color: '#232321', fontSize: '16px', fontWeight: 600 }}>Subtotal</Typography>
                        <Typography component='p' sx={{ color: '#232321', fontSize: '16px', fontWeight: 600, ml: 1 }}>₹{subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                        <Typography component='p' sx={{ color: '#232321', fontSize: '16px', fontWeight: 600 }}>Discount</Typography>
                        <Typography component='p' sx={{ color: '#232321', fontSize: '16px', fontWeight: 600, ml: 1 }}>₹{discount.toFixed(2)}</Typography>
                    </Box>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                        <Typography component='p' sx={{ color: '#232321', fontSize: '16px', fontWeight: 600 }}>Shipping Rate</Typography>
                        <Typography component='p' sx={{ color: '#232321', fontSize: '16px', fontWeight: 600, ml: 1 }}>₹{shippingRate.toFixed(2)}</Typography>
                    </Box>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                        <Typography variant='h4' component='p' sx={{ color: '#232321', fontWeight: 600 }}>Total</Typography>
                        <Typography variant='h4' component='p' sx={{ color: '#232321', fontWeight: 600, ml: 1 }}>₹{total.toFixed(2)}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default OrderDetail
