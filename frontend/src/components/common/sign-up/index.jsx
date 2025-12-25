import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, registerUser } from '../../../store/slices/authSlice';
import toast from 'react-hot-toast';

const intialState = {
    name: '',
    email: '',
    password: '',
};

const SignUp = ({ open, handleClose, setSignInOpen }) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState(intialState);
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const togglePassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const toggleConfirmPassword = useCallback(() => {
        setShowConfirmPassword(prev => !prev);
    }, []);

    const handleSignUp = useCallback(async () => {
        // e.preventDefault();
        console.log(formData);

        if (formData.password !== confirmedPassword) {
            toast.error('Passwords do not match');
            return;
        }

        await dispatch(registerUser(formData)).then((data) => {
            if (data?.type === 'auth/registerUser/fulfilled') {
                toast.success('User registered successfully');
                setFormData(intialState);
                setConfirmedPassword('');
                handleClose();
                setSignInOpen(true);
            } else {
                toast.error(data?.payload?.message || 'User registration failed');
            }
        })
    }, [dispatch, formData, confirmedPassword, handleClose, setSignInOpen]);

    const handleGoogleSignIn = useCallback(async () => {
        window.open('http://localhost:5000/api/auth/google', '_self');
    }, []);


    const nameAdornment = useMemo(() => (
        <InputAdornment position="start">
            <PersonOutlineIcon />
        </InputAdornment>
    ), []);

    const emailAdornment = useMemo(() => (
        <InputAdornment position="start">
            <MailOutlineIcon />
        </InputAdornment>
    ), []);

    const passwordStartAdornment = useMemo(() => (
        <InputAdornment position="start">
            <LockOutlinedIcon />
        </InputAdornment>
    ), []);

    const passwordEndAdornment = useMemo(() => (
        <InputAdornment position="end">
            <IconButton onClick={togglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    ), [showPassword, togglePassword]);

    const confirmPasswordEndAdornment = useMemo(() => (
        <InputAdornment position="end">
            <IconButton onClick={toggleConfirmPassword} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    ), [showConfirmPassword, toggleConfirmPassword]);

    useEffect(() => {
        window.history.replaceState(null, '', open ? '/auth/sign-up' : '/');
    }, [open]);

    useEffect(() => {
        dispatch(getUser()).then((data) => {
            if (data?.type === 'auth/getUser/fulfilled') {
                toast.success(
                    data?.payload?.name === 'LibasCraft'
                        ? 'Admin, Welcome Back'
                        : `${data?.payload?.name} Welcome Back`
                );
            }
        });
    }, [dispatch]);

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
                            value={formData.name}
                            onChange={
                                (e) => setFormData({ ...formData, name: e.target.value })
                            }
                            InputProps={{ startAdornment: nameAdornment }}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="Enter your Email"
                            variant="outlined"
                            value={formData.email}
                            onChange={
                                (e) => setFormData({ ...formData, email: e.target.value })
                            }
                            InputProps={{ startAdornment: emailAdornment }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            placeholder="Create Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.password}
                            onChange={
                                (e) => setFormData({ ...formData, password: e.target.value })
                            }
                            InputProps={{
                                startAdornment: passwordStartAdornment,
                                endAdornment: passwordEndAdornment,
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                            InputProps={{
                                startAdornment: passwordStartAdornment,
                                endAdornment: confirmPasswordEndAdornment,
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={handleSignUp}
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
                            onClick={handleGoogleSignIn}
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
