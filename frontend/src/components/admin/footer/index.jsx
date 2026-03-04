import { Box, Divider, Icon, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';
import { colors } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../../../store/slices/settingSlice';

const AdminFooter = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.settings);
    useEffect(() => {
        const fetchSettingsData = async () => {
            await dispatch(fetchSettings());
        }
        fetchSettingsData();
    }, [dispatch]);
    return (
        <Box component='div' bgcolor={colors.grayLight_3}>
            <Divider variant='middle' />
            <Box component='div' maxWidth={'100%'} minHeight={'50px'} sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: 1
            }}>
                <Typography component='span' variant='body2' fontSize={'14px'} sx={{ color: colors.textColor_3 }} >
                    © {new Date().getFullYear()} <b>{data?.site?.name}</b>. All rights reserved.
                </Typography>
            </Box>
        </Box>
    )
}

export default AdminFooter
