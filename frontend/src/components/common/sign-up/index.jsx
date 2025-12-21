import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Divider,
    Stack,
    Modal,
    InputAdornment,
    IconButton,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { colors } from '../../../services';

const SignUp = ({ open, handleClose, setSignInOpen }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (open) {
            window.history.replaceState(null, '', '/auth/sign-up');
        } else {
            window.history.replaceState(null, '', '/');
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="signup-modal-title"
            aria-describedby="signup-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: 450,
                    p: 4,
                    borderRadius: 4,
                    background: `linear-gradient(45deg, ${colors.greenDark_2}, ${colors.greenLight_2})`,
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                }}
            >
                {/* Logo */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Box
                        component="img"
                        src="/logo-1.png"
                        onClick={() => (window.location.href = '/')}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            maxWidth: '120px',
                            cursor: 'pointer',
                        }}
                    />
                </Box>

                <form>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            placeholder="Enter your Name"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="Enter your Email"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            placeholder="Create Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowConfirmPassword(prev => !prev)
                                            }
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '50px',
                                height: 50,
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '2px solid',
                                boxShadow: `inset 0 0 0 0 ${colors.greenDark_1}`,
                                transition: 'all 0.5s ease-out',
                                '&:hover': {
                                    boxShadow: `inset 0 -100px 0 0 ${colors.greenDark_2}`,
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            Sign Up
                        </Button>

                        <Typography textAlign="center" variant="body2">
                            Already have an account?{' '}
                            <Typography
                                onClick={() => {
                                    handleClose();
                                    setSignInOpen(true)
                                }}
                                component="span"
                                sx={{ color: 'white', cursor: 'pointer' }}
                            >
                                Sign In
                            </Typography>
                        </Typography>

                        <Divider sx={{ my: 1 }}>Or With</Divider>

                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                borderRadius: '50px',
                                height: 50,
                                borderColor: colors.borderColor_3,
                                color: colors.textColor_4,
                            }}
                        >
                            Google
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default SignUp;
