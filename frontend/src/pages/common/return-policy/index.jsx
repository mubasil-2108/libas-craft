import React, { useEffect } from 'react'
import { Box, Typography, Divider, Link } from '@mui/material'
import { colors } from '../../../services'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../../../store/slices/settingSlice';

const ReturnPolicy = () => {
  const dispatch = useDispatch();
    const site = useSelector((state) => state.settings.data?.site);
  
    useEffect(() => {
            const fetchSettingsData = async () => {
                await dispatch(fetchSettings());
            }
            fetchSettingsData();
        }, [dispatch]);
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
          Return Policy
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          At <strong>Bin Syed Organics</strong>, customer satisfaction is our priority.
          We aim to provide high-quality products and a smooth shopping experience.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Eligible Returns */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Eligible Returns
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          You may request a return under the following conditions:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {[
            'The product is damaged upon delivery.',
            'The wrong product was delivered.',
            'The item is unused and in its original packaging.',
          ].map((item, index) => (
            <li key={index}>
              <Typography sx={bodyTextStyle}>{item}</Typography>
            </li>
          ))}
        </Box>

        {/* Return Timeframe */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Return Timeframe
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          All return requests must be submitted within <strong>7 days</strong> of the
          delivery date.
        </Typography>

        {/* Non-Returnable Items */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Non-Returnable Items
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {[
            'Used or opened products.',
            'Products damaged due to misuse or improper handling.',
          ].map((item, index) => (
            <li key={index}>
              <Typography sx={bodyTextStyle}>{item}</Typography>
            </li>
          ))}
        </Box>

        {/* Contact */}
        <Typography paragraph sx={bodyTextStyle}>
          To request a return, please contact our support team with your order number.
        </Typography>

        <Typography sx={bodyTextStyle}>
          📧 <strong>Email:</strong>{' '}
          <Link
            href={`mailto:${site?.email}`}
            sx={{
              color: colors.textColor_10,
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {site?.email}
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default ReturnPolicy
