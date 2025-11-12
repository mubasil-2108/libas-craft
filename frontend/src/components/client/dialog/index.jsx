import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Slide,
    Box,
    Typography,
    Divider,
    Radio,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../store/slices/orderSlice";
import { clearCart } from "../../../store/slices/cartSlice";
import toast from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialFormData = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
}

export const ShoppingFormDialog = ({ open, handleCloseCart, handleClose, cartItems, totalAmount }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    const [formData, setFormData] = useState(initialFormData);

    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem("guestId", guestId);
    }

    const [selectedValue, setSelectedValue] = useState("cash-on-delivery");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangePayment = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = async () => {
        if (!cartItems.length) {
            toast.error("Cart is empty!");
            return;
        }

        const orderItems = cartItems.map((item) => ({
            productId: item.id,
            productName: item.name,
            productPhoto: item.image,
            productPrice: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
        }));


        const orderData = {
            user: guestId,
            orderItems,
            shippingAddress: formData,
            totalAmount,
        }

        try {
            await dispatch(createOrder(orderData)).unwrap();
            dispatch(clearCart());
            toast.success("Order placed successfully!");
            setFormData(initialFormData);
            handleClose();
            handleCloseCart();
        } catch (error) {
            console.error("Failed to place order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            scroll="body"
            maxWidth={isMobile ? "xs" : isTablet ? "sm" : "sm"}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: { xs: 1, sm: 2, md: 3 },
                    backgroundColor: colors.white,
                    mx: { xs: 1, sm: 2 },
                },
            }}
        >
            {/* 🟩 Title */}
            <DialogTitle sx={{ pb: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "inter-semibold",
                        textTransform: "uppercase",
                        color: colors.textColor_4,
                        fontSize: { xs: "15px", sm: "16px", md: "18px" },
                    }}
                >
                    Cash on Delivery
                </Typography>
            </DialogTitle>

            <Divider />

            {/* 🟩 Order Summary */}
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: colors.grayLight_2,
                        gap: 1,
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 1.5, sm: 2 },
                        borderRadius: 2,
                    }}
                >
                    {[
                        ["Subtotal", `Rs.${totalAmount.toFixed(2)}`],
                        ["Shipping", "Free"],
                    ].map(([label, value]) => (
                        <Box
                            key={label}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "inter-regular",
                                    fontSize: { xs: "13px", sm: "14px", md: "16px" },
                                    color: colors.textColor_4,
                                }}
                            >
                                {label}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "inter-medium",
                                    fontSize: { xs: "13px", sm: "14px", md: "16px" },
                                    color: colors.textColor_4,
                                }}
                            >
                                {value}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "inter-semibold",
                                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                                color: colors.textColor_4,
                            }}
                        >
                            Total
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "inter-semibold",
                                fontSize: { xs: "15px", sm: "16px", md: "18px" },
                                color: colors.textColor_4,
                            }}
                        >
                            Rs.{totalAmount.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <Divider sx={{ my: 1 }} />

            {/* 🟩 Shipping Method */}
            <DialogTitle sx={{ pb: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "inter-semibold",
                        color: colors.textColor_4,
                        fontSize: { xs: "15px", sm: "16px", md: "18px" },
                    }}
                >
                    Shipping Method
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 2,
                        border: `1px solid ${colors.borderColor_5}`,
                        p: { xs: 1, sm: 1.5 },
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                        <Radio
                            checked={selectedValue === "cash-on-delivery"}
                            onChange={handleChangePayment}
                            size={isMobile ? "small" : "medium"}
                            value="cash-on-delivery"
                            name="radio-buttons"
                            inputProps={{ "aria-label": "cash-on-delivery" }}
                            sx={{
                                color: colors.iconColor_11,
                                "&.Mui-checked": { color: colors.iconColor_11 },
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: "inter-regular",
                                fontSize: { xs: "13px", sm: "14px", md: "16px" },
                                color: colors.textColor_4,
                            }}
                        >
                            Free Shipping
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "inter-semibold",
                            fontSize: { xs: "13px", sm: "14px", md: "16px" },
                            color: colors.textColor_4,
                        }}
                    >
                        Free
                    </Typography>
                </Box>
            </DialogContent>

            <Divider sx={{ my: 1 }} />

            {/* 🟩 Shipping Address Form */}
            <DialogTitle sx={{ pb: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "inter-semibold",
                        color: colors.textColor_4,
                        fontSize: { xs: "15px", sm: "16px", md: "18px" },
                    }}
                >
                    Enter Your Shipping Address
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    mt={1}
                    sx={{
                        "& .MuiTextField-root": {
                            fontSize: { xs: "13px", sm: "14px" },
                        },
                    }}
                >
                    {[
                        ["First Name", "firstName"],
                        ["Last Name", "lastName"],
                        ["Phone Number", "phone"],
                        ["Address", "address", true],
                        ["City", "city"],
                        ["Postal Code", "postalCode"],
                    ].map(([label, name, multiline]) => (
                        <TextField
                            key={name}
                            label={label}
                            name={name}
                            type={name === "phone" || name === "postalCode" ? "tel" : "text"}
                            fullWidth
                            multiline={!!multiline}
                            rows={multiline ? 2 : 1}
                            value={formData[name]}
                            onChange={handleChange}
                            size={isMobile ? "small" : "medium"}
                        />
                    ))}
                </Box>
            </DialogContent>

            {/* 🟩 Actions */}
            <DialogActions
                sx={{
                    pr: { xs: 2, sm: 3 },
                    pb: { xs: 1.5, sm: 2 },
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    onClick={handleClose}
                    sx={{
                        color: colors.textColor_7,
                        fontSize: { xs: "13px", sm: "14px" },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: colors.greenDark_3,
                        "&:hover": { backgroundColor: colors.greenDark_2 },
                        fontSize: { xs: "13px", sm: "14px" },
                    }}
                    onClick={handleSubmit}
                >
                    {`Complete Order - Rs.${totalAmount.toFixed(2)}`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
