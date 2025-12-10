import { Avatar, Box, Checkbox, Divider, Icon, IconButton, Link, Menu, MenuItem, Pagination, PaginationItem, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
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
import { colors, formatDate, stringAvatar } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllOrders } from '../../../store/slices/orderSlice';

const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, orders } = useSelector((state) => state.order);
    const [selected, setSelected] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [page, setPage] = useState(1);
    const isSelected = (id) => selected.includes(id);
    const [statusAnchorEl, setStatusAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const rowsPerPage = 8;

    const orderList = Array.isArray(orders) ? orders : [];

    useEffect(() => {
        const fetchAllOrders = async () => {
            await dispatch(getAllOrders())
                .catch((error) => {
                    toast.error(error?.message || 'Failed to fetch orders');
                });
        }
        fetchAllOrders();
    }, [dispatch]);

    console.log(orders, "orders");
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

    console.log(orderList, "orderList");
    const filteredPurchases = selectedStatus
        ? orderList.filter(p => p.status === selectedStatus)
        : orderList;
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
            const newSelected = orderList.map((n) => n._id);
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

    const totalPages = useMemo(() => {
            return Math.ceil(filteredPurchases.length / rowsPerPage);
        }, [filteredPurchases.length]);
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
                    background: colors.grayLight_6
                }}>
                    <Box>
                        <Typography component='p' sx={{
                            color: colors.textColor_3,
                            fontSize: '14px',
                            fontWeight: 500,
                        }}>{selectedStatus ? selectedStatus : 'All'}</Typography>
                    </Box>
                    <Box>
                        <IconButton sx={{ color: colors.iconColor_6, }} onClick={handleStatusClick}>
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
                        <MenuItem onClick={() => handleStatusChange(null)} selected={selectedStatus === null} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_7 }} component={FiberManualRecordIcon} /> All</MenuItem>
                        <Divider variant='middle' />
                        <MenuItem onClick={() => handleStatusChange('Delivered')} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_5 }} component={FiberManualRecordIcon} /> Deliverd</MenuItem>
                        <Divider variant='middle' />
                        <MenuItem onClick={() => handleStatusChange('Pending')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_10 }} component={FiberManualRecordIcon} /> Pending</MenuItem>
                        <Divider variant='middle' />
                        <MenuItem onClick={() => handleStatusChange('Canceled')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_8 }} component={FiberManualRecordIcon} /> Cancelled</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Box component='div' sx={{
                width: '95%',
                background: colors.white,
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
                        color: colors.textColor_4,
                        fontSize: '20px',
                        fontWeight: 600
                    }}>Recent Purchases</Typography>
                    <Box component='div'>
                        <IconButton onClick={handleSortClick} sx={{ color: colors.black }}><Icon fontSize='small' component={MoreVertRoundedIcon} /></IconButton>
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
                                        indeterminate={selected.length > 0 && selected.length < orderList.length}
                                        checked={orderList.length > 0 && selected.length === orderList.length}
                                        onChange={handleSelectAllClick}
                                        sx={{
                                            color: colors.black,
                                            '&.Mui-checked': {
                                                color: colors.black,
                                            },
                                        }} />
                                </TableCell>
                                {/* <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Product</TableCell> */}
                                <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Order ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Customer Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Amount</TableCell>
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
                                                        ? colors.primary // Green for Delivered
                                                        : status === 'Canceled'
                                                            ? colors.yellow // Orange for Canceled
                                                            : colors.grayLight_5, // Default grey
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                marginRight: 8,
                                            }));

                                            const StatusText = styled(Typography)(({ status }) => ({
                                                color:
                                                    status === 'Delivered'
                                                        ? colors.primary
                                                        : status === 'Canceled'
                                                            ? colors.yellow
                                                            : colors.gray_1,
                                                fontWeight: 500,
                                            }));
                                            return (
                                                <TableRow key={purchase?._id} sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={(e) => {
                                                        // Prevent navigation if the click is on a checkbox or button inside the row
                                                        if (
                                                            e.target.closest('input[type="checkbox"]') ||
                                                            e.target.closest('button')
                                                        ) return;

                                                        navigate(`/admin/orders/${purchase?._id}`);
                                                    }}
                                                >
                                                    <TableCell padding='checkbox'>
                                                        <Checkbox
                                                            checked={isSelected(purchase?._id)}
                                                            onChange={(e) => {
                                                                e.stopPropagation(); // Prevent row click
                                                                handleClick(purchase?._id);
                                                            }}
                                                            sx={{
                                                                color: colors.black,
                                                                '&.Mui-checked': {
                                                                    color: colors.black,
                                                                },
                                                            }} />
                                                    </TableCell>
                                                    {/* <TableCell component='th' scope='row' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>
                                                        {purchase.product}
                                                    </TableCell> */}
                                                    <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}>#{purchase?.orderId}</TableCell>
                                                    <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>{formatDate(purchase?.createdAt)}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            {/* <Avatar alt={purchase?.customerName}
                                                                src={purchase?.customerAvatar}
                                                                sx={{ width: 24, height: 24, mr: 1 }} /> */}
                                                            <Avatar
                                                                {...stringAvatar(purchase?.shippingAddress?.firstName + " " + purchase?.shippingAddress?.lastName || "Unknown User")}
                                                                sx={{
                                                                    ...stringAvatar(purchase?.shippingAddress?.firstName + " " + purchase?.shippingAddress?.lastName || "Unknown User").sx,
                                                                    width: 30,
                                                                    height: 30,
                                                                    fontSize: '14px',
                                                                }}
                                                            />
                                                            {purchase?.shippingAddress?.firstName} {purchase?.shippingAddress?.lastName}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <StatusDot status={purchase?.status} />
                                                            <StatusText sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} status={purchase.status}>{purchase?.status}</StatusText>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} align="right">Rs. {purchase?.totalAmount}/-</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    :
                                    <Typography variant='body1' component='p' sx={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: colors.textColor_3,
                                    }}>No Purchases Found</Typography>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

         {totalPages > 1 && (
                    <Box component="div" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                            shape="rounded"
                            boundaryCount={1}
                            siblingCount={1}
                            variant="outlined"
                            renderItem={(item) => {
                                if (item.type === "next" && page >= totalPages) return null;
                                if (item.type === "previous" && page === 1) return null;

                                return (
                                    <PaginationItem
                                        {...item}
                                        slots={{
                                            previous: () => (
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, pr: 1 }}>
                                                    <Icon component={ArrowBackIosNewRoundedIcon} sx={{ fontSize: "14px" }} />
                                                    <Typography variant="button" component="p" >
                                                        Prev
                                                    </Typography>
                                                </Box>
                                            ),
                                            next: () => (
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, pr: 1 }}>
                                                    <Typography variant="button" component="p">
                                                        Next
                                                    </Typography>
                                                    <Icon component={ArrowForwardIosRoundedIcon} sx={{ fontSize: "14px" }} />
                                                </Box>
                                            ),
                                        }}
                                        sx={{
                                            minWidth: item.type === "page" ? 45 : 70,
                                            mr: 1,
                                            height: 32,
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: item.selected ? colors.white : colors.grayDark_1,
                                            border: `1px solid ${colors.borderColor_7}`,
                                            "&.Mui-selected": {
                                                backgroundColor: colors.greenDark_3,
                                                color: colors.white,
                                                "&:hover": {
                                                    backgroundColor: colors.greenDark_1,
                                                    color: colors.white,
                                                },
                                            },
                                            "&:hover": {
                                                backgroundColor: colors.greenDark_1,
                                                color: colors.white,
                                            },
                                        }}
                                    />
                                );
                            }}
                        />
                    </Box>
                )}
        </Box>
    )
}

export default OrderList
