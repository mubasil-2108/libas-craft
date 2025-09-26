import { Box, Button, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AdminFooter } from '../../../components/admin'
import { Outlet, useLocation } from 'react-router-dom'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const Products = () => {
    const location = useLocation();
    const [isProductDetail, setIsProductDetail] = useState(false);
    const [isAddNewProduct, setIsAddNewProduct] = useState(false);
    const capitalize = (str) =>
        str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const pathSegments = location.pathname.split('/').filter(Boolean);

    useEffect(() => {
        const lastSegment = pathSegments[pathSegments.length - 1];

        // New product route
        const isAddNew = lastSegment === 'add-new-product';

        // Product detail route → either numeric/alpha ID or product=ID
        const isDetail =
            !isAddNew &&
            (lastSegment.startsWith('product=') ||
                (/^[a-zA-Z0-9]+$/.test(lastSegment) &&
                    pathSegments[pathSegments.length - 2] === 'products'));

        setIsAddNewProduct(isAddNew);
        setIsProductDetail(isDetail);
    }, [location]);

    const breadcrumb = pathSegments.map((segment, index) => {
        if (segment === 'admin') return 'Home';
        if (segment === 'products') return 'All Products';
        if (segment === 'add-new-product') return 'Add New Product';

        // Handle custom "product=ID" segment
        if (segment.startsWith('product=')) {
            setIsProductDetail(true);
            return 'Product Detail';
        }

        // Fallback for numeric product IDs
        if (pathSegments[index - 1] === 'products' && /^[a-zA-Z0-9]+$/.test(segment)) {
            return 'Product Detail';
        }

        return capitalize(segment);
    }).join(' > ');


    return (
        <>
            <Box component='div' sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                flex: 1
                // alignItems:'center'
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    <Box component='div' sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        m: '0px 15px',
                        justifyContent: 'space-between',
                    }}>
                        <Box component='div'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography component='h3' sx={{
                                color: '#000000',
                                fontWeight: 'bold',
                                fontSize: '24px'
                            }}>{isProductDetail || isAddNewProduct ? breadcrumb.split(' > ')[2] : breadcrumb.split(' > ')[1]}</Typography>
                            <Typography component='p' sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: '16px'
                            }}>{breadcrumb}</Typography>
                        </Box>
                        {
                            !isProductDetail && !isAddNewProduct &&
                            <Box component={Link} href='/admin/products/add-new-product'>
                                <Button variant='contained' startIcon={<Icon component={AddCircleOutlineOutlinedIcon} />}
                                    sx={{
                                        color: '#fff',
                                        backgroundColor: '#000000',
                                        padding: '10px 15px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        border: '1px solid #000000',
                                        '&:hover': {
                                            border: '1px solid #000000',
                                        }
                                    }}
                                >
                                    ADD NEW PRODUCT
                                </Button>
                            </Box>
                        }

                    </Box>
                    <Box component='main' sx={{
                        width: '100%',
                    }}>
                        <Outlet />
                    </Box>
                </Box>
                <AdminFooter />
            </Box>
        </>
    )
}

export default Products
