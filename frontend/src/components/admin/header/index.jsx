import { Box, Button, Icon, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const AdminHeader = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleSortClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSortClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box component='div' bgcolor={'#FAFAFA'} maxWidth={'100%'} minHeight={'70px'} sx={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
            pr: '30px',
            gap: 3
        }}>
            <IconButton onClick={() => { }} sx={{
                color: '#000'
            }}>
                <Icon color='#000' component={SearchOutlinedIcon} />
            </IconButton>
            <IconButton onClick={() => { }}>
                <Icon sx={{
                    color: '#000'
                }} component={NotificationsIcon} />
            </IconButton>
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
                <Box sx={{ p: 2, pt:0, pb: 1, display: 'flex', flexDirection: 'column', }}>
                    <Typography variant='h6' component='p' sx={{ color: '#232321', fontWeight: 'bold' }}>Admin</Typography>
                </Box>
                <MenuItem onClick={handleSortClose} sx={{ justifyContent: 'space-between', color: '#232321', fontSize: '14px',  py: 1.5 }}>Change password <Icon fontSize='inherit' sx={{ fontSize: '14px' }} component={ArrowForwardIosOutlinedIcon} /></MenuItem>
                <MenuItem onClick={handleSortClose} sx={{ justifyContent: 'space-between', color: '#232321', fontSize: '14px',  py: 1.5 }}>LOG OUT <Icon fontSize='inherit' sx={{ fontSize: '14px' }} component={LogoutOutlinedIcon} /></MenuItem>
            </Menu>
        </Box>
    )
}

export default AdminHeader
