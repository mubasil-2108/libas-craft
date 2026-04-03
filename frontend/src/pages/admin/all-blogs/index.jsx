// import { Box, Divider, Grid, Icon, IconButton, LinearProgress, Pagination, PaginationItem, Typography } from '@mui/material'
// import React, { useCallback, useMemo, useState } from 'react'
// import { ProductTile } from '../../../components/admin';
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
// import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { deleteProduct, getAllProducts, setMainProduct } from '../../../store/slices/productSlice';
// import toast from 'react-hot-toast';
// import { colors } from '../../../services';
// import { BlogCard } from '../../../components/common';

// const AllBlogs = () => {
//     const dispatch = useDispatch();
//     const { blogs, loading, error } = useSelector((state) => state.blog);
//     const [page, setPage] = useState(1);
//     const rowsPerPage = 6;

//     const filterProducts = useMemo(() => {
//         if (selectedCategory === "All" || !selectedCategory) return products;
//         return products.filter(p => p.category === selectedCategory);
//     }, [products, selectedCategory]);

//     useEffect(() => {
//         setPage(1); // reset to first page when category changes
//     }, [selectedCategory]);

//     const handleChangePage = useCallback((event, newPage) => setPage(newPage), []);

//     const startIndex = (page - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;

//     const paginatedProducts = useMemo(() => {
//         // Sort packages: latest first
//         const sortedPackages = [...filterProducts].sort((a, b) => b._id.localeCompare(a._id));
//         return sortedPackages.slice(startIndex, endIndex) || [];
//     }, [filterProducts, startIndex, endIndex]);

//     useEffect(() => {
//         const fetchAllProducts = async () => {
//             await dispatch(getAllProducts())
//                 .catch((error) => {
//                     toast.error(error?.message || 'Failed to fetch products');
//                 });
//         }
//         fetchAllProducts();
//     }, [dispatch]);

//     const handleMainProduct = useCallback(async (id) => {
//         await dispatch(setMainProduct(id))
//             .unwrap()
//             .then((data) => {
//                 if (data?.product?.mainProduct === true) {
//                     toast.success(data?.message);
//                 }
//             })
//             .catch((error) => toast.error(error?.message || 'Failed to set main product'));
//     }, [dispatch]);

//     const handleDeleteProduct = useCallback((id) => {
//         dispatch(deleteProduct(id))
//             .unwrap()
//             .then((data) => {
//                 if (data?.type === 'product/delete-product/fulfilled') {
//                     toast.success(data?.payload?.message);
//                     dispatch(getAllProducts());
//                 }
//             })
//             .catch((error) => toast.error(error?.message || 'Failed to delete product'));
//     }, [dispatch]);

//     return (
//         <Box component='div' sx={{
//             width: '100%',
//             minHeight: '60vh',
//             m: '15px 15px',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between'
//             // position: 'fixed'
//         }}>
//             <Grid container spacing={3}>
//                 {
//                     paginatedProducts.length > 0 ?
//                         paginatedProducts.map((product) => (
//                             <BlogCard key={product._id} handleDeleteProduct={handleDeleteProduct} handleMainProduct={handleMainProduct} product={product} />
//                         ))
//                         :
//                         <Typography variant='body1' component='p' sx={{
//                             fontSize: '16px',
//                             fontWeight: 600,
//                             color: colors.textColor_3,
//                         }}>No Products Found</Typography>
//                 }

//             </Grid>
//             {
//                 page === 1 ? null
//                     :
//                     (
//                         <Box component='div' sx={{
//                             display: 'flex',
//                             mt: 2,
//                         }}>
//                             <Pagination
//                                 count={Math.ceil(products.length / rowsPerPage)}
//                                 page={page}
//                                 onChange={handleChangePage}
//                                 shape='rounded'
//                                 boundaryCount={1}
//                                 siblingCount={1}
//                                 variant='outlined'
//                                 renderItem={(item) => {

//                                     if (item.type === 'next') {
//                                         if (page >= Math.ceil(products.length / rowsPerPage)) return null;
//                                         return (
//                                             <PaginationItem
//                                                 {...item}
//                                                 sx={{
//                                                     minWidth: 70,
//                                                     height: 32,
//                                                     borderRadius: '8px',
//                                                     fontSize: '14px',
//                                                     fontWeight: 600,
//                                                     border: `1px solid ${colors.borderColor_4}`,
//                                                     color: colors.grayDark_1,
//                                                     backgroundColor: colors.transparent,
//                                                     '&:hover': {
//                                                         backgroundColor: colors.transparent,
//                                                         color: colors.grayDark_1,
//                                                     },
//                                                 }}
//                                                 slots={{
//                                                     next: () => (
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
//                                                             <Typography variant='button' component='p' sx={{ color: colors.textColor_3 }} >Next</Typography>
//                                                             <Icon component={ArrowForwardIosRoundedIcon}
//                                                                 sx={{
//                                                                     fontSize: '14px'
//                                                                 }}
//                                                             />
//                                                         </Box>
//                                                     ),
//                                                 }}
//                                             />
//                                         );
//                                     }
//                                     if (item.type === 'previous') {
//                                         if (page === 1) return null;
//                                         return (
//                                             <PaginationItem
//                                                 {...item}
//                                                 sx={{
//                                                     minWidth: 70,
//                                                     height: 32,
//                                                     borderRadius: '8px',
//                                                     fontSize: '14px',
//                                                     fontWeight: 600,
//                                                     border: `1px solid ${colors.borderColor_4}`,
//                                                     color: colors.grayDark_1,
//                                                     backgroundColor: colors.transparent,
//                                                     '&:hover': {
//                                                         backgroundColor: colors.transparent,
//                                                         color: colors.grayDark_1,
//                                                     },
//                                                 }}
//                                                 slots={{
//                                                     previous: () => (
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
//                                                             <Icon component={ArrowBackIosNewRoundedIcon}
//                                                                 sx={{
//                                                                     fontSize: '14px'
//                                                                 }}
//                                                             />
//                                                             <Typography variant='button' component='p' sx={{ color: colors.textColor_3 }} >Prev</Typography>
//                                                         </Box>
//                                                     ),
//                                                 }}
//                                             />
//                                         );
//                                     }

//                                     return (
//                                         <PaginationItem
//                                             {...item}
//                                             sx={{
//                                                 minWidth: 45,
//                                                 mr: 1,
//                                                 height: 32,
//                                                 borderRadius: '8px',
//                                                 fontSize: '14px',
//                                                 fontWeight: 600,
//                                                 color: item.selected ? colors.white : colors.grayDark_1,
//                                                 '&.Mui-selected': {
//                                                     backgroundColor: colors.grayDark_1,
//                                                     color: colors.white,
//                                                     '&:hover': {
//                                                         backgroundColor: colors.grayDark_1,
//                                                         color: colors.white,
//                                                     },
//                                                 },
//                                                 border: `1px solid ${colors.borderColor_4}`,
//                                                 '&:hover': {
//                                                     backgroundColor: colors.grayDark_1,
//                                                     color: colors.white
//                                                 }
//                                             }}

//                                         />
//                                     )
//                                 }}
//                             />
//                         </Box>
//                     )
//             }

//         </Box>
//     )
// }

// export default AllBlogs;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box, Grid, Icon, Pagination, PaginationItem, Typography
} from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, deleteBlog } from '../../../store/slices/blogSlice';
import toast from 'react-hot-toast';
import { colors } from '../../../services';
import { BlogCard } from '../../../components/common';

const AllBlogs = () => {
  const dispatch = useDispatch();

  // ── Pull blog state from Redux ──────────────────────────────────────────
  const { blogs, loading, error, total, pages } = useSelector((state) => state.blog);

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // ── Fetch on mount and whenever page changes ────────────────────────────
  useEffect(() => {
    dispatch(getBlogs({ page, limit: rowsPerPage }))
      .unwrap()
      .catch((err) => toast.error(err || 'Failed to fetch blogs'));
  }, [dispatch, page]);

  // ── Show API-level errors ───────────────────────────────────────────────
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);

  // ── Delete handler ──────────────────────────────────────────────────────
  const handleDeleteBlog = useCallback((id) => {
    dispatch(deleteBlog(id))
      .unwrap()
      .then(() => {
        toast.success('Blog deleted successfully');
        // If we deleted the last item on this page, go back one page
        if (blogs.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        } else {
          dispatch(getBlogs({ page, limit: rowsPerPage }));
        }
      })
      .catch((err) => toast.error(err || 'Failed to delete blog'));
  }, [dispatch, blogs.length, page]);

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        minHeight: '60vh',
        m: { xs: '10px 8px', sm: '15px 15px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      {/* ── Loading skeleton rows ── */}
      {loading && (
        <Grid container spacing={3}>
          {Array.from({ length: rowsPerPage }).map((_, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Box
                sx={{
                  height: 260,
                  borderRadius: 3,
                  bgcolor: 'grey.100',
                  animation: 'pulse 1.4s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.4 },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── Blog grid ── */}
      {!loading && (
        <Grid container spacing={3}>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Grid
                item
                key={blog._id}
                xs={12}   // 1 col  — phones portrait
                sm={6}    // 2 cols — small tablets / landscape phones
                md={4}    // 3 cols — tablets / small laptops
                lg={4}    // 3 cols — desktop
                xl={3}    // 4 cols — wide screens
                sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 4, sm: 5 } }}
              >
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  handleDeleteBlog={handleDeleteBlog}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ fontSize: '16px', fontWeight: 600, color: colors.textColor_3 }}
              >
                No Blogs Found
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {/* ── Pagination — only show when there is more than 1 page ── */}
      {pages > 1 && (
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Pagination
            count={pages}
            page={page}
            onChange={handleChangePage}
            shape="rounded"
            boundaryCount={1}
            siblingCount={1}
            variant="outlined"
            renderItem={(item) => {
              // ── Next button ──
              if (item.type === 'next') {
                if (page >= pages) return null;
                return (
                  <PaginationItem
                    {...item}
                    sx={paginationNavSx}
                    slots={{
                      next: () => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                          <Typography variant="button" sx={{ color: colors.textColor_3 }}>
                            Next
                          </Typography>
                          <Icon component={ArrowForwardIosRoundedIcon} sx={{ fontSize: '14px' }} />
                        </Box>
                      ),
                    }}
                  />
                );
              }

              // ── Previous button ──
              if (item.type === 'previous') {
                if (page === 1) return null;
                return (
                  <PaginationItem
                    {...item}
                    sx={paginationNavSx}
                    slots={{
                      previous: () => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                          <Icon component={ArrowBackIosNewRoundedIcon} sx={{ fontSize: '14px' }} />
                          <Typography variant="button" sx={{ color: colors.textColor_3 }}>
                            Prev
                          </Typography>
                        </Box>
                      ),
                    }}
                  />
                );
              }

              // ── Page number buttons ──
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
                    border: `1px solid ${colors.borderColor_4}`,
                    color: item.selected ? colors.white : colors.grayDark_1,
                    '&.Mui-selected': {
                      backgroundColor: colors.grayDark_1,
                      color: colors.white,
                      '&:hover': {
                        backgroundColor: colors.grayDark_1,
                        color: colors.white,
                      },
                    },
                    '&:hover': {
                      backgroundColor: colors.grayDark_1,
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
  );
};

// ── Shared sx for Prev / Next nav items ──────────────────────────────────────
const paginationNavSx = {
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
};

export default AllBlogs;
