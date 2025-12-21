import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Fab, Icon, Link, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom';
import Header from '../header';
import { colors } from '../../../services';
import Footer from '../footer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NewDealModal from '../modal';

const ClientLayout = () => {
const [open, setOpen] = useState(false);

  // Open modal when page loads
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <Box component='div' sx={{
            display: 'flex',
            width: '100%',
            minHeight: '100vh',
            background: colors.grayLight_3,
            flexDirection: 'row',
            position: 'relative'
        }}>
            <Box component='div' sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row'
                // minHeight: '100vh',
            }}>
                <Box component='div' sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Header />
                    <Box component='main' sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        // overflowY: 'auto',
                        // padding: '1rem',
                        background: colors.grayLight_3
                    }}>
                        <NewDealModal open={open} handleClose={handleClose} />
                        <Outlet />
                    </Box>
                    <Footer/>
                </Box>
            </Box>
            <Fab size='large' sx={{ 
                backgroundColor:colors.green, 
                ":hover":{
                    backgroundColor:colors.buttonColor_1
                },
                position: 'fixed', 
                bottom: '1rem', 
                right: '1rem'
                 }}>
                <Icon fontSize='large' component={WhatsAppIcon} sx={{ color: colors.iconColor_9 }} />
                </Fab>
        </Box>
    )
}

export default ClientLayout;
