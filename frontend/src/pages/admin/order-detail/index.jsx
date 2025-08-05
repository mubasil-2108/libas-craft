import { Box, Chip, Divider, Icon, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React, { useState } from 'react'

const OrderDetail = () => {
    const [selectedStatus, setSelectedStatus] = useState('Delivered');
    const [statusAnchorEl, setStatusAnchorEl] = useState(null);

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

    return (
        <Box component='div' sx={{
            maxWidth: '100%',
            m: '15px 15px',
            // position: 'fixed'
        }}>
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
                    flexDirection: 'column',
                    gap:1
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
                                    <MenuItem onClick={() => handleStatusChange('Delivered')} sx={{ gap: 1.5 }} ><Icon fontSize='inherit' sx={{ fontSize: '14px', color: '#003F62' }} component={FiberManualRecordIcon} /> Deliverd</MenuItem>
                                    <Divider variant='middle' />
                                    <MenuItem onClick={() => handleStatusChange('Pending')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: 'rgba(255, 165, 47, 0.8)' }} component={FiberManualRecordIcon} /> Pending</MenuItem>
                                    <Divider variant='middle' />
                                    <MenuItem onClick={() => handleStatusChange('Cancelled')} sx={{ gap: 1.5 }}><Icon fontSize='inherit' sx={{ fontSize: '14px', color: '#FFC107' }} component={FiberManualRecordIcon} /> Cancelled</MenuItem>
                                </Menu>
                            </Box>
                            <IconButton sx={{ background: '#F4F2F2', p: '12px 15px', borderRadius: '10px' }}><Icon fontSize='medium' component={PrintOutlinedIcon} /></IconButton>
                            <IconButton  sx={{ background: '#F4F2F2', p: '12px 15px', borderRadius: '10px' }}><Typography component='p' sx={{ color: '#232321', fontSize: '14px', fontWeight: 500 }}>Save</Typography></IconButton>
                       
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderDetail
