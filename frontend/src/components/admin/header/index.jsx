import { Box, Button, Icon, IconButton } from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AdminHeader = () => {
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
            <Button variant='outlined' endIcon={<Icon component={KeyboardArrowDownIcon} />}
                sx={{
                    color: '#000',
                    padding: '10px 15px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: '1px solid #000',
                    '&:hover': {
                        color: '#000',
                        border: '1px solid #000',
                    }
                }}
            >ADMIN</Button>
        </Box>
    )
}

export default AdminHeader
