import { Avatar, Box, Checkbox, Divider, Icon, IconButton, Link, Menu, MenuItem, Pagination, PaginationItem, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { purchases } from '../../../services/utils/constants';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Delivered');
    const [page, setPage] = useState(1);
    const isSelected = (id) => selected.includes(id);
    const [statusAnchorEl, setStatusAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const rowsPerPage = 8;

    const handleStatusClick = (event) => {
        setStatusAnchorEl(event.currentTarget);
    };

    const handleSortClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleStatusClose = () => {
        setStatusAnchorEl(null);
    };

    const handleSortClose = () => {
        setAnchorEl(null);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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

    const filteredPurchases = selectedStatus
        ? purchases.filter(p => p.status === selectedStatus)
        : purchases;
    const sortedPurchases = [...filteredPurchases].sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Convert amount and date for correct sorting
        if (sortConfig.key === 'amount') {
            aValue = parseFloat(aValue.replace(/[^\d.-]/g, ''));
            bValue = parseFloat(bValue.replace(/[^\d.-]/g, ''));
        }

        if (sortConfig.key === 'date') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const paginatedPurchases = sortedPurchases


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = purchases.map((n) => n.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

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
                display: 'flex',
                justifyContent: 'end',
                gap: 2
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '200px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: '10px',
                    p: '10px 15px',
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
                            <Icon component={KeyboardArrowDownRoundedIcon}  sx={{
                                transform: statusAnchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}/>
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
                                borderRadius:'10px'
                            }
                        }}
                    >
                        <MenuItem onClick={() => handleStatusChange(null)} selected={selectedStatus === null} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: '#000000' }} component={FiberManualRecordIcon} /> All</MenuItem>
                        <Divider variant='middle' />
                        <MenuItem onClick={() => handleStatusChange('Delivered')} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: '#003F62' }} component={FiberManualRecordIcon} /> Deliverd</MenuItem>
                        <Divider variant='middle' />
                        <MenuItem onClick={() => handleStatusChange('Pending')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: '#E0E0E0' }} component={FiberManualRecordIcon} /> Pending</MenuItem>
                        <Divider variant='middle' />
                        <MenuItem onClick={() => handleStatusChange('Canceled')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: '#FFC107' }} component={FiberManualRecordIcon} /> Cancelled</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Box component='div' sx={{
                width: '95%',
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
                    }}>Recent Purchases</Typography>
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
                            <MenuItem onClick={() => handleSort('date')} sx={{ gap: 1.5 }}><Icon fontSize='small' component={DateRangeOutlinedIcon} /> Sort by Date</MenuItem>
                            <MenuItem onClick={() => handleSort('amount')} sx={{ gap: 1.5 }}><Icon fontSize='small' component={MonetizationOnOutlinedIcon} /> Sort by Amount</MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Divider />

                <TableContainer  >
                    <Table sx={{ minWidth: 650 }} aria-label="recent purchases table">
                        <TableHead>
                            <TableRow >
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < purchases.length}
                                        checked={purchases.length > 0 && selected.length === purchases.length}
                                        onChange={handleSelectAllClick}
                                        sx={{
                                            color: '#000000',
                                            '&.Mui-checked': {
                                                color: '#000000',
                                            },
                                        }} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Order ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Customer Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#232321', opacity: 0.8 }}>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                paginatedPurchases.length > 0 ?
                                    paginatedPurchases
                                        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                                        .map((purchase) => {
                                            const StatusDot = styled('span')(({ status }) => ({
                                                height: 8,
                                                width: 8,
                                                backgroundColor:
                                                    status === 'Delivered'
                                                        ? '#003F62' // Green for Delivered
                                                        : status === 'Canceled'
                                                            ? '#FFC107' // Orange for Canceled
                                                            : '#E0E0E0', // Default grey
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                marginRight: 8,
                                            }));

                                            const StatusText = styled(Typography)(({ status }) => ({
                                                color:
                                                    status === 'Delivered'
                                                        ? '#003F62'
                                                        : status === 'Canceled'
                                                            ? '#FFC107'
                                                            : '#757575',
                                                fontWeight: 500,
                                            }));
                                            return (
                                                <TableRow key={purchase.id}  sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => navigate(`/admin/orders/${purchase.id}`)}
                                                >
                                                    <TableCell padding='checkbox'>
                                                        <Checkbox
                                                            checked={isSelected(purchase.id)}
                                                            onChange={() => handleClick(purchase.id)}
                                                            sx={{
                                                                color: '#000000',
                                                                '&.Mui-checked': {
                                                                    color: '#000000',
                                                                },
                                                            }} />
                                                    </TableCell>
                                                    <TableCell component='th' scope='row' sx={{ fontSize: '14px', fontWeight: 600, color: '#000000' }}>
                                                        {purchase.product}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#000000', }}>{purchase.orderId}</TableCell>
                                                    <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#000000' }}>{purchase.date}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar alt={purchase.customerName}
                                                                src={purchase.customerAvatar}
                                                                sx={{ width: 24, height: 24, mr: 1 }} />
                                                            {purchase.customerName}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <StatusDot status={purchase.status} />
                                                            <StatusText sx={{ fontSize: '14px', fontWeight: 600, color: '#000000' }} status={purchase.status}>{purchase.status}</StatusText>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: '#000000' }} align="right">{purchase.amount}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    :
                                    <Typography variant='body1' component='p' sx={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#232321',
                                    }}>No Purchases Found</Typography>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box component='div' sx={{
                display: 'flex',
                mt: 2,
            }}>
                <Pagination
                    count={Math.ceil(filteredPurchases.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    shape='rounded'
                    boundaryCount={1}
                    siblingCount={1}
                    variant='outlined'
                    renderItem={(item) => {

                        if (item.type === 'next') {
                            if (page >= Math.ceil(filteredPurchases.length / rowsPerPage)) return null;
                            return (
                                <PaginationItem
                                    {...item}
                                    sx={{
                                        minWidth: 70,
                                        height: 32,
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        border: '1px solid #232321',
                                        color: '#232321',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: '#232321',
                                        },
                                    }}
                                    slots={{
                                        next: () => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
                                                <Typography variant='button' component='p' sx={{ color: '#232321' }} >Next</Typography>
                                                <Icon component={ArrowForwardIosRoundedIcon}
                                                    sx={{
                                                        fontSize: '14px'
                                                    }}
                                                />
                                            </Box>
                                        ),
                                    }}
                                />
                            );
                        }
                        if (item.type === 'previous') {
                            if (page === 1) return null;
                            return (
                                <PaginationItem
                                    {...item}
                                    sx={{
                                        minWidth: 70,
                                        height: 32,
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        border: '1px solid #232321',
                                        color: '#232321',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: '#232321',
                                        },
                                    }}
                                    slots={{
                                        previous: () => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
                                                <Icon component={ArrowBackIosNewRoundedIcon}
                                                    sx={{
                                                        fontSize: '14px'
                                                    }}
                                                />
                                                <Typography variant='button' component='p' sx={{ color: '#232321' }} >Prev</Typography>
                                            </Box>
                                        ),
                                    }}
                                />
                            );
                        }

                        return (
                            <PaginationItem
                                {...item}
                                sx={{
                                    minWidth: 45,
                                    mr: 1,
                                    height: 32,
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: item.selected ? '#FFFFFF' : '#232321',
                                    '&.Mui-selected': {
                                        backgroundColor: '#232321',
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            backgroundColor: '#232321',
                                            color: '#FFFFFF',
                                        },
                                    },
                                    border: '1px solid #232321',
                                    '&:hover': {
                                        backgroundColor: '#232321',
                                        color: '#FFFFFF'
                                    }
                                }}

                            />
                        )
                    }}
                />
            </Box>
        </Box>
    )
}

export default OrderList
