// import { Box, Button, Icon, Link, Typography } from '@mui/material'
// import React, { useEffect, useMemo, useState } from 'react'
// import { Outlet, useLocation } from 'react-router-dom';
// import { AdminFooter } from '../../../components/admin';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// import { colors } from '../../../services';
// import { useSelector } from 'react-redux';
// // import { purchases } from '../../../services/utils/constants';


// const Blogs = () => {
//     const location = useLocation();
//     const [isOrderDetail, setIsOrderDetail] = useState(false);
//     const { dateRange } = useSelector((state) => state.order);
//     const capitalize = (str) =>
//         str
//             .split('-')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ');

//     const pathSegments = location.pathname.split('/').filter(Boolean);

//     useEffect(() => {
//         const isDetail =
//             (pathSegments.some(seg => seg.startsWith('order=')) ||
//                 (pathSegments.includes('orders') &&
//                     /^\d+$/.test(pathSegments[pathSegments.length - 1])));

//         setIsOrderDetail(isDetail);
//     }, [pathSegments, location.pathname]);

//     const breadcrumb = pathSegments.map((segment, index) => {
//         if (segment === 'admin') return 'Home';
//         if (segment === 'blogs') return 'Blogs List';

//         // Handle custom "product=ID" segment
//         if (segment.startsWith('blogs=')) {
//             setIsOrderDetail(true);
//             return 'Blog Detail';
//         }
//         if (/^[a-zA-Z0-9]+$/.test(segment) && pathSegments[index - 1] === 'blogs') return 'Blog Details';

//         return capitalize(segment);
//     }).join(' > ');

//     const showAddButton = useMemo(() => !(isProductDetail || isAddNewProduct || isPackageDetail || isAddNewPackage), [isProductDetail, isAddNewProduct, isPackageDetail, isAddNewPackage]);


//     return (
//         <>
//             <Box component='div' sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'end',
//                 flex: 1
//                 // alignItems:'center'
//             }}>
//                 <Box component='div' sx={{
//                     display: 'flex',
//                     justifyContent: 'start',
//                     flexDirection: 'column',
//                     flex: 1
//                 }}>
//                     <Box component='div' sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         m: '0px 15px',
//                         alignItems: 'end',
//                         justifyContent: 'space-between',
//                     }}>
//                         <Box component='div'
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                             }}
//                         >
//                             <Typography component='h3' sx={{
//                                 color: colors.textColor_4,
//                                 fontWeight: 'bold',
//                                 fontSize: '24px'
//                             }}>{isOrderDetail ? breadcrumb.split(' > ')[2] : breadcrumb.split(' > ')[1]}</Typography>
//                             <Typography component='p' sx={{
//                                 color: colors.textColor_4,
//                                 fontWeight: 400,
//                                 fontSize: '16px'
//                             }}>{breadcrumb}</Typography>
//                         </Box>
//                         {showAddButton && (
//                             <Box component={Link} href={isProductsRoute ? '/admin/products/add-new-product' : '/admin/packages/add-new-package'}>
//                                 <Button
//                                     variant='contained'
//                                     startIcon={<AddCircleOutlineOutlinedIcon />}
//                                     sx={{
//                                         color: colors.white,
//                                         backgroundColor: colors.black,
//                                         padding: '10px 15px',
//                                         fontSize: '14px',
//                                         fontWeight: 'bold',
//                                         borderRadius: '8px',
//                                         border: `1px solid ${colors.borderColor_3}`,
//                                         '&:hover': { border: `1px solid ${colors.borderColor_3}` },
//                                     }}
//                                 >
//                                     {isProductsRoute ? 'ADD NEW PRODUCT' : 'ADD NEW PACKAGE'}
//                                 </Button>
//                             </Box>
//                         )}
//                     </Box>
//                     <Box component='main' sx={{
//                         width: '100%',
//                     }}>
//                         <Outlet />
//                     </Box>
//                 </Box>
//                 <AdminFooter />
//             </Box>
//         </>
//     )
// }

// export default Blogs;
import { Box, Button, Link, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminFooter } from '../../../components/admin';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { colors } from '../../../services';

const Blogs = () => {
    const location = useLocation();

    const capitalize = (str) =>
        str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const pathSegments = location.pathname.split('/').filter(Boolean);

    // ✅ Detect Blog Detail Page
    const isBlogDetail = useMemo(() => {
        return (
            pathSegments.includes('blogs') &&
            pathSegments.length > 2
        );
    }, [pathSegments]);

    // ✅ Detect Add Blog Page
    const isAddBlog = location.pathname.includes('add-blog');

    // ✅ Breadcrumb
    const breadcrumb = pathSegments.map((segment, index) => {
        if (segment === 'admin') return 'Home';
        if (segment === 'blogs') return 'Blogs';

        if (segment === 'add-blog') return 'Add Blog';

        if (pathSegments[index - 1] === 'blogs') return 'Blog Details';

        return capitalize(segment);
    }).join(' > ');

    // ✅ Show button only on list page
    const showAddButton = useMemo(() => {
        return !isBlogDetail && !isAddBlog;
    }, [isBlogDetail, isAddBlog]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

            {/* HEADER */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 2,
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            color: colors.textColor_4,
                            fontWeight: 'bold',
                            fontSize: { xs: '18px', md: '24px' }
                        }}
                    >
                        {isBlogDetail
                            ? 'Blog Details'
                            : isAddBlog
                                ? 'Add Blog'
                                : 'Blogs'}
                    </Typography>

                    <Typography
                        sx={{
                            color: colors.textColor_4,
                            fontSize: '14px'
                        }}
                    >
                        {breadcrumb}
                    </Typography>
                </Box>

                {/* ADD BLOG BUTTON */}
                {showAddButton && (
                    <Box
                        component={Link}
                        href="/admin/blogs/add-new-blog"
                        sx={{ textDecoration: 'none' }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            sx={{
                                color: colors.white,
                                backgroundColor: colors.black,
                                px: 2,
                                py: 1,
                                fontSize: '14px',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                border: `1px solid ${colors.borderColor_3}`,
                                '&:hover': {
                                    border: `1px solid ${colors.borderColor_3}`,
                                },
                            }}
                        >
                            ADD NEW BLOG
                        </Button>
                    </Box>
                )}
            </Box>

            {/* MAIN CONTENT */}
            <Box component="main" sx={{ flex: 1, width: '100%' }}>
                <Outlet />
            </Box>

            {/* FOOTER */}
            <AdminFooter />
        </Box>
    );
};

export default Blogs;