import { Box, Button, Icon, Link, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminFooter } from '../../../components/admin'
import { Outlet, useLocation } from 'react-router-dom'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { colors } from '../../../services';

const Settings = () => {
    const location = useLocation();

    const capitalize = useCallback((str) =>
        str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        []
    );

    const pathSegments = useMemo(() => location.pathname.split('/').filter(Boolean), [location.pathname]);

    // Breadcrumb
    const breadcrumb = useMemo(() => {
        return pathSegments.map((segment) => {
            if (segment === 'admin') return 'Home';
            return capitalize(segment);
        }).join(' > ');
    }, [pathSegments, capitalize]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* <Box sx={{ display: 'flex', flexDirection: 'row', m: '0px 15px', justifyContent: 'space-between' }}> */}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: colors.textColor_4, fontWeight: 'bold', fontSize: '24px' }}>
                        {breadcrumb.split(' > ').slice(-1)[0]}
                    </Typography>
                    <Typography sx={{ color: colors.textColor_4, fontWeight: 400, fontSize: '16px' }}>
                        {breadcrumb}
                    </Typography>
                </Box>
                {/* </Box> */}

                <Box component='main' sx={{ width: '100%' }}>
                    <Outlet />
                </Box>
            </Box>
            <AdminFooter />
        </Box>
    );
};

export default Settings;
