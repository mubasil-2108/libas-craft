import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Fab, Icon, Link, Typography } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header';
import { colors } from '../../../services';
import Footer from '../footer';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NewDealModal from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../../../store/slices/settingSlice';

const ClientLayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { data } = useSelector(state => state.settings);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchSettingsData = async () => {
            await dispatch(fetchSettings());
        }
        fetchSettingsData();
    }, [dispatch]);
    useEffect(() => {
        if (data?.modal) {
            setOpen(true);
        }
    }, [data]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

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
                        <NewDealModal data={data} open={open} handleClose={handleClose} />
                        <Outlet />
                    </Box>
                    <Footer data={data} />
                </Box>
            </Box>
            <Fab size='large'
                onClick={() => {
                    if (data?.social?.whatsapp) {
                        window.open(data.social.whatsapp, '_blank', 'noopener,noreferrer');
                    }
                }}
                sx={{
                    backgroundColor: colors.green,
                    ":hover": {
                        backgroundColor: colors.buttonColor_1
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
