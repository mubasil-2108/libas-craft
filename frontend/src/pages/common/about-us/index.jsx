import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { colors } from '../../../services'

const AboutUs = () => {
    // 🔹 Reusable styles (same across all pages)
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
                    About Us
                </Typography>

                <Typography paragraph sx={bodyTextStyle}>
                    <strong>Bin Syed Organics</strong> is a trusted Pakistani brand dedicated to
                    providing natural, organic, and herbal hair and skincare solutions. Our mission
                    is to revive traditional herbal beauty remedies while maintaining modern quality
                    and safety standards.
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Why Choose Us */}
                <Typography gutterBottom sx={sectionTitleStyle}>
                    Why Choose Bin Syed Organics?
                </Typography>

                <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                    {[
                        '100% organic and herbal ingredients',
                        'Chemical-free formulations',
                        'Safe for all hair and skin types',
                        'Affordable prices with premium quality',
                        'Trusted by thousands of customers across Pakistan',
                    ].map((item, index) => (
                        <li key={index}>
                            <Typography sx={bodyTextStyle}>{item}</Typography>
                        </li>
                    ))}
                </Box>

                {/* Vision */}
                <Typography gutterBottom sx={sectionTitleStyle}>
                    Our Vision
                </Typography>

                <Typography paragraph sx={bodyTextStyle}>
                    To become Pakistan’s leading organic hair care and skincare brand by promoting
                    healthy beauty solutions without harmful chemicals, while building trust and
                    long-term relationships with our customers.
                </Typography>

                {/* Products */}
                <Typography gutterBottom sx={sectionTitleStyle}>
                    Our Products
                </Typography>

                <Typography paragraph sx={bodyTextStyle}>
                    We specialize in a wide range of organic and herbal beauty products, including:
                </Typography>

                <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                    {[
                        'Organic Hair Oils',
                        'Herbal Shampoos',
                        'Natural Face Washes',
                        'Hair Growth and Anti-Hair Fall Solutions',
                    ].map((item, index) => (
                        <li key={index}>
                            <Typography sx={bodyTextStyle}>{item}</Typography>
                        </li>
                    ))}
                </Box>

                <Typography paragraph sx={bodyTextStyle}>
                    Every product is carefully formulated to deliver visible results while ensuring
                    safety, purity, and long-term benefits.
                </Typography>

                {/* Highlights */}
                <Divider sx={{ my: 3 }} />

                <Typography sx={bodyTextStyle}>
                    📍 <strong>Nationwide Delivery Available Across Pakistan</strong>
                </Typography>
                <Typography sx={bodyTextStyle}>
                    📞 <strong>Customer Support Available 24/7</strong>
                </Typography>
            </Box>
        </Box>
    )
}

export default AboutUs
