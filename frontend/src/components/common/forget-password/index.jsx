import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Paper,
    Modal,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../store/slices/authSlice";
import { colors } from "../../../services";

const ForgotPassword = ({
    open,
    handleClose,
    setSignUpOpen,
    handleCloseSignIn,
    setResetPasswordOpen
}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    useEffect(() => {
        if (open) {
            window.history.pushState(null, "", "/auth/forgot-password");
        }
        return () => {
            window.history.pushState(null, "", "/");
        };
    }, [open]);

    const handleForgotPassword = async () => {
        if (!email) return;

        setLoading(true);

        await dispatch(forgetPassword(email)).then((data) => {
            if (data?.type === 'auth/forgetPassword/fulfilled') {
                setLoading(false);
                // setResetPasswordOpen(true);
            } else {
                setLoading(false);
            }
            console.log(data, "data in handleForgotPassword");
        })
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="forgot-modal-title"
            aria-describedby="forgot-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 400,
                        width: "100%",
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Box component='div' sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                              <Box component='img' onClick={() => window.location.href = '/'} src='/logo-1.png' sx={{
                                display: { xs: 'none', md: 'flex' },
                                objectFit: 'contain',
                                maxWidth: '120px',
                                alignSelf: 'center',
                                cursor: 'pointer',
                                pointerEvents: 'auto',
                              }} />
                            </Box>
                    {/* Title */}
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        textAlign="center"
                        mb={2}
                    >
                        Forgot Password
                    </Typography>

                    {/* Form */}
                    <Box component="form">
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            error={email && !isValidEmail}
                            helperText={
                                email && !isValidEmail ? "Enter a valid email address" : ""
                            }
                            required
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            onClick={handleForgotPassword}
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                py: 1.5,
                                color: colors.textColor_5,
                                backgroundColor: colors.buttonColor_1,
                                "&:hover": {
                                    backgroundColor: colors.buttonColor_5,
                                },
                            }}
                        >
                            {loading ? "Sending..." : "Send Email"}
                        </Button>
                    </Box>

                    {/* Footer */}
                    <Typography
                        variant="body2"
                        textAlign="center"
                        mt={2}
                        fontWeight={500}
                    >
                        Don&apos;t have an account?{" "}
                        <Box
                            component="span"
                            fontWeight={700}
                            sx={{ cursor: "pointer",  color: colors.textColor_10, "&:hover": { textDecoration: "underline", color: colors.textColor_7 } }}
                            onClick={() => {
                                handleClose();
                                handleCloseSignIn();
                                setSignUpOpen(true);
                            }}
                        >
                            Sign up now
                        </Box>
                    </Typography>
                </Paper>
            </Box>
        </Modal>
    );
};

export default ForgotPassword;
