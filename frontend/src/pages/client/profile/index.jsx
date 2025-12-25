


import { Box, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../../services'

const ClientProfile = () => {
    return (
        <Box component='div' sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.white,
            px: { xs: 2, sm: 4, md: 10 },
            py: { xs: 2, sm: 4, md: 6 },

            // alignItems: 'center',
        }}>
            <Typography
                sx={{
                    fontFamily: "playfairDisplay",
                    fontSize: { xs: "24px", sm: "32px", md: "48px" },
                    color: colors.textColor_3,
                    textAlign: { xs: "center", sm: "left" },
                    mb: { xs: 2, sm: 4 },
                }}
            >
                Profile
            </Typography>
            <Box component='div' sx={{
                jusptifyContent: 'center',
            }}>
            </Box>
        </Box>
    )
}

export default ClientProfile
