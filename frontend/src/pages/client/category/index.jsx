import { Box, Grid, Icon, Pagination, PaginationItem, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { colors } from '../../../services'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../store/slices/productSlice';
import CategoryTile from '../../../components/client/category-tile';

const Category = () => {

    const dispatch = useDispatch();
    const { isLoading, products } = useSelector((state) => state.product);
    const [page, setPage] = useState(1);
    const rowsPerPage = 6; // show 6 products per page

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // Categories
    const categories = useMemo(() => {
        if (!products) return [];

        const uniqueCategories = [
            ...new Set(products.map((p) => p.category?.trim())),
        ];

        return uniqueCategories;
    }, [products]);

    const handleChangePage = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    const paginatedCategories = useMemo(() => {
        return categories.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
        );
    }, [categories, page]);

    const totalPages = useMemo(() => {
        return Math.ceil(categories.length / rowsPerPage);
    }, [categories, rowsPerPage]);

    return (
        <Box
            sx={{
                backgroundColor: colors.white,
                px: { xs: 2, sm: 4, md: 10 },
                py: { xs: 2, sm: 4, md: 6 },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* Title */}
                <Typography
                    sx={{
                        fontFamily: "playfairDisplay",
                        fontSize: { xs: "32px", sm: "48px", md: "64px" },
                        color: colors.textColor_3,
                        textAlign: { xs: "center", sm: "left" },
                        mb: { xs: 2, sm: 4 },
                    }}
                >
                    All Categories
                </Typography>
            </Box>
            <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 4 }}
                justifyContent="center"
                flexDirection={{xs:'column', sm:'row', md:'row'}}
                alignItems="stretch"
            >
                {paginatedCategories.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <CategoryTile category={item} />
                    </Grid>
                ))}
            </Grid>
            {totalPages > 1 && (
                <Box component="div" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        shape="rounded"
                        boundaryCount={1}
                        siblingCount={1}
                        variant="outlined"
                        renderItem={(item) => {
                            if (item.type === "next" && page >= totalPages) return null;
                            if (item.type === "previous" && page === 1) return null;

                            return (
                                <PaginationItem
                                    {...item}
                                    slots={{
                                        previous: () => (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, pr: 1 }}>
                                                <Icon component={ArrowBackIosNewRoundedIcon} sx={{ fontSize: "14px" }} />
                                                <Typography variant="button" component="p" >
                                                    Prev
                                                </Typography>
                                            </Box>
                                        ),
                                        next: () => (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, pr: 1 }}>
                                                <Typography variant="button" component="p">
                                                    Next
                                                </Typography>
                                                <Icon component={ArrowForwardIosRoundedIcon} sx={{ fontSize: "14px" }} />
                                            </Box>
                                        ),
                                    }}
                                    sx={{
                                        minWidth: item.type === "page" ? 45 : 70,
                                        mr: 1,
                                        height: 32,
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: item.selected ? colors.white : colors.grayDark_1,
                                        border: `1px solid ${colors.borderColor_7}`,
                                        "&.Mui-selected": {
                                            backgroundColor: colors.greenDark_3,
                                            color: colors.white,
                                            "&:hover": {
                                                backgroundColor: colors.greenDark_1,
                                                color: colors.white,
                                            },
                                        },
                                        "&:hover": {
                                            backgroundColor: colors.greenDark_1,
                                            color: colors.white,
                                        },
                                    }}
                                />
                            );
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default Category
