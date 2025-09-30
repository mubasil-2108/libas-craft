import { Box, Divider, Grid, Icon, IconButton, LinearProgress, Pagination, PaginationItem, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { dummyProducts } from '../../../services/utils/constants';
import { ProductTile } from '../../../components/admin';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../../../store/slices/productSlice';
import toast from 'react-hot-toast';
import { colors } from '../../../services';

const AllProducts = () => {
    const dispatch = useDispatch();
    const { isLoading, products, selectedCategory } = useSelector((state) => state.product);
    // console.log('Products from Redux Store:', products);
    console.log('Selected Category:', selectedCategory);
    const [page, setPage] = useState(1);
    const rowsPerPage = 12;

    const filterProducts = useMemo(() => {
        if (selectedCategory === "All" || !selectedCategory) return products;
        return products.filter(p => p.category === selectedCategory);
    }, [products, selectedCategory]);

    useEffect(() => {
        setPage(1); // reset to first page when category changes
    }, [selectedCategory]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedProducts = useMemo(() => {
        return filterProducts.slice(startIndex, endIndex) || [];
    }, [filterProducts, startIndex, endIndex]);

    console.log('Filtered Products:', paginatedProducts);

    useEffect(() => {
        const fetchAllProducts = async () => {
            await dispatch(getAllProducts())
                .catch((error) => {
                    toast.error(error?.message || 'Failed to add product');
                });
        }
        fetchAllProducts();
    }, [dispatch]);

    return (
        <Box component='div' sx={{
            width: '100%',
            minHeight: '60vh',
            m: '15px 15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
            // position: 'fixed'
        }}>
            <Grid container spacing={3}>
                {
                    paginatedProducts.length > 0 ?
                        paginatedProducts.map((product) => (
                            <ProductTile key={product._id} product={product} />
                        ))
                        :
                        <Typography variant='body1' component='p' sx={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: colors.textColor_3,
                        }}>No Products Found</Typography>
                }

            </Grid>
            {
                page === 1 ? null
                    :
                    (
                        <Box component='div' sx={{
                            display: 'flex',
                            mt: 2,
                        }}>
                            <Pagination
                                count={Math.ceil(products.length / rowsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                shape='rounded'
                                boundaryCount={1}
                                siblingCount={1}
                                variant='outlined'
                                renderItem={(item) => {

                                    if (item.type === 'next') {
                                        if (page >= Math.ceil(products.length / rowsPerPage)) return null;
                                        return (
                                            <PaginationItem
                                                {...item}
                                                sx={{
                                                    minWidth: 70,
                                                    height: 32,
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                    border: `1px solid ${colors.borderColor_4}`,
                                                    color: colors.grayDark_1,
                                                    backgroundColor: colors.transparent,
                                                    '&:hover': {
                                                        backgroundColor: colors.transparent,
                                                        color: colors.grayDark_1,
                                                    },
                                                }}
                                                slots={{
                                                    next: () => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
                                                            <Typography variant='button' component='p' sx={{ color: colors.textColor_3 }} >Next</Typography>
                                                            <Icon component={ArrowForwardIosRoundedIcon}
                                                                sx={{
                                                                    fontSize: '14px'
                                                                }}
                                                            />
                                                        </Box>
                                                    ),
                                                }}
                                            />
                                        );
                                    }
                                    if (item.type === 'previous') {
                                        if (page === 1) return null;
                                        return (
                                            <PaginationItem
                                                {...item}
                                                sx={{
                                                    minWidth: 70,
                                                    height: 32,
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                    border: `1px solid ${colors.borderColor_4}`,
                                                    color: colors.grayDark_1,
                                                    backgroundColor: colors.transparent,
                                                    '&:hover': {
                                                        backgroundColor: colors.transparent,
                                                        color: colors.grayDark_1,
                                                    },
                                                }}
                                                slots={{
                                                    previous: () => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
                                                            <Icon component={ArrowBackIosNewRoundedIcon}
                                                                sx={{
                                                                    fontSize: '14px'
                                                                }}
                                                            />
                                                            <Typography variant='button' component='p' sx={{ color: colors.textColor_3 }} >Prev</Typography>
                                                        </Box>
                                                    ),
                                                }}
                                            />
                                        );
                                    }

                                    return (
                                        <PaginationItem
                                            {...item}
                                            sx={{
                                                minWidth: 45,
                                                mr: 1,
                                                height: 32,
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                color: item.selected ? colors.white : colors.grayDark_1,
                                                '&.Mui-selected': {
                                                    backgroundColor: colors.grayDark_1,
                                                    color: colors.white,
                                                    '&:hover': {
                                                        backgroundColor: colors.grayDark_1,
                                                        color: colors.white,
                                                    },
                                                },
                                                border: `1px solid ${colors.borderColor_4}`,
                                                '&:hover': {
                                                    backgroundColor: colors.grayDark_1,
                                                    color: colors.white
                                                }
                                            }}

                                        />
                                    )
                                }}
                            />
                        </Box>
                    )
            }

        </Box>
    )
}

export default AllProducts
