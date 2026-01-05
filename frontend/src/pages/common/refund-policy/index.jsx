import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { colors } from '../../../services'

const RefundPolicy = () => {
  // 🔹 Reusable styles (same across policy pages)
  const titleStyle = {
    color: colors.textColor_10,
    fontSize: { xs: '24px', sm: '32px', md: '48px' },
    fontFamily: 'playfairDisplay',
    fontWeight: 700,
  }

  const sectionTitleStyle = {
    color: colors.textColor_10,
    fontSize: { xs: '18px', sm: '20px', md: '22px' },
    fontFamily: 'playfairDisplay',
    fontWeight: 600,
    mt: 4,
  }

  const bodyTextStyle = {
    color: colors.textColor_4,
    fontSize: { xs: '14px', sm: '16px', md: '18px' },
    fontFamily: 'nunito-sans',
    lineHeight: 1.7,
  }

  return (
    <Box component='div' sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.white,
      px: { xs: 2, sm: 4, md: 10 },
      py: { xs: 2, sm: 4, md: 6 },
      // alignItems: 'center',
    }}>
      <Box
        sx={{
          maxWidth: '900px',
          backgroundColor: colors.white,
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
        }}
      >
        {/* Page Title */}
        <Typography gutterBottom sx={titleStyle}>
          Refund Policy
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          This Refund Policy explains how refunds are processed at{' '}
          <strong>Bin Syed Organics</strong> once a return request has been approved.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Refund Process */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Refund Process
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          Once your return is approved, the following refund terms apply:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {[
            'Refunds are processed within 5–7 working days.',
            'Refunds for Cash on Delivery (COD) orders are issued via bank transfer or store credit.',
            'Shipping charges are non-refundable.',
            'We reserve the right to reject refunds if returned products do not meet our return conditions.',
          ].map((item, index) => (
            <li key={index}>
              <Typography sx={bodyTextStyle}>{item}</Typography>
            </li>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default RefundPolicy
