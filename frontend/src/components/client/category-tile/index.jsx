// import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
// import React from 'react'
// import { colors } from '../../../services'

// const CategoryTile = () => {
//     const theme = useTheme();

//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//     const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
//     return (
//         <Box component='div' sx={{
//             position: 'relative',
//             maxWidth: '400px',
//             minHeight: '200px',
//             overflow: 'hidden',
//             cursor: 'pointer',
//             borderRadius: '15px',
//             '&:hover .overlay': {
//                 opacity: 1,
//                 transform: 'translateY(0)',
//             },
//         }}>
//             <Box
//                 component="img"
//                 src="/bedroom.jpg"
//                 alt="Bedroom"
//                 sx={{
//                     width: '100%',
//                     height: '100%',
//                     orderRadius: '15px',
//                     objectFit: 'cover',
//                     transition: 'transform 0.4s ease',
//                     '&:hover': {
//                         transform: 'scale(1.05)',
//                     },
//                 }}
//             />

//             <Box
//                 className="overlay"
//                 sx={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     // height: '100%',
//                     minHeight: '200px',
//                     orderRadius: '15px',
//                     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: 2,
//                     opacity: 0,
//                     transform: 'translateY(20px)',
//                     transition: 'all 0.4s ease',
//                 }}
//             >
//                 <Typography
//                     variant="h3"
//                     sx={{
//                         color: colors.textColor_7,
//                         fontFamily: "cinzel-decorative",
//                         fontWeight: 100,
//                     }}
//                 >
//                     Bedroom
//                 </Typography>
//                 <Button variant='contained' sx={{
//                     backgroundColor: colors.greenDark_1,
//                     color: colors.textColor_5,
//                     borderRadius: "10px",
//                     padding: isMobile ? "10px 15px" : "10px 10px",
//                     fontSize: isMobile ? "12px" : "14px",
//                     fontFamily: "cinzel-bold",
//                     width: isMobile ? "100px" : "120px",
//                     "&:hover": {
//                         backgroundColor: colors.greenDark_2,
//                     },
//                 }}>Explore</Button>
//             </Box>
//             {/* <Typography
//                 variant="h3"
//                 sx={{
//                     color: colors.textColor_7,
//                     fontFamily: "cinzel-decorative",
//                     fontWeight: 100,
//                 }}
//             >
//                 Bedroom
//             </Typography>
//             <Button variant='contained' sx={{
//                 backgroundColor: colors.greenDark_1,
//                 color: colors.textColor_5,
//                 borderRadius: "10px",
//                 padding: isMobile ? "10px 15px" : "10px 10px",
//                 fontSize: isMobile ? "12px" : "14px",
//                 fontFamily: "cinzel-bold",
//                 width: isMobile ? "100px" : "120px",
//                 "&:hover": {
//                     backgroundColor: colors.greenDark_2,
//                 },
//             }}>Explore</Button> */}
//         </Box>
//     )
// }

// export default CategoryTile

import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { colors } from '../../../services';

const CategoryTile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      component="div"
      sx={{
        position: 'relative',
        maxWidth: '350px',
        minHeight: '150px',
        maxHeight: '200px',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '15px',
        '&:hover .overlay': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      }}
    >
      {/* ✅ Fixed typo: `orderRadius` → `borderRadius` */}
      <Box
        component="img"
        src="/bedroom.jpg"
        alt="Bedroom"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          objectFit: 'cover',
          transition: 'transform 0.4s ease',
        }}
      />

      {/* Overlay Content */}
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.4s ease',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h3'}
          sx={{
            color: colors.textColor_7,
            fontFamily: 'cinzel-decorative',
            fontWeight: 100,
            textAlign: 'center',
          }}
        >
          Bedroom
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenDark_1,
            color: colors.textColor_5,
            borderRadius: '10px',
            padding: isMobile ? '8px 14px' : '10px 18px',
            fontSize: isMobile ? '12px' : '14px',
            fontFamily: 'cinzel-bold',
            width: isMobile ? '100px' : '120px',
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
