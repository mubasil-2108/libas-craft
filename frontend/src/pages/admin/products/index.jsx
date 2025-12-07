import { Box, Button, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AdminFooter } from '../../../components/admin'
import { Outlet, useLocation } from 'react-router-dom'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { colors } from '../../../services';

// const Products = () => {
//     const location = useLocation();
//     const [isProductDetail, setIsProductDetail] = useState(false);
//     const [isAddNewProduct, setIsAddNewProduct] = useState(false);
//     const [isAddNewPackage, setIsAddNewPackage] = useState(false);
//     const [isPackageDetail, setIsPackageDetail] = useState(false);
//     const capitalize = (str) =>
//         str
//             .split('-')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ');

//     const pathSegments = location.pathname.split('/').filter(Boolean);

//     useEffect(() => {
//         const lastSegment = pathSegments[pathSegments.length - 1];
//         const secondLastSegment = pathSegments[pathSegments.length - 2];
//         // New product route
//         const isAddNew = lastSegment === 'add-new-product';

//         // Product detail route → either numeric/alpha ID or product=ID
//         const isDetail =
//             !isAddNew &&
//             (lastSegment.startsWith('product=') ||
//                 (/^[a-zA-Z0-9]+$/.test(lastSegment) &&
//                     pathSegments[pathSegments.length - 2] === 'products'));

//         // Packages
//         const addNewPackage = lastSegment === 'add-new-package';
//         const packageDetail =
//             !addNewPackage &&
//             (lastSegment.startsWith('package=') || (/^[a-zA-Z0-9]+$/.test(lastSegment) && secondLastSegment === 'packages'));

//         setIsAddNewProduct(isAddNew);
//         setIsProductDetail(isDetail);
//         setIsAddNewPackage(addNewPackage);
//         setIsPackageDetail(packageDetail);
//     }, [location, setIsAddNewProduct, setIsProductDetail, pathSegments]);

//     const breadcrumb = pathSegments.map((segment, index) => {
//         if (segment === 'admin') return 'Home';
//         if (segment === 'products') return 'All Products';
//         if (segment === 'add-new-product') return 'Add New Product';

//         // Handle custom "product=ID" segment
//         if (segment.startsWith('product=')) {
//             setIsProductDetail(true);
//             return 'Product Detail';
//         }

//         // Fallback for numeric product IDs
//         if (pathSegments[index - 1] === 'products' && /^[a-zA-Z0-9]+$/.test(segment)) {
//             return 'Product Detail';
//         }

//         return capitalize(segment);
//     }).join(' > ');


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
//                             }}>{isProductDetail || isAddNewProduct ? breadcrumb.split(' > ')[2] : breadcrumb.split(' > ')[1]}</Typography>
//                             <Typography component='p' sx={{
//                                 color: colors.textColor_4,
//                                 fontWeight: 400,
//                                 fontSize: '16px'
//                             }}>{breadcrumb}</Typography>
//                         </Box>
//                         {
//                             !isProductDetail && !isAddNewProduct &&
//                             <Box component={Link} href={location.pathname.includes('products') ? '/admin/products/add-new-product' : '/admin/packages/add-new-package'}>
//                                 <Button variant='contained' startIcon={<Icon component={AddCircleOutlineOutlinedIcon} />}
//                                     sx={{
//                                         color: colors.white,
//                                         backgroundColor: colors.black,
//                                         padding: '10px 15px',
//                                         fontSize: '14px',
//                                         fontWeight: 'bold',
//                                         borderRadius: '8px',
//                                         border: `1px solid ${colors.borderColor_3}`,
//                                         '&:hover': {
//                                             border: `1px solid ${colors.borderColor_3}`,
//                                         }
//                                     }}
//                                 >
//                                     {breadcrumb.split(' > ')[1] === 'All Products' ? 'ADD NEW PRODUCT' : 'ADD NEW PACKAGE'}
//                                 </Button>
//                             </Box>
//                         }

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

// export default Products


const Products = () => {
    const location = useLocation();
    const [isProductDetail, setIsProductDetail] = useState(false);
    const [isAddNewProduct, setIsAddNewProduct] = useState(false);
    const [isPackageDetail, setIsPackageDetail] = useState(false);
    const [isAddNewPackage, setIsAddNewPackage] = useState(false);

    const capitalize = (str) =>
        str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const pathSegments = location.pathname.split('/').filter(Boolean);

    useEffect(() => {
        const lastSegment = pathSegments[pathSegments.length - 1];
        const secondLastSegment = pathSegments[pathSegments.length - 2];

        // Products
        const addNewProduct = lastSegment === 'add-new-product';
        const productDetail =
            !addNewProduct &&
            (lastSegment.startsWith('product=') || (/^[a-zA-Z0-9]+$/.test(lastSegment) && secondLastSegment === 'products'));

        // Packages
        const addNewPackage = lastSegment === 'add-new-package';
        const packageDetail =
            !addNewPackage &&
            (lastSegment.startsWith('package=') || (/^[a-zA-Z0-9]+$/.test(lastSegment) && secondLastSegment === 'packages'));

        setIsAddNewProduct(addNewProduct);
        setIsProductDetail(productDetail);
        setIsAddNewPackage(addNewPackage);
        setIsPackageDetail(packageDetail);
    }, [location, pathSegments]);

    // Breadcrumb
    const breadcrumb = pathSegments.map((segment, index) => {
        if (segment === 'admin') return 'Home';
        if (segment === 'products') return 'All Products';
        if (segment === 'packages') return 'All Packages';
        if (segment === 'add-new-product') return 'Add New Product';
        if (segment === 'add-new-package') return 'Add New Package';
        if (segment.startsWith('product=')) return 'Product Detail';
        if (segment.startsWith('package=')) return 'Package Detail';
        if (/^[a-zA-Z0-9]+$/.test(segment) && pathSegments[index - 1] === 'products') return 'Product Detail';
        if (/^[a-zA-Z0-9]+$/.test(segment) && pathSegments[index - 1] === 'packages') return 'Package Detail';
        return capitalize(segment);
    }).join(' > ');

    const showAddButton = !(isProductDetail || isAddNewProduct || isPackageDetail || isAddNewPackage);
    const isProductsRoute = location.pathname.includes('products');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', m: '0px 15px', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ color: colors.textColor_4, fontWeight: 'bold', fontSize: '24px' }}>
                            {breadcrumb.split(' > ').slice(-1)[0]}
                        </Typography>
                        <Typography sx={{ color: colors.textColor_4, fontWeight: 400, fontSize: '16px' }}>
                            {breadcrumb}
                        </Typography>
                    </Box>

                    {showAddButton && (
                        <Box component={Link} href={isProductsRoute ? '/admin/products/add-new-product' : '/admin/packages/add-new-package'}>
                            <Button
                                variant='contained'
                                startIcon={<AddCircleOutlineOutlinedIcon />}
                                sx={{
                                    color: colors.white,
                                    backgroundColor: colors.black,
                                    padding: '10px 15px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    border: `1px solid ${colors.borderColor_3}`,
                                    '&:hover': { border: `1px solid ${colors.borderColor_3}` },
                                }}
                            >
                                {isProductsRoute ? 'ADD NEW PRODUCT' : 'ADD NEW PACKAGE'}
                            </Button>
                        </Box>
                    )}
                </Box>

                <Box component='main' sx={{ width: '100%' }}>
                    <Outlet />
                </Box>
            </Box>
            <AdminFooter />
        </Box>
    );
};

export default Products;
