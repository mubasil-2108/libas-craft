import { Box, Button, Icon, Link, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminFooter } from '../../../components/admin'
import { Outlet, useLocation } from 'react-router-dom'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { colors } from '../../../services';

const Products = () => {
    const location = useLocation();
    const [isProductDetail, setIsProductDetail] = useState(false);
    const [isAddNewProduct, setIsAddNewProduct] = useState(false);
    const [isPackageDetail, setIsPackageDetail] = useState(false);
    const [isAddNewPackage, setIsAddNewPackage] = useState(false);

    const capitalize = useCallback((str) =>
        str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        []
    );

   const pathSegments = useMemo(() => location.pathname.split('/').filter(Boolean), [location.pathname]);

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
    const breadcrumb = useMemo(() => {
        return pathSegments.map((segment, index) => {
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
    }, [pathSegments, capitalize]);

    const showAddButton = useMemo(() => !(isProductDetail || isAddNewProduct || isPackageDetail || isAddNewPackage), [isProductDetail, isAddNewProduct, isPackageDetail, isAddNewPackage]);
    const isProductsRoute = useMemo(() => location.pathname.includes('products'), [location.pathname]);

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
