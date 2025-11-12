import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
    Icon,
    ClickAwayListener,
    Slider,
    TextField,
    MenuItem,
    Popper,
    Paper,
    Drawer,
    PaginationItem,
    Pagination,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../../services/utils/color";
import ProductTile from "../../../components/client/product-tile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { FilterSortDrawer } from "../../../components/client/drawer";
import { dummyCatalog } from "../../../services";

const Catalog = () => {
    // const products = [1, 2, 3, 4, 5, 6, 7];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const [page, setPage] = useState(1);
    const rowsPerPage = 6; // show 6 products per page

    // Calculate paginated products
    const paginatedProducts = dummyCatalog.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const totalPages = Math.ceil(dummyCatalog.length / rowsPerPage);

    const [priceRange, setPriceRange] = useState([20, 80]);
    const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortOption, setSortOption] = useState("Default");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openSort = Boolean(anchorEl);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const handlePriceChange = (_, newValue) => setPriceRange(newValue);

    const handleMinChange = (e) => {
        const newMin = Number(e.target.value);
        setPriceRange([Math.min(newMin, priceRange[1]), priceRange[1]]);
    };

    const handleMaxChange = (e) => {
        const newMax = Number(e.target.value);
        setPriceRange([priceRange[0], Math.max(newMax, priceRange[0])]);
    };

    const handleSortClick = (event) =>
        setAnchorEl(anchorEl ? null : event.currentTarget);

    const handleSortClose = (option) => {
        if (option) setSortOption(option);
        setAnchorEl(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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
                    Products
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
                        {dummyCatalog.length} products
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
                            {dummyCatalog.length} products
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
                    {paginatedProducts.map((item) => (
                        <ProductTile key={item.id} item={item} />
                    ))}
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
    );
};

export default Catalog;
