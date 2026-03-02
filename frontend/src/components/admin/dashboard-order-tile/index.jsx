import { Box, Divider, Icon, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import React, { useState } from 'react'
import { colors } from '../../../services';

const DashboardOrderTile = ({ title, amount, percentage, isCustomerTile, isProductTile, lastMonth, menuItems, onStatusChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleMenuClick = (status) => {
        onStatusChange(status);
        handleClose();
    };

    return (
        <Box component='div' sx={{
            // width: '100%',
            minWidth: '220px',
            padding: '20px',
            backgroundColor: colors.grayLight_1,
            borderRadius: '15px',
            boxShadow: `0 2px 4px ${colors.blackLight_10}`,
        }}>
            <Box component='div' sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography component='h3' sx={{
                        color: colors.textColor_4,
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>{title}</Typography>
                    <IconButton onClick={handleClick} sx={{ color: colors.iconColor_7 }}><Icon fontSize='small' component={MoreVertOutlinedIcon} /></IconButton>
                    {/* Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {
                            menuItems.map((item) => (
                                <MenuItem key={item} onClick={() => handleMenuClick(item)}>{item}</MenuItem>
                            ))
                        }
                    </Menu>
                </Box>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
                        <Box component='div' sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40px',
                            width: '40px',
                            borderRadius: '10px',
                            background: colors.primary
                        }}>
                            <Icon fontSize='medium' sx={{ color: colors.iconColor_9 }} component={LocalMallOutlinedIcon} />
                        </Box>
                        <Typography variant='h4' sx={{ color: colors.textColor_4, fontSize: '16px', fontWeight: 'bold', ml: 1 }}> {isCustomerTile ? "" : isProductTile ? "" : "Rs."}{amount} {isCustomerTile ? amount <= 1 ? "Customer" : "Customers" : isProductTile ? amount <= 1 ? "Product" : "Products" : ""}</Typography>
                    </Box>
                    {
                        isCustomerTile || isProductTile ? null : (
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
                                <Icon fontSize='inherit' sx={{ color: colors.iconColor_6, fontSize: '14px' }} component={percentage > 0 ? ArrowUpwardOutlinedIcon : ArrowDownwardOutlinedIcon} />
                                <Typography variant='body1' sx={{ color: colors.textColor_4, fontSize: '14px', fontWeight: 600 }}>{percentage}%</Typography>
                            </Box>
                        )
                    }
                </Box>
                <Typography component='p' sx={{ color: colors.textColor_4, alignSelf: 'end', opacity: 0.7, fontSize: '12px' }}>{lastMonth}</Typography>
            </Box>
        </Box>
    )
}

export default DashboardOrderTile
