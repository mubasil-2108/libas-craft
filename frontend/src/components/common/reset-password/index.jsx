import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Modal,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../store/slices/authSlice";
import { useParams } from "react-router-dom";
import { colors } from "../../../services";
import toast from "react-hot-toast";

const ResetPassword = ({ open, handleClose, resetToken }) => {
    const dispatch = useDispatch();
    //   const { resetToken } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (open) {
            window.history.replaceState(
                null,
                "",
                `/auth/reset-password/${resetToken}`
            );
        }
    }, [open, resetToken]);

    const handleReset = async () => {

        if (!password || password.length < 6) return;
        if (password !== confirmPassword){
            toast.error('Password and Confirm Password do not match');
            return;
        };

        await dispatch(
            resetPassword({ resetToken, password }).then((data) => {
                console.log(data, "data in resetPassword");
            } )
        );

        // if (res?.type === "auth/resetPassword/fulfilled") {
        //     handleClose();
        // }
    };

    return (
        <Modal
            open={open}
            // onClose={handleClose}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Paper sx={{ width: 400, p: 4, borderRadius: 2 }}>
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
                <Typography variant="h6" fontWeight={600} textAlign="center">
                    Reset Password
                </Typography>

                <Box component="form" mt={2}>
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        onClick={handleReset}
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
                        Reset Password
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
};

export default ResetPassword;
