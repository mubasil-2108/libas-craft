import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Stack,
  Modal,
  InputAdornment,
  IconButton,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { colors } from '../../../services';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { getUser, loginUser } from '../../../store/slices/authSlice';

const intialState = {
  email: '',
  password: '',
};

const SignIn = ({
  open,
  handleClose,
  setSignUpOpen,
  setForgotPasswordOpen
}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(intialState);
  const previousPathRef = useRef(null);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSignIn = useCallback(async () => {
    await dispatch(loginUser(formData)).then((data) => {
      if (data?.type === 'auth/loginUser/fulfilled') {
        toast.success('User logged in successfully');
        setFormData(intialState);
        handleClose();
      } else {
        toast.error(data?.payload?.message || 'User login failed');
      }
    })
  }, [dispatch, formData, handleClose]);

  const handleGoogleSignIn = useCallback(() => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  }, []);

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
      <IconButton onClick={handleClickShowPassword} edge="end">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  ), [handleClickShowPassword, showPassword]);

  // useEffect(() => {
  //   // save current path
  //   const currentPath = window.location.pathname;
  //   console.log(currentPath, 'current path in sign in modal');
  //   window.history.replaceState(null, '', open ? '/auth/sign-in' : `${currentPath}`);
  // }, [open]);
  useEffect(() => {
    if (open) {
      // save original path only once
      previousPathRef.current = window.location.pathname;

      window.history.replaceState(
        null,
        '',
        '/auth/sign-in'
      );
    } else if (previousPathRef.current) {
      // restore original path
      window.history.replaceState(
        null,
        '',
        previousPathRef.current
      );
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="signin-modal-title"
      aria-describedby="signin-modal-description"
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
          transition: 'background 0.3s ease',
          // ':hover': {
          //   background: 'linear-gradient(45deg, yellow, red)',
          // },
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
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
        <form>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your Email"
              variant="outlined"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              InputProps={{ startAdornment: emailAdornment }}
            />
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              InputProps={{
                startAdornment: passwordStartAdornment,
                endAdornment: passwordEndAdornment,
              }}
            />
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Typography
                variant="body2"
                onClick={() => {
                  // handleClose();
                  setForgotPasswordOpen(true);
                }}
                sx={{ cursor: 'pointer', color: 'white' }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleSignIn}
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
              Sign In
            </Button>

            <Typography textAlign="center" variant="body2">
              Don't have an account?{' '}
              <Typography
                onClick={() => {
                  handleClose();
                  setSignUpOpen(true);
                }}
                component="span"
                sx={{ color: 'white', cursor: 'pointer' }}
              >
                Sign Up
              </Typography>
            </Typography>

            <Divider sx={{ my: 1 }}>Or With</Divider>

            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                borderRadius: '50px', height: 50,
                borderColor: colors.borderColor_3,
                color: colors.textColor_4
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

export default SignIn;
