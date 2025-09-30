import { Box, Divider, Icon, Typography } from '@mui/material'
import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';
import { colors } from '../../../services';

const AdminFooter = () => {
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
                <Icon component={CopyrightIcon}
                    sx={{
                        color: colors.iconColor_6,
                        fontSize: '14px'
                    }} />
                <Typography component='span' variant='body2' fontSize={'14px'} sx={{ color: colors.textColor_3 }} >2023 All rights reserved</Typography>
            </Box>
        </Box>
    )
}

export default AdminFooter
