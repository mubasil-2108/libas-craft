import { Box, Button, Icon, IconButton, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../services'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../../store/slices/authSlice';

const ClientProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [nameSection, setNameSection] = useState(false);
    const [addressSection, setAddressSection] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAddress(user.address);
        }
    }, [user])


    const handleNameSection = useCallback(() => {
        setNameSection(prev => !prev)
    }, [setNameSection]);

    const handleAddressSection = useCallback(() => {
        setAddressSection(prev => !prev)
    }, [setAddressSection]);

    const handleUpdateName = useCallback(async () => {
        await dispatch(updateUser({ name })).then(async (data) => {
            if (data?.type === 'auth/updateUser/fulfilled') {
                setName('');
                await dispatch(getUser());
            }
        })
    }, [name, dispatch]);

    const handleUpdateAddress = useCallback(async () => {
        await dispatch(updateUser({ address })).then(async (data) => {
            if (data?.type === 'auth/updateUser/fulfilled') {
                setAddress('');
                await dispatch(getUser());
            }
        })
    }, [address, dispatch]);

    console.log(user, "user in ClientProfile");
    return (
        <Box component='div' sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.white,
            px: { xs: 2, sm: 4, md: 10 },
            py: { xs: 2, sm: 4, md: 6 },

            // alignItems: 'center',
        }}>
            <Typography
                sx={{
                    fontFamily: "playfairDisplay",
                    fontSize: { xs: "24px", sm: "32px", md: "48px" },
                    color: colors.textColor_3,
                    textAlign: { xs: "center", sm: "left" },
                    mb: { xs: 2, sm: 4 },
                }}
            >
                Profile
            </Typography>
            <Box component='div' sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    p: 2,
                    flexDirection: 'column',
                    width: '100%',
                    borderRadius: '15px',
                    backgroundColor: colors.grayLight_2,
                }}>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                            <Typography component='span'
                                sx={{
                                    color: colors.textColor_4,
                                    fontFamily: 'nunito-sans',
                                    // fontWeight: 'bold',
                                    fontSize: '16px'
                                }}>Name: <strong>{user?.name}</strong></Typography>
                            <IconButton onClick={handleNameSection} size='small' sx={{ color: colors.iconColor_7 }}><Icon fontSize='inherit' sx={{ fontSize: '16px' }} component={BorderColorOutlinedIcon} /></IconButton>
                        </Box>
                        {
                            nameSection && (
                                <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                    <TextField variant='outlined' label='Full Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        size='small' />
                                    <Button variant='contained' onClick={handleUpdateName}>Save</Button>
                                </Box>
                            )
                        }
                    </Box>
                    <Typography sx={{
                        color: colors.textColor_4,
                        fontFamily: 'nunito-sans',
                        // fontWeight: 'bold',
                        fontSize: '16px'
                    }}>Email: <strong>{user?.email}</strong></Typography>

                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                            <Typography component='span' sx={{
                                color: colors.textColor_4,
                                fontFamily: 'nunito-sans',
                                // fontWeight: 'bold',
                                fontSize: '16px'
                            }}>Address: <strong>{user?.address}</strong></Typography>
                            <IconButton onClick={handleAddressSection} size='small' sx={{ color: colors.iconColor_7 }}><Icon fontSize='inherit' sx={{ fontSize: '16px' }} component={BorderColorOutlinedIcon} /></IconButton>
                        </Box>
                        {
                            addressSection && (
                                <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '300px' }}>
                                    <TextField variant='outlined' label='Address' placeholder='Lorem Ipsum'
                                        multiline
                                        rows={4}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        size='small' />
                                    <Button variant='contained' onClick={handleUpdateAddress}>Save</Button>
                                </Box>
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ClientProfile
