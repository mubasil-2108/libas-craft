import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { colors } from '../../../services';

const CategoryTile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      component="div"
      sx={{
        position: 'relative',
        width: isMobile ? '100%' : isTablet ? '300px' : '350px',
        minHeight: isMobile ? '140px' : isTablet ? '160px' : '200px',
        maxHeight: isMobile ? '180px' : '220px',
        borderRadius: '15px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        },
        '&:hover .overlay': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="/bedroom.jpg"
        alt="Bedroom"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />

      {/* Overlay */}
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '15px',
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? 1 : 2,
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.4s ease',
          p: isMobile ? 1.5 : 2,
        }}
      >
        {/* Title */}
        <Typography
          variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'}
          sx={{
            color: colors.textColor_7,
            fontFamily: 'cinzel-decorative',
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: 1,
          }}
        >
          Bedroom
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenDark_1,
            color: colors.textColor_5,
            borderRadius: '10px',
            padding: isMobile ? '6px 12px' : isTablet ? '8px 16px' : '10px 20px',
            fontSize: isMobile ? '12px' : isTablet ? '13px' : '14px',
            fontFamily: 'cinzel-bold',
            width: isMobile ? '90px' : isTablet ? '110px' : '120px',
            '&:hover': {
              backgroundColor: colors.greenDark_2,
            },
          }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryTile;
