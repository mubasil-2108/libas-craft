import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { colors } from '../../../services'
import { Box, Button, ClickAwayListener, Icon, MenuItem, Pagination, PaginationItem, Paper, Popper, Slider, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch, useSelector } from 'react-redux';
import { FilterSortDrawer } from '../../../components/client/drawer';
import ProductTile from '../../../components/client/product-tile';
import { getProductsByCategory } from '../../../store/slices/productSlice';

const ProductsByCategory = () => {
    const { categorySlug } = useParams();
    const CategoryName = decodeURIComponent(categorySlug);
    const theme = useTheme();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    console.log(categorySlug, "categorySlug");
    useEffect(() => {
        const fetchProducts = async () => {
            await dispatch(getProductsByCategory(CategoryName));
        };
        fetchProducts();
    }, [dispatch, CategoryName]);

    const { isLoading, selectedCategoryProducts } = useSelector((state) => state.product);
    console.log(selectedCategoryProducts, "selectedCategoryProducts");
    const [page, setPage] = useState(1);
    const rowsPerPage = 6; // show 6 products per page

    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortOption, setSortOption] = useState("Default");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openSort = Boolean(anchorEl);

    const toggleDrawer = useCallback(
        (open) => (event) => {
            if (
                event.type === "keydown" &&
                (event.key === "Tab" || event.key === "Shift")
            ) {
                return;
            }
            setDrawerOpen(open);
        },
        []
    );

    const handlePriceChange = useCallback((_, newValue) => {
        setPriceRange(newValue);
    }, []);

    const handleMinChange = useCallback((e) => {
        const newMin = Number(e.target.value);
        setPriceRange((prev) => [Math.min(newMin, prev[1]), prev[1]]);
    }, []);

    const handleMaxChange = useCallback((e) => {
        const newMax = Number(e.target.value);
        setPriceRange((prev) => [prev[0], Math.max(newMax, prev[0])]);
    }, []);

    const handleSortClick = useCallback(
        (event) => setAnchorEl(anchorEl ? null : event.currentTarget),
        [anchorEl]
    );


    const handleSortClose = useCallback(
        (option) => {
            if (option) setSortOption(option);
            setAnchorEl(null);
        },
        []
    );

    const handleChangePage = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    // 1) APPLY PRICE FILTER
    const filteredByPrice = useMemo(() => {
        return selectedCategoryProducts.filter((item) => {
            const price = Number(item?.salePrice ? item?.salePrice : item?.regularPrice) || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });
    }, [selectedCategoryProducts, priceRange]);


    // 2) APPLY SORTING
    const sortedProducts = useMemo(() => {
        return [...filteredByPrice].sort((a, b) => {
            const titleA = a?.productName || "";
            const titleB = b?.productName || "";
            const priceA = Number(a?.salePrice ? a?.salePrice : a?.regularPrice) || 0;
            const priceB = Number(b?.salePrice ? b?.salePrice : b?.regularPrice) || 0;

            switch (sortOption) {
                case "Alphabetically: A → Z":
                    return titleA.localeCompare(titleB);
                case "Alphabetically: Z → A":
                    return titleB.localeCompare(titleA);
                case "Price: Low → High":
                    return priceA - priceB;
                case "Price: High → Low":
                    return priceB - priceA;
                case "Newest":
                    return new Date(b?.createdAt || "") - new Date(a?.createdAt || "");
                case "Oldest":
                    return new Date(a?.createdAt || "") - new Date(b?.createdAt || "");
                default:
                    return 0;
            }
        });
    }, [filteredByPrice, sortOption]);
    // Calculate paginated products
    const paginatedProducts = useMemo(() => {
        return sortedProducts.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
        );
    }, [sortedProducts, page]);

    const totalPages = useMemo(() => {
        return Math.ceil(sortedProducts.length / rowsPerPage);
    }, [sortedProducts]);

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
                    '{CategoryName}'
                </Typography>

                {/* ===== MOBILE FILTER BAR ===== */}
                <Box
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: `1px solid ${colors.borderColor}`,
                        borderRadius: "8px",
                        p: 1.5,
                    }}
                >
                    <Box
                        onClick={toggleDrawer(true)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            cursor: "pointer",
                        }}
                    >
                        <Icon fontSize="small" component={TuneIcon} />
                        <Typography
                            sx={{
                                fontFamily: "roboto-regular",
                                fontSize: "14px",
                                color: colors.textColor_1,
                            }}
                        >
                            Filter & Sort
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            color: colors.textColor_1,
                            fontFamily: "roboto-regular",
                            fontSize: "14px",
                        }}
                    >
                        {sortedProducts.length} products
                    </Typography>
                </Box>

                {/* ===== DRAWER FOR MOBILE ===== */}
                <FilterSortDrawer
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                    handleMaxChange={handleMaxChange}
                    handleMinChange={handleMinChange}
                    handlePriceChange={handlePriceChange}
                    priceRange={priceRange}
                    setSortOption={setSortOption}
                    sortOption={sortOption}
                />


                {/* ===== DESKTOP FILTERS ===== */}
                <Box
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    {/* Price Filter */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography
                            sx={{
                                fontFamily: "roboto-regular",
                                fontSize: "16px",
                                color: colors.textColor_1,
                            }}
                        >
                            Filter:
                        </Typography>

                        <ClickAwayListener onClickAway={() => setShowPriceFilter(false)}>
                            <Box sx={{ position: "relative" }}>
                                <Box
                                    onClick={() => setShowPriceFilter(!showPriceFilter)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "roboto-regular",
                                            fontSize: "16px",
                                            textDecoration: "underline",
                                            color: colors.textColor_1,
                                            ":hover": { color: colors.textColor_3 },
                                        }}
                                    >
                                        Price
                                    </Typography>
                                    <Icon
                                        component={ExpandMoreIcon}
                                        sx={{
                                            color: colors.textColor_1,
                                            transform: showPriceFilter ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s ease",
                                        }}
                                    />
                                </Box>

                                {showPriceFilter && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "40px",
                                            left: 0,
                                            backgroundColor: colors.white,
                                            boxShadow: "0px 4px 16px rgba(0,0,0,0.1)",
                                            borderRadius: "12px",
                                            width: { xs: "180px", sm: "220px" },
                                            p: 2,
                                            zIndex: 10,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "roboto-medium",
                                                fontSize: "14px",
                                                mb: 1,
                                                color: colors.textColor_1,
                                            }}
                                        >
                                            Price Range
                                        </Typography>
                                        <Slider
                                            value={priceRange}
                                            onChange={handlePriceChange}
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={100}
                                            sx={{ color: colors.textColor_3 }}
                                        />
                                        <Typography
                                            sx={{
                                                fontFamily: "roboto-regular",
                                                fontSize: "14px",
                                                textAlign: "center",
                                                color: colors.textColor_1,
                                                mb: 2,
                                            }}
                                        >
                                            ${priceRange[0]} – ${priceRange[1]}
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <TextField
                                                label="Min"
                                                size="small"
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={handleMinChange}
                                                sx={{ width: "100%" }}
                                            />
                                            <TextField
                                                label="Max"
                                                size="small"
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={handleMaxChange}
                                                sx={{ width: "100%" }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </ClickAwayListener>
                    </Box>

                    {/* Sort Options */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                            sx={{
                                fontFamily: "roboto-regular",
                                fontSize: "16px",
                                color: colors.textColor_1,
                            }}
                        >
                            Sort by:
                        </Typography>
                        <Button
                            onClick={handleSortClick}
                            endIcon={
                                <ExpandMoreIcon
                                    sx={{
                                        transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            }
                            sx={{
                                textTransform: "none",
                                color: colors.textColor_1,
                                fontFamily: "roboto-regular",
                                fontSize: "16px",
                                textDecoration: "underline",
                                ":hover": { color: colors.textColor_3 },
                            }}
                        >
                            {sortOption}
                        </Button>
                        <Popper
                            anchorEl={anchorEl}
                            open={openSort}
                            placement="bottom-end"
                            sx={{ zIndex: 1300 }}
                        >
                            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                <Paper
                                    sx={{
                                        mt: 1,
                                        p: 1,
                                        px: 2,
                                        width: 250,
                                        borderRadius: "8px",
                                        maxHeight: 400,
                                        overflowY: "auto",
                                    }}
                                >
                                    {[
                                        "Default",
                                        "Alphabetically: A → Z",
                                        "Alphabetically: Z → A",
                                        "Price: Low → High",
                                        "Price: High → Low",
                                        "Newest",
                                        "Oldest",
                                    ].map((option) => {
                                        const isSelected = option === sortOption;
                                        return (
                                            <MenuItem
                                                key={option}
                                                onClick={() => handleSortClose(option)}
                                                sx={{
                                                    fontFamily: "roboto-regular",
                                                    fontSize: "16px",
                                                    color: isSelected
                                                        ? `${colors.white} !important`
                                                        : `${colors.textColor_3}`,
                                                    backgroundColor: isSelected
                                                        ? `${colors.greenDark_1} !important`
                                                        : colors.transparent,
                                                    borderRadius: "8px",
                                                    ":hover": {
                                                        backgroundColor: `${colors.greenLight_2} !important`,
                                                        color: `${colors.textColor_3} !important`,
                                                    },
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        );
                                    })}
                                </Paper>
                            </ClickAwayListener>
                        </Popper>
                        <Typography
                            sx={{
                                ml: { sm: 3, md: 5 },
                                fontFamily: "roboto-regular",
                                fontSize: "16px",
                                color: colors.textColor_1,
                            }}
                        >
                            {sortedProducts.length} products
                        </Typography>
                    </Box>
                </Box>

                {/* ===== PRODUCT GRID ===== */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(3, 1fr)",
                        },
                        gap: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                >
                    {paginatedProducts && paginatedProducts.length > 0 ? paginatedProducts.map((item) => (
                        <ProductTile categorySlug={categorySlug} key={item.id} item={item} />
                    ))
                        : (
                            <Typography
                                sx={{
                                    fontFamily: "roboto-regular",
                                    fontSize: "16px",
                                    color: colors.textColor_1,
                                }}
                            >
                                No products found
                            </Typography>
                        )}
                </Box>

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
        </Box>
    )
}

export default ProductsByCategory
