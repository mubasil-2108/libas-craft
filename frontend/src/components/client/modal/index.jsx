import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, useMediaQuery, useTheme } from "@mui/material";
import { colors } from "../../../services";
import { useNavigate } from "react-router-dom";

const NewDealModal = ({
    open,
    handleClose,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    // Responsive breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="new-deal-title"
            aria-describedby="new-deal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: 400 },
                    bgcolor: colors.greenLight_2,
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 2,
                    textAlign: "center",
                }}
            >
                {/* Image */}
                <Box
                    component="img"
                    src="/watch.jpg"
                    alt="New Deal"
                    sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 2,
                        mb: 2,
                    }}
                />

                <Typography
                    id="new-deal-title"
                    variant="h6"
                    component="h2"
                    sx={{ mb: 1,
                        fontFamily: "cinzel-bold", 
                        fontSize: { xs: "20px", md: "24px" },
                    }}
                >
                    🎉 New Deal Alert!
                </Typography>
                <Typography
                    id="new-deal-description"
                    sx={{ mb: 3,
                        fontFamily: "nunito-sans",
                        fontSize: { xs: "14px", md: "16px" } }}
                >
                    Get 20% off on all electronics today! Limited time offer.
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {
                        navigate('/collections/all')
                        handleClose();
                    }}
                    sx={{
                        backgroundColor: colors.greenDark_1,
                        color: colors.textColor_5,
                        borderRadius: "10px",
                        padding: isMobile ? "10px 15px" : "15px 20px",
                        fontSize: isMobile ? "14px" : "16px",
                        fontFamily: "cinzel-bold",
                        width: isMobile ? "150px" : "200px",
                        "&:hover": {
                            backgroundColor: colors.greenDark_2,
                        },
                    }}
                >
                    Shop Now
                </Button>
            </Box>
        </Modal>
    );
};

export default NewDealModal;
