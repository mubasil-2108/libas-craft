import { Box, Divider, Icon, Typography } from '@mui/material'
import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';

const AdminFooter = () => {
    return (
        <Box component='div' bgcolor={'#E7E7E3'}>
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
                        color: '#232321',
                        fontSize: '14px'
                    }} />
                <Typography component='span' variant='body2' fontSize={'14px'} sx={{ color: '#232321' }} >2023 All rights reserved</Typography>
            </Box>
        </Box>
    )
}

export default AdminFooter
