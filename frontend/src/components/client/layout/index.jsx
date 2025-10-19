import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Icon, Link, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom';
import Header from '../header';
import { colors } from '../../../services';
import Footer from '../footer';

const ClientLayout = () => {

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
                        <Outlet />
                    </Box>
                    <Footer/>
                </Box>
            </Box>
        </Box>
    )
}

export default ClientLayout;
