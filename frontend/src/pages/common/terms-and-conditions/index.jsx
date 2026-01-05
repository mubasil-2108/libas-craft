import { Box, Divider, Link, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../../services'

const TermsConditions = () => {
  // 🔹 Reusable styles (same as Privacy Policy)
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
          Terms & Conditions
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          By using{' '}
          <strong>
            <Link
              href="https://www.binsyedorganics.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: colors.textColor_10,
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Bin Syed Organics
            </Link>
          </strong>
          , you agree to the following terms and conditions.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Website Use */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Website Use
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {[
            'You must be at least 18 years old to place an order.',
            'All information provided must be accurate and complete.',
            'Misuse, abuse, or fraudulent activity may result in account suspension.',
          ].map((item, index) => (
            <li key={index}>
              <Typography sx={bodyTextStyle}>{item}</Typography>
            </li>
          ))}
        </Box>

        {/* Product Information */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Product Information
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          We strive to display accurate product descriptions. However, slight variations
          in color, packaging, or appearance may occur due to manufacturing or display
          differences.
        </Typography>

        {/* Pricing & Payment */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Pricing & Payment
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {[
            'All prices are listed in Pakistani Rupees (PKR).',
            'Cash on Delivery (COD) and online payment options are available.',
            'Prices may change without prior notice.',
          ].map((item, index) => (
            <li key={index}>
              <Typography sx={bodyTextStyle}>{item}</Typography>
            </li>
          ))}
        </Box>

        {/* Intellectual Property */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Intellectual Property
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          All content on this website, including logos, images, text, graphics, and
          design elements, is the intellectual property of <strong>Bin Syed Organics</strong>.
          Unauthorized use, reproduction, or distribution of any content is strictly
          prohibited without prior written permission.
        </Typography>
      </Box>
    </Box>
  )
}

export default TermsConditions
