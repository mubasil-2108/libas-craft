import { Avatar, Box, Checkbox, Divider, Icon, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { purchases } from '../../../services/utils/constants';

const OrderList = () => {
    const [selected, setSelected] = useState([]);
    
    const isSelected = (id) => selected.includes(id);

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
                        }}>Change Satus</Typography>
                    </Box>
                    <Box>
                        <Icon component={KeyboardArrowDownRoundedIcon} sx={{ color: '#232321', }} />
                    </Box>
                </Box>
            </Box>
            <Box component='div' sx={{
                width: '95%',
                background: '#FFFFFF',
                display: 'flex',
                p: '20px 20px',
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
                    <Icon fontSize='small' component={MoreVertRoundedIcon} />
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
                                purchases.length > 0 ?
                                    purchases.map((purchase) => {
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
                                            <TableRow key={purchase.id} sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}>
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
        </Box>
    )
}

export default OrderList
