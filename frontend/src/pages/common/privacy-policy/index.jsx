import React, { useEffect } from 'react'
import { Box, Typography, Divider, Link } from '@mui/material'
import { colors, formatPakistaniPhone } from '../../../services'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../../../store/slices/settingSlice';

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const site = useSelector((state) => state.settings.data?.site);

  useEffect(() => {
          const fetchSettingsData = async () => {
              await dispatch(fetchSettings());
          }
          fetchSettingsData();
      }, [dispatch]);
  // 🔹 Reusable styles
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
          Privacy Policy
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          At <strong>Bin Syed Organics</strong>, your privacy is extremely important to us.
          This Privacy Policy explains how we collect, use, and protect your personal
          information when you visit or make a purchase from{' '}
          <Link
            href="https://www.binsyedorganics.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: colors.textColor_10,
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            www.binsyedorganics.com
          </Link>
          .
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Information We Collect */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Information We Collect
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          When you visit our website, we may collect the following information:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {[
            'Personal details such as name, phone number, email address, and shipping address',
            'Order and payment information',
            'Browsing data including IP address, device type, and pages visited',
          ].map((item, index) => (
            <li key={index}>
              <Typography sx={bodyTextStyle}>{item}</Typography>
            </li>
          ))}
        </Box>

        {/* How We Use Your Information */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          How We Use Your Information
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          We use your information for the following purposes:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {[
            'To process and deliver your orders',
            'To contact you regarding orders, inquiries, or customer support',
            'To improve our products, services, and website experience',
            'To send promotional offers only if you have agreed to receive them',
          ].map((item, index) => (
            <li key={index}>
              <Typography sx={bodyTextStyle}>{item}</Typography>
            </li>
          ))}
        </Box>

        {/* Data Protection */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Data Protection
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          We implement strong security measures to protect your personal data. Your
          information is never sold or shared with third parties, except where necessary
          for delivery services or payment processing.
        </Typography>

        {/* Cookies */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Cookies
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          Our website uses cookies to enhance user experience and help us understand
          website performance and usage trends.
        </Typography>

        {/* Your Rights */}
        <Typography gutterBottom sx={sectionTitleStyle}>
          Your Rights
        </Typography>

        <Typography paragraph sx={bodyTextStyle}>
          You have the right to request access to, correction of, or deletion of your
          personal data at any time. To exercise these rights, please contact us using
          the details below.
        </Typography>

        {/* Contact Info */}
        <Box sx={{ mt: 2 }}>
          <Typography sx={bodyTextStyle}>
            📧 <strong>Email:</strong>{' '}
            <Link
              href={`mailto:${site?.email}`}
              sx={{
                color: colors.textColor_10,
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {site?.email}
            </Link>
          </Typography>

          <Typography sx={bodyTextStyle}>
            📞 <strong>WhatsApp:</strong>{' '}
            <Link
              href={`https://wa.me/${site?.phone.replace(' ', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: colors.textColor_10,
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {formatPakistaniPhone(site?.phone) || '+92 XXX XXXXXX'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PrivacyPolicy
