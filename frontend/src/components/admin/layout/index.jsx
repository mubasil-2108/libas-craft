import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Icon, Link, Typography } from '@mui/material'
import AdminSidebar from '../sidebar';
import AdminHeader from '../header';
import { Outlet } from 'react-router-dom';
import AdminFooter from '../footer';

const AdminLayout = () => {

    return (
        <Box component='div' sx={{
            display: 'flex',
            width: '100%',
            minHeight: '100vh',
            background: '#E7E7E3',
            flexDirection: 'row',
            position: 'relative'
        }}>
            <Box component='div' sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row'
                // minHeight: '100vh',
            }}>
                <AdminSidebar />
                <Box component='div' sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <AdminHeader />
                    <Box component='main' sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        // overflowY: 'auto',
                        padding: '1rem',
                        background: '#E7E7E3'
                    }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLayout;
