import {
    Box,
    Icon,
    Pagination,
    PaginationItem,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
    colors,
    dummyOrders
} from "../../../services";
import { ClientOrders } from "../../../components/client";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Account = () => {
    const steps = ["Ordered", "Payment", "Confirmation", "Delivery"];

    // Pagination state
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    // Paginated data
    const totalPages = Math.ceil(dummyOrders.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentOrders = dummyOrders.slice(startIndex, startIndex + itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: colors.white,
                px: { xs: 2, sm: 4, md: 8, lg: 12 },
                py: { xs: 2, sm: 4, md: 6 },
                minHeight: "100vh",
            }}
        >
            {/* ✅ Title */}
            <Typography
                sx={{
                    fontFamily: "playfairDisplay",
                    fontSize: { xs: "24px", sm: "32px", md: "42px", lg: "48px" },
                    color: colors.textColor_3,
                    textAlign: { xs: "center", sm: "left" },
                    mb: { xs: 2, sm: 4 },
                    wordBreak: "break-word",
                }}
            >
                Orders
            </Typography>

            {/* ✅ Orders Section */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "20px",
                        width: "100%",
                        maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
                        mx: "auto",
                        gap: { xs: 2, sm: 2.5 },
                    }}
                >
                    {dummyOrders.length > 0 ? (
                        currentOrders.map((item) => (
                            <ClientOrders key={item.id} steps={steps} order={item} />
                        ))
                    ) : (
                        <Typography
                            sx={{
                                fontFamily: "playfairDisplay",
                                fontSize: { xs: "22px", sm: "32px", md: "48px" },
                                color: colors.textColor_3,
                                textAlign: "center",
                                py: 6,
                            }}
                        >
                            No orders found
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* ✅ Pagination */}
            {totalPages > 1 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: { xs: 3, sm: 4 },
                        mb: { xs: 1, sm: 2 },
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChange}
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
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 0.5,
                                                    pl: 1,
                                                    pr: 1,
                                                }}
                                            >
                                                <Icon
                                                    component={ArrowBackIosNewRoundedIcon}
                                                    sx={{ fontSize: "14px" }}
                                                />
                                                <Typography
                                                    variant="button"
                                                    component="p"
                                                    sx={{ fontSize: "13px" }}
                                                >
                                                    Prev
                                                </Typography>
                                            </Box>
                                        ),
                                        next: () => (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 0.5,
                                                    pl: 1,
                                                    pr: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="button"
                                                    component="p"
                                                    sx={{ fontSize: "13px" }}
                                                >
                                                    Next
                                                </Typography>
                                                <Icon
                                                    component={ArrowForwardIosRoundedIcon}
                                                    sx={{ fontSize: "14px" }}
                                                />
                                            </Box>
                                        ),
                                    }}
                                    sx={{
                                        minWidth: item.type === "page" ? 38 : 70,
                                        height: 32,
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color:
                                            item.selected
                                                ? colors.white
                                                : colors.grayDark_1,
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
                                        mx: { xs: 0.5, sm: 1 },
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

export default Account;
