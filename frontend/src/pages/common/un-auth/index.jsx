import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../../services";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const UnAuth = () => {
    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                backgroundColor: colors.white, // optional: makes video pop
            }}
        >
            <Box
                component="img"
                src="/401.svg"
                alt="Not Found"
                sx={{
                    width: { xs: "90%", sm: "60%", md: "40%" },
                    height: "auto",
                    mb: 3,
                }}
            />
            <Button
                startIcon={<Icon component={ArrowBackOutlinedIcon} />}
                onClick={() => window.history.back()}
                sx={{
                    minWidth: "150px",
                    color: colors.textColor_9,
                    fontFamily: "roboto-regular",
                    backgroundColor: colors.greenDark_1,
                    textTransform: "none",
                    fontSize: { xs: "14px", sm: "16px" },
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.2 },
                    borderRadius: "10px",
                    "&:hover": {
                        backgroundColor: colors.greenDark_2,
                    },
                }}
            >
                Go Back
            </Button>
        </Box>
    );
};

export default UnAuth;
