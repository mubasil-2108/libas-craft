import { Box } from "@mui/system";
import React, { useCallback, useMemo, useState } from "react";
import { colors } from "../../../services";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {
    Button,
    Icon,
    IconButton,
    Step,
    StepConnector,
    stepConnectorClasses,
    StepLabel,
    Stepper,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserOrders, updateOrderStatus } from "../../../store/slices/orderSlice";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {},
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        borderRadius: 1,
        backgroundColor: "yellow",
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
        backgroundColor: "yellow",
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
        backgroundColor: "green",
    },
}));

const CustomStepIcon = (props) => {
    const { active, completed } = props;
    return (
        <CircleIcon
            sx={{
                fontSize: 20,
                color: completed ? "green" : active ? "yellow" : "yellow",
            }}
        />
    );
};

const ClientOrders = ({ order, steps }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [currentIndex, setCurrentIndex] = useState(0);

    const stepIndex = useMemo(
        () => steps.findIndex((step) => step.toLowerCase() === order?.status?.toLowerCase()),
        [steps, order?.status]
    );

    const totalItems = useMemo(() => order?.orderItems?.length || 0, [order]);
    const hasMultipleItems = useMemo(() => totalItems > 1, [totalItems]);

    const currentItem = useMemo(
        () => order?.orderItems?.[currentIndex],
        [order, currentIndex]
    );

     const handlePrevOrder = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    const handleNextOrder = useCallback(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
    }, [totalItems]);

    const handleNavigate = useCallback(() => {
        navigate(`/collections/${currentItem?.productId}`);
    }, [navigate, currentItem]);

    const handleCancelOrder = useCallback(async () => {
        await dispatch(updateOrderStatus({ orderId: order?._id, status: 'Cancelled' })).unwrap();
        await dispatch(getUserOrders(order?.user));
    }, [dispatch, order]);

    return (
        <Box component='div' sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            width: '100%',
        }}>
            <IconButton onClick={handlePrevOrder} disabled={!hasMultipleItems || currentIndex === 0}>
                <Icon component={ArrowBackIosNewOutlinedIcon} sx={{
                    color:
                        hasMultipleItems && currentIndex > 0
                            ? colors.black
                            : colors.transparent,
                }} />
            </IconButton>
            <Box
                component="div"
                sx={{
                    flexGrow: { xs: 0, sm: 0, md: 1 },
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    cursor: "pointer",
                    alignItems: "center",
                    backgroundColor: colors.grayLight_1,
                    borderRadius: "15px",
                    justifyContent: "space-between",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 3 },
                    gap: { xs: 2, sm: 3 },
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
            >
                <Box component='div'
                    onClick={handleNavigate}
                    sx={{
                        width: '100%',
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: { xs: 2, sm: 3 },
                    }}
                >
                    {/* 🖼️ Image */}
                    <Box
                        component="div"
                        sx={{
                            width: { xs: '80px', sm: '100px', md: '120px' },
                            height: { xs: 80, sm: 100, md: 120 },
                            borderRadius: "15px",
                            overflow: "hidden",
                            flexShrink: 0,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            position: "relative",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', // ✅ centers horizontally & vertically
                        }}
                    >
                        {/* order?.orderItems[currentIndex]?.productPhoto */}
                        <Box component='img' src={`https://www.googleapis.com/drive/v3/files/${currentItem?.productPhoto}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`} sx={{
                            width: { xs: '80px', sm: '100px', md: '120px' },
                            height: { xs: 80, sm: 100, md: 120 },
                            objectFit: 'cover',
                        }} />
                    </Box>

                    {/* 🧾 Product Info */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 1,
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Box sx={{ flex: 1, }}>
                            <Typography
                                sx={{
                                    fontFamily: "inter-regular",
                                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                                    color: colors.textColor_4,
                                    textAlign: { xs: "center", sm: "left" },
                                    flexWrap: "wrap",
                                    textDecoration: 'underline',
                                }}
                            >
                                {order?.orderItems[currentIndex]?.productName}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', flexDirection: { xs: 'row', sm: 'row', md: 'column' }, alignItems: 'center', gap: { xs: 1, sm: 1, md: 0 } }}>
                            <Typography
                                sx={{
                                    fontFamily: "inter-semibold",
                                    fontSize: { xs: "13px", sm: "15px", md: "18px" },
                                    color: colors.textColor_4,
                                    textAlign: "center",
                                }}
                            >
                                Rs.{order?.orderItems[currentIndex]?.total}
                            </Typography>
                            {/* Quantity */}
                            <Typography
                                sx={{
                                    fontFamily: "inter-regular",
                                    fontSize: { xs: "11px", sm: "12px", md: "14px" },
                                    color: colors.textColor_4,
                                    textAlign: "center",
                                }}
                            >
                                Qty: {order?.orderItems[currentIndex]?.quantity}
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                {/* 🪜 Stepper */}
                <Box
                    sx={{
                        width: { xs: "100%", sm: "350px", md: "100%" },
                        mt: { xs: 1, sm: 0 },
                    }}
                >
                    <Stepper
                        activeStep={stepIndex !== -1 ? stepIndex + 1 : 0} // if stepIndex is -1, set activeStep to 0
                        alternativeLabel
                        connector={<CustomConnector />}
                    >
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel
                                    StepIconComponent={CustomStepIcon}
                                    sx={{
                                        "& .MuiStepLabel-label": {
                                            fontSize: { xs: "10px", sm: "12px" },
                                            display: isMobile ? "block" : "block",
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* 🔘 Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "row", sm: "column" },
                        gap: { xs: 1, sm: 2 },
                        width: { xs: "100%", sm: "auto" },
                        justifyContent: "center",
                        alignItems: "center",
                        mt: { xs: 1, sm: 0 },
                    }}
                >
                    {/* Total Amount */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            sx={{
                                fontFamily: "inter-semibold",
                                fontSize: { xs: "13px", sm: "16px", md: "18px" },
                                color: colors.textColor_4,
                                textAlign: "center",
                            }}
                        >
                            Total: Rs.{order?.totalAmount}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleCancelOrder}
                        disabled={order?.status === "Cancelled" || order?.status === "Shipped" || order?.status === "Delivered"}
                        sx={{
                            flex: 1,
                            minWidth: { xs: "120px", sm: "150px" },
                            height: { xs: "35px", sm: "40px" },
                            borderRadius: "10px",
                            color: colors.textColor_4,
                            backgroundColor: colors.buttonColor_3,
                            fontSize: { xs: "11px", sm: "13px", md: "15px" },
                            fontFamily: "inter-regular",
                            textTransform: "none",
                        }}
                    >
                        {order?.status === "Cancelled" ? "Cancelled" : "Cancel Order"}
                    </Button>
                </Box>
            </Box>
            <IconButton onClick={handleNextOrder} disabled={!hasMultipleItems || currentIndex >= totalItems - 1}>
                <Icon component={ArrowForwardIosOutlinedIcon} sx={{
                    color:
                        hasMultipleItems && currentIndex < totalItems - 1
                            ? colors.black
                            : colors.transparent,
                }} />
            </IconButton>
        </Box>

    );
};

export default ClientOrders;
