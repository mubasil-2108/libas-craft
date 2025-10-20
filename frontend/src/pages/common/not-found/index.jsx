import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../../services";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const NotFound = () => {
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
                component="video"
                src="/not-found.mp4"
                autoPlay
                muted
                loop
                playsInline
                sx={{
                    width: "80%",
                    height: "80%",
                    objectFit: "contain",
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

export default NotFound;
