import { Box, Button, Checkbox, Chip, Divider, Grid, Icon, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { productOrders } from '../../../services/utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { colors, formatDate, formatPakistaniPhone } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, updateOrderStatus } from '../../../store/slices/orderSlice';
import { Dialog } from '../../../components/admin';

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, selectedOrder } = useSelector((state) => state.order);
    const [openDialog, setOpenDialog] = useState(false);
    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    const [info, setInfo] = useState('');

    const handleOpenDialog = useCallback(() => setOpenDialog(true), []);
    const handleCloseDialog = useCallback(() => setOpenDialog(false), []);
    const handleOpenInfoDialog = useCallback((info) => {
        setInfo(info);
        setOpenInfoDialog(true)
    }, []);
    const handleCloseInfoDialog = useCallback(() => {
        setOpenInfoDialog(false)
        setInfo('');
    }, []);

    const [isPdfSaved, setIsPdfSaved] = useState(false);
    const [statusAnchorEl, setStatusAnchorEl] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(selectedOrder?.status || null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const printRef = useRef();
    const shippingRate = 0;
    const orderItems = selectedOrder?.orderItems ?? [];
    const discount = orderItems.reduce((acc, item) => {
        if (item.salePrice) return acc + (item.regularPrice - item.salePrice) * item.quantity;
        return acc;
    }, 0);
    const subtotal = useMemo(() => {
        return orderItems.reduce((acc, item) => acc + (Number(item.regularPrice) * Number(item.quantity)), 0);
    }, [orderItems]);
    const total = useMemo(() => subtotal - discount + shippingRate, [subtotal, discount, shippingRate]);



    const sortedOrders = useMemo(() => {
        if (!sortConfig.key) return [...orderItems];
        return [...orderItems].sort((a, b) => {
            if (sortConfig.key === 'product') {
                const nameA = a.productName.toLowerCase();
                const nameB = b.productName.toLowerCase();
                if (nameA < nameB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (nameA > nameB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            }
            if (sortConfig.key === 'amount') {
                const amountA = Number(a.total);
                const amountB = Number(b.total);
                return sortConfig.direction === 'asc' ? amountA - amountB : amountB - amountA;
            }
            return 0;
        });
    }, [orderItems, sortConfig]);

    useEffect(() => {
        const fetchOrderById = async () => {
            // Dispatch an action to fetch product by ID
            await dispatch(getOrderById(id)).then((data) => {
                console.log(data, "data in fetchOrderById")
                if (data?.type === 'order/getOrderById/fulfilled') {
                    setSelectedStatus(data?.payload?.order?.status || null);
                }
            })
                .catch((error) => {
                    console.error(error?.message || 'Failed to fetch Order by ID');
                });
        }
        fetchOrderById();
    }, [dispatch, id]);
    console.log(selectedOrder, "selectedOrder in order detail page");
    const handleSortClick = useCallback((event) => setAnchorEl(event.currentTarget), []);

    const handleSortClose = useCallback(() => setAnchorEl(null), []);
    const handleStatusClick = useCallback((event) => setStatusAnchorEl(event.currentTarget), []);
    const handleStatusClose = useCallback(() => setStatusAnchorEl(null), []);

    const handleStatusChange = useCallback(async (status) => {
        setSelectedStatus(status);
        await dispatch(updateOrderStatus({
            orderId: selectedOrder?._id,
            status,
        }));
        handleStatusClose();
    }, [dispatch, selectedOrder, handleStatusClose]);

    const handleSort = useCallback((key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
        handleSortClose();
    }, [sortConfig, handleSortClose]);



    const handleSavePDF = useCallback(async () => {
        setIsPdfSaved(true);
        const element = printRef.current;

        // Capture the element as canvas
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');

        // jsPDF instance (A4 size in mm)
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Canvas dimensions in pixels
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Convert canvas pixels to PDF mm
        const imgWidth = pdfWidth;
        const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add extra pages if content overflows
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`Order_${selectedOrder?.orderId}.pdf`);

        handleCloseDialog();
        setIsPdfSaved(false);
    }, [selectedOrder, handleCloseDialog]);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    const fullName = useMemo(() => selectedOrder?.shippingAddress?.firstName + ' ' + selectedOrder?.shippingAddress?.lastName, [selectedOrder]);
    const fullAddress = useMemo(() => `${selectedOrder?.shippingAddress?.address}, ${selectedOrder?.shippingAddress?.city}, ${selectedOrder?.shippingAddress?.postalCode}`, [selectedOrder]);
    return (
        <>
            <Box component='div' sx={{
                maxWidth: '100%',
                m: '15px 15px',
            }}>
                <Box component='div' sx={{
                    width: '97%',
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
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <Box component='div' sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: 'row' }}>
                            <Typography component='p' sx={{ color: colors.textColor_3, fontWeight: 700, fontSize: '20px' }}>Orders ID:{' '}
                                <Typography component='span' sx={{ color: colors.textColor_3, fontWeight: 700, fontSize: '20px' }}>#{selectedOrder?.orderId}</Typography>
                            </Typography>
                            <Chip label={selectedOrder?.status} sx={{ background: colors.orangeLight_80, color: colors.textColor_3, borderRadius: '10px', fontSize: '12px', fontWeight: 600 }} />
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
                                    <Icon component={CalendarMonthOutlinedIcon} sx={{ color: colors.iconColor_6, }} />
                                </Box>
                                <Box>
                                    <Typography component='p' sx={{
                                        color: colors.textColor_4,
                                        fontSize: '16px',
                                        fontWeight: 500,
                                    }}>{formatDate(selectedOrder?.createdAt)}</Typography>
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
                                        <MenuItem onClick={() => handleStatusChange('Delivered')} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.green }} component={FiberManualRecordIcon} /> Deliverd</MenuItem>
                                        <Divider variant='middle' />
                                        <MenuItem onClick={() => handleStatusChange('Pending')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_10 }} component={FiberManualRecordIcon} /> Pending</MenuItem>
                                        <Divider variant='middle' />
                                        <MenuItem onClick={() => handleStatusChange('Processing')} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_5 }} component={FiberManualRecordIcon} /> Processing</MenuItem>
                                        <Divider variant='middle' />
                                        <MenuItem onClick={() => handleStatusChange('Shipped')} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_8 }} component={FiberManualRecordIcon} /> Shipped</MenuItem>
                                        <Divider variant='middle' />
                                        <MenuItem onClick={() => handleStatusChange('Cancelled')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: colors.iconColor_2 }} component={FiberManualRecordIcon} /> Cancelled</MenuItem>
                                    </Menu>
                                </Box>
                                <IconButton onClick={handlePrint} sx={{ background: colors.iconBgColor_3, p: '12px 15px', borderRadius: '10px' }}><Icon fontSize='medium' component={PrintOutlinedIcon} /></IconButton>
                                <IconButton loading={isPdfSaved} disabled={isPdfSaved} onClick={handleOpenDialog} sx={{ background: colors.iconBgColor_3, p: '12px 15px', borderRadius: '10px' }}>
                                    {!isPdfSaved && <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '14px', fontWeight: 500 }}>Save</Typography>}
                                </IconButton>
                            </Box>
                        </Box>
                        <Box >
                            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} sx={{gap:2, mt: 2 }}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '280px', borderRadius: '15px', border: `1px solid ${colors.borderColor_5}`, p: '15px 20px' }}>
                                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                            <Box component='div' sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '56px',
                                                width: '56px',
                                                borderRadius: '10px',
                                                background: colors.grayDark_1
                                            }}>
                                                <Icon fontSize='large' sx={{ color: colors.iconColor_9 }} component={PersonOutlinedIcon} />
                                            </Box>
                                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexShrink: 1, gap: 1 }}>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_3, fontSize: '20px', fontWeight: 600 }}>Customer</Typography>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_1, fontSize: '16px', fontWeight: 600 }}>Full Name: {fullName.slice(0, 10).concat('...')}</Typography>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_1, fontSize: '16px', fontWeight: 600 }}>Email: shristi@gmail.com</Typography>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_1, fontSize: '16px', fontWeight: 600 }}>Phone: {formatPakistaniPhone(selectedOrder?.shippingAddress?.phone)}</Typography>

                                            </Box>
                                        </Box>
                                        <Button onClick={() => handleOpenInfoDialog('customer')} variant='contained' sx={{ background: colors.primary, p: '7px 15px', borderRadius: '10px' }}>
                                            <Typography component='p' sx={{ color: colors.textColor_5, fontSize: '14px', fontWeight: 500, textTransform: 'none' }}>View profile</Typography>
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box component='div' sx={{ display: 'flex', minHeight:'175px', flexDirection: 'column', gap: 2, minWidth: '280px', borderRadius: '15px', border: `1px solid ${colors.borderColor_6}`, p: '15px 20px' }}>
                                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                            <Box component='div' sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '56px',
                                                width: '56px',
                                                borderRadius: '10px',
                                                background: colors.grayDark_1
                                            }}>
                                                <Icon fontSize='large' sx={{ color: colors.iconColor_9 }} component={LocalMallOutlinedIcon} />
                                            </Box>
                                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexShrink: 1, gap: 1 }}>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_3, fontSize: '20px', fontWeight: 600 }}>Order Info</Typography>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_1, fontSize: '16px', fontWeight: 600 }}>Shipping: Leoperd</Typography>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_1, fontSize: '16px', fontWeight: 600 }}>Payment Method: {selectedOrder?.paymentMethod === "Cash on Delivery" ? 'COD' : selectedOrder?.paymentMethod}</Typography>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_1, fontSize: '16px', fontWeight: 600 }}>Status: {selectedOrder?.status}</Typography>

                                            </Box>
                                        </Box>
                                        {/* <Button variant='contained' sx={{ background: colors.primary, p: '7px 15px', borderRadius: '10px' }}>
                                            <Typography component='p' sx={{ color: colors.textColor_5, fontSize: '14px', fontWeight: 500, textTransform: 'none' }}>View profile</Typography>
                                        </Button> */}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} >
                                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2, minWidth: '280px', minHeight: '175px', borderRadius: '15px', border: `1px solid ${colors.borderColor_6}`, p: '15px 20px' }}>
                                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                            <Box component='div' sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '56px',
                                                width: '56px',
                                                borderRadius: '10px',
                                                background: colors.grayDark_1
                                            }}>
                                                <Icon fontSize='large' sx={{ color: colors.iconColor_9 }} component={LocalMallOutlinedIcon} />
                                            </Box>
                                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', width: '200px', gap: 1 }}>
                                                <Typography cpmonent='p' sx={{ color: colors.textColor_3, fontSize: '20px', fontWeight: 600 }}>Deliver to</Typography>
                                                <Typography cpmonent='p' sx={{
                                                    color: colors.textColor_1,
                                                    fontSize: '16px', fontWeight: 600,
                                                }}>Address: {fullAddress?.slice(0, 55).concat('...')}</Typography>
                                            </Box>
                                        </Box>
                                        <Button onClick={() => handleOpenInfoDialog('shipping')} variant='contained' sx={{ background: colors.primary, p: '7px 15px', borderRadius: '10px' }}>
                                            <Typography component='p' sx={{ color: colors.textColor_5, fontSize: '14px', fontWeight: 500, textTransform: 'none' }}>View profile</Typography>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>

                {/* Products list */}

                <Box component='div' sx={{
                    width: '97%',
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
                        }}>Products</Typography>
                        <Box component='div'>
                            <IconButton onClick={handleSortClick} sx={{ color: colors.iconColor_7 }}><Icon fontSize='small' component={MoreVertRoundedIcon} /></IconButton>
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
                                    <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8, }}>Product Name</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8, }}>Order ID</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Quantity</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}></TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}></TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}></TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    selectedOrder?.orderItems?.length > 0 ? sortedOrders.map((product) => {
                                        console.log(product, "product in order items map");
                                        return (
                                            <TableRow key={product?.productId} sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                cursor: 'pointer'
                                            }}
                                                onClick={() => navigate(`/admin/products/${product?.productId}`)}
                                            >
                                                <TableCell component='th' scope='row' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>
                                                    <Box component='div' sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}>
                                                        <Box component='img' src={product?.productPhoto ? `https://www.googleapis.com/drive/v3/files/${product?.productPhoto}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}` : '/watch.jpg'}
                                                            sx={{ width: '40px', height: '40px', borderRadius: '10px' }} />
                                                        {product?.productName}
                                                    </Box>

                                                </TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}>#{selectedOrder?.orderId}</TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}>{product?.quantity}</TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}></TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}></TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}></TableCell>
                                                <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} align="right"><Typography sx={{ fontSize: product?.salePrice ? '10px' : '14px', textDecoration: product?.salePrice && 'line-through', fontWeight: 600, color: product?.salePrice ? colors.gray : colors.black }}>Rs. {product?.regularPrice}/-</Typography> {product?.salePrice && `Rs. ${product?.salePrice}/-`}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                        :
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ color: colors.textColor_1, fontSize: '16px' }}>No products found</TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider />
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'end', mt: 4, }}>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                            <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '16px', fontWeight: 600 }}>Subtotal</Typography>
                            <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '16px', fontWeight: 600, ml: 1 }}>Rs. {subtotal.toFixed(2)}</Typography>
                        </Box>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                            <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '16px', fontWeight: 600 }}>Discount</Typography>
                            <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '16px', fontWeight: 600, ml: 1 }}>Rs. {discount.toFixed(2)}</Typography>
                        </Box>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                            <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '16px', fontWeight: 600 }}>Shipping Rate</Typography>
                            <Typography component='p' sx={{ color: colors.textColor_3, fontSize: '16px', fontWeight: 600, ml: 1 }}>Rs. {shippingRate.toFixed(2)}</Typography>
                        </Box>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                            <Typography variant='h4' component='p' sx={{ color: colors.textColor_3, fontWeight: 600 }}>Total</Typography>
                            <Typography variant='h4' component='p' sx={{ color: colors.textColor_3, fontWeight: 600, ml: 1 }}>Rs. {total.toFixed(2)}/-</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <Dialog.InfoDialog
                openInfoDialog={openInfoDialog}
                handleCloseInfoDialog={handleCloseInfoDialog}
                selectedOrder={selectedOrder}
                info={info}
            />
            <Dialog.PDFDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleSavePDF={handleSavePDF}
                printRef={printRef}
                selectedOrder={selectedOrder}
                isPdfSaved={isPdfSaved}
                discount={discount}
                shippingRate={shippingRate}
                subtotal={subtotal}
                total={total}
                sortedOrders={sortedOrders}
            />
        </>

    )
}

export default OrderDetail
