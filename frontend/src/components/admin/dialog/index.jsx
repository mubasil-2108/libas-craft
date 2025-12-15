import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../../services';

export const PDFDialog = ({
    openDialog,
    handleCloseDialog,
    handleSavePDF,
    printRef,
    isPdfSaved,
    selectedOrder,
    sortedOrders,
    subtotal,
    discount,
    shippingRate,
    total,
}) => {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>Order Summary</DialogTitle>
            <DialogContent>
                <Box ref={printRef} sx={{ p: 2, background: '#fff' }}>
                    {/* Order Info */}
                    <Box sx={{ mb: 3, p: 2, background: '#fff', borderRadius: 2, }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Order Information</Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Order ID: <strong>#{selectedOrder?.orderId}</strong></Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Payment Method: <strong>{selectedOrder?.paymentMethod}</strong></Typography>
                        <Typography sx={{ fontSize: 14 }}>Total Payment: <strong>Rs. {selectedOrder?.totalAmount}</strong></Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    {/* Shipping Address */}
                    <Box sx={{ mb: 3, p: 2, background: '#fff', borderRadius: 2, }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Shipping Address</Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>
                            Customer Name: <strong>{selectedOrder?.shippingAddress?.firstName} {selectedOrder?.shippingAddress?.lastName}</strong>
                        </Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Address: <strong>{selectedOrder?.shippingAddress?.address}</strong></Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>City: <strong>{selectedOrder?.shippingAddress?.city}</strong></Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Postal Code: <strong>{selectedOrder?.shippingAddress?.postalCode}</strong></Typography>
                        <Typography sx={{ fontSize: 14 }}>Phone: <strong>{selectedOrder?.shippingAddress?.phone}</strong></Typography>
                    </Box>

                    <Divider sx={{ my: 1 }} />

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
                                            }}
                                            >
                                                <TableCell component='th' scope='row' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>
                                                    <Box component='div' sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}>
                                                        {product?.productName}
                                                    </Box>

                                                </TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}>#{selectedOrder?.orderId}</TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}>{product?.quantity}</TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}></TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}></TableCell>
                                                <TableCell align='center' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}></TableCell>
                                                <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} align="right">Rs. {product?.productPrice}/-</TableCell>
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
            </DialogContent>
            <DialogActions>
                <Button disabled={isPdfSaved} onClick={handleCloseDialog}>Close</Button>
                <Button disabled={isPdfSaved} loading={isPdfSaved} onClick={() => { handleSavePDF() }} variant="contained">
                    Save PDF
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export const InfoDialog = ({
    openInfoDialog,
    handleCloseInfoDialog,
    selectedOrder,
    info
}) => {
    return (
        <Dialog open={openInfoDialog} onClose={handleCloseInfoDialog} maxWidth="md" fullWidth>
            <DialogTitle>{info === 'customer' ? 'Cutomer Information': 'Shipping Details'}</DialogTitle>
            <DialogContent>
                <Box sx={{ p: 2, background: '#fff' }}>
                    {/* Order Info */}
                    <Box sx={{ display: info === 'customer' ? 'block' : 'none', mb: 3, p: 2, background: '#fff', borderRadius: 2, }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Order Information</Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Order ID: <strong>#{selectedOrder?.orderId}</strong></Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Payment Method: <strong>{selectedOrder?.paymentMethod}</strong></Typography>
                        <Typography sx={{ fontSize: 14 }}>Total Payment: <strong>Rs. {selectedOrder?.totalAmount}</strong></Typography>
                    </Box>

                    {/* Shipping Address */}
                    <Box sx={{ display: info === 'shipping' ? 'block' : 'none', mb: 3, p: 2, background: '#fff', borderRadius: 2, }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Shipping Address</Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>
                            Customer Name: <strong>{selectedOrder?.shippingAddress?.firstName} {selectedOrder?.shippingAddress?.lastName}</strong>
                        </Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Address: <strong>{selectedOrder?.shippingAddress?.address}</strong></Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>City: <strong>{selectedOrder?.shippingAddress?.city}</strong></Typography>
                        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Postal Code: <strong>{selectedOrder?.shippingAddress?.postalCode}</strong></Typography>
                        <Typography sx={{ fontSize: 14 }}>Phone: <strong>{selectedOrder?.shippingAddress?.phone}</strong></Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

