import { Box, Divider, Grid, Icon, IconButton, LinearProgress, Pagination, PaginationItem, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { PackageTile, ProductTile } from '../../../components/admin';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts, setMainProduct } from '../../../store/slices/productSlice';
import toast from 'react-hot-toast';
import { colors } from '../../../services';
import { deletePackage, getAllPackages, setMainPackage } from '../../../store/slices/packageSlice';

const AllPackages = () => {
    const dispatch = useDispatch();
    const { packages, } = useSelector((state) => state.packages);

    console.log(packages, "packages");
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedPackages = useMemo(() => {
    // Sort packages: latest first
    const sortedPackages = [...packages].sort((a, b) => b._id.localeCompare(a._id));
    return sortedPackages.slice(startIndex, endIndex) || [];
}, [packages, startIndex, endIndex]);

    useEffect(() => {
        const fetchAllPackages = async () => {
            await dispatch(getAllPackages())
                .catch((error) => {
                    toast.error(error?.message || 'Failed to add product');
                });
        }
        fetchAllPackages();
    }, [dispatch]);

    const handleMainProduct = async (id) => {
        await dispatch(setMainPackage(id))
            .unwrap()
            .then((data) => {
                if (data?.package?.mainPackage === true) {
                    toast.success(data?.message);
                    // dispatch(getAllPackages());
                }
            })
            .catch((error) => {
                toast.error(error?.message || 'Failed to set main product');
                console.error("Set Main Package Error:", error);
            })
    }

     const handleDeletePackage = (id) => {
            dispatch(deletePackage(id))
                .unwrap()
                .then((data) => {
                    if (data?.type === 'package/delete-package/fulfilled') {
                        toast.success(data?.payload?.message);
                        dispatch(getAllPackages());
                    }
                })
                .catch((error) => {
                    toast.error(error?.message || 'Failed to delete product');
                })
        }

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
            <Grid container spacing={3} >
                {
                    paginatedPackages.length > 0 ?
                        paginatedPackages.map((product) => (
                            <PackageTile key={product?._id} handleDeletePackage={handleDeletePackage} handleMainProduct={handleMainProduct} product={product} />
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
                                count={Math.ceil(packages.length / rowsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                shape='rounded'
                                boundaryCount={1}
                                siblingCount={1}
                                variant='outlined'
                                renderItem={(item) => {

                                    if (item.type === 'next') {
                                        if (page >= Math.ceil(packages.length / rowsPerPage)) return null;
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

export default AllPackages
