import { Box, Icon, Pagination, PaginationItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { colors, dummyOrders } from '../../../services'
import { ClientOrders } from '../../../components/client';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

// ✅ Custom Connector with dynamic colors


const Account = () => {
    const steps = ["Ordered", "Payment", "Confirmation", "Delivery"];

    // Pagination state
    const [page, setPage] = useState(1);
    const itemsPerPage = 3; // 👈 change this number to show more/less per page

    // Calculate paginated data
    const totalPages = Math.ceil(dummyOrders.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentOrders = dummyOrders.slice(startIndex, startIndex + itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // optional scroll to top
    };

    return (
        <Box component='div' sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.white,
            px: { xs: 2, sm: 4, md: 10 },
            py: { xs: 2, sm: 4, md: 6 },

            // alignItems: 'center',
        }}>
            <Typography
                sx={{
                    fontFamily: "playfairDisplay",
                    fontSize: { xs: "24px", sm: "32px", md: "48px" },
                    color: colors.textColor_3,
                    textAlign: { xs: "center", sm: "left" },
                    mb: { xs: 2, sm: 4 },
                }}
            >
                Orders
            </Typography>
            <Box component='div' sx={{
                jusptifyContent: 'center',
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 500,
                    borderRadius: '20px',
                    width: 'auto',
                    gap: 1
                    // backgroundColor: colors.grayLight_2
                }}>
                    {dummyOrders.length > 0 ? (
                        currentOrders.map((item) => (
                            <ClientOrders key={item.id} steps={steps} order={item} />
                        ))
                    ) : (
                        <Typography
                            sx={{
                                fontFamily: 'playfairDisplay',
                                fontSize: { xs: '32px', sm: '48px', md: '64px' },
                                color: colors.textColor_3,
                                textAlign: { xs: 'center', sm: 'left' },
                                mb: { xs: 2, sm: 4 },
                            }}
                        >
                            No orders found
                        </Typography>
                    )}
                </Box>
                {totalPages > 1 && (
                    <Box component="div" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
        </Box >
    )
}

export default Account
