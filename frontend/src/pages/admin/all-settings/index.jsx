import React, { useCallback, useRef, useState } from 'react'
import { colors } from '../../../services'
import { Box, Button, Collapse, Icon, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FaSnapchat, FaTiktok } from "react-icons/fa6";
import InstagramIcon from '@mui/icons-material/Instagram';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Admin } from '../../../components/admin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../../store/slices/authSlice';
import { clearSettingsState, fetchSettings, updateDealModal, updateNote, updateSiteSettings, updateSocialLinks, upsertSettings } from '../../../store/slices/settingSlice';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { Form } from 'react-router-dom';

const settingsList_2 = [
    { id: 1, title: 'Terms and Conditions' },
    { id: 2, title: 'Privacy Policy' },
    { id: 3, title: 'Refund Policy' },
    { id: 4, title: 'Cancellation Policy' },
    { id: 5, title: 'Return Policy' },
    { id: 6, title: 'FAQ' },
    { id: 7, title: 'Contact Us' },
];

const newDealInitialState = {
    headline: '',
    description: '',
    images: [],
};

const soialLinkInitialState = {
    facebook: '',
    instagram: '',
    tiktok: '',
    snapchat: '',
    whatsapp: '',
};

const siteDataInitialState = {
    images: [],
    name: '',
    headline: '',
    description: '',
    keywords: [], // For SEO
    address: '',
    email: '',
    phone: '',
};

const initialState = {
    social: soialLinkInitialState,
    dealModal: newDealInitialState,
    siteSettings: siteDataInitialState,
    note: '',
}

const AllSetting = () => {
    const logoInputRef = useRef(null);
    const dealModalInputRef = useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { error, data } = useSelector(state => state.settings);
    const [openSection, setOpenSection] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        const init = async () => {
            const userRes = await dispatch(getUser());

            if (userRes?.payload?.role !== 'admin') return;

            const settingsRes = await dispatch(fetchSettings());

            if (
                settingsRes.type === 'setting/fetchSettings/fulfilled' &&
                !settingsRes.payload?.data
            ) {
                await dispatch(upsertSettings(initialState));
                return;
            }

            const settings = settingsRes.payload?.data;
            setFormData({
                siteSettings: {
                    name: settings?.site?.name || '',
                    headline: settings?.site?.headline || '',
                    description: settings?.site?.description || '',
                    keywords: settings?.site?.keywords || [],
                    address: settings?.site?.address || '',
                    email: settings?.site?.email || userRes?.payload?.email || '',
                    phone: settings?.site?.phone || '',
                    images: [],
                },

                dealModal: {
                    headline: settings?.modal?.headline || '',
                    description: settings?.modal?.description || '',
                    images: [],
                },

                social: {
                    whatsapp: settings?.social?.whatsapp || '',
                    facebook: settings?.social?.facebook || '',
                    snapchat: settings?.social?.snapchat || '',
                    tiktok: settings?.social?.tiktok || '',
                    instagram: settings?.social?.instagram || '',
                },

                note: settings?.note || '',
            });
        };

        init();
    }, [dispatch]);

    const displayedLogo = useMemo(() => {
        return formData.siteSettings.images.length > 0
            ? formData.siteSettings.images[0].preview
            : data?.site?.logo?.id
                ? `https://www.googleapis.com/drive/v3/files/${data.site.logo.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                : '/watch.jpg';
    }, [data, formData.siteSettings]);

    const displayedDealModal = useMemo(() => {
        return formData.dealModal.images.length > 0
            ? formData.dealModal.images[0].preview
            : data?.modal?.image?.id
                ? `https://www.googleapis.com/drive/v3/files/${data.modal.image.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                : '/watch.jpg';
    }, [data, formData.dealModal]);


    const toggleSection = (section) => {
        setOpenSection(prev => (prev === section ? null : section))
    }

    const handleLogoUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImage = {
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
        };

        setFormData(prev => ({
            ...prev,
            siteSettings: {
                ...prev.siteSettings,
                images: [...prev.siteSettings.images, newImage],
            },
        }));
        setCurrentIndex(0);

    }, [])

    const handleImageUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImage = {
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
        };

        setFormData(prev => ({
            ...prev,
            dealModal: {
                ...prev.dealModal,
                images: [...prev.dealModal.images, newImage],
            },
        }));
        setCurrentIndex(0);

    }, [])

    const handleSiteSettingsChange = useCallback(async () => {
        const { siteSettings } = formData;
        const form = new FormData();
        siteSettings.email = user?.email;

        form.append("name", siteSettings.name);
        form.append("headline", siteSettings.headline);
        form.append("description", siteSettings.description);
        form.append("address", siteSettings.address);
        form.append("phone", siteSettings.phone);
        form.append("email", siteSettings.email);
        formData.siteSettings.keywords.forEach(tag => form.append("keywords[]", tag));
        // append files
        formData.siteSettings.images.forEach((img) => {
            form.append("images", img.file);  // 👈 actual File object
        });
        await dispatch(updateSiteSettings(form)).then(async (data) => {
            if (data?.type === 'setting/updateSiteSettings/fulfilled') {
                dispatch(fetchSettings()).then(() => {
                    dispatch(clearSettingsState());
                })

            }
        })

    }, [dispatch, formData, user]);

    const handleNoteChange = useCallback(async () => {
        const { note } = formData;
        await dispatch(updateNote(note)).then((data) => {
            if (data?.type === 'setting/updateNote/fulfilled') {
                dispatch(fetchSettings()).then(() => {
                    dispatch(clearSettingsState());
                })
            }
        })
    }, [dispatch, formData]);

    const handleSocialLinksChange = useCallback(async () => {
        const { social } = formData;

        await dispatch(updateSocialLinks(social)).then(async (data) => {
            if (data?.type === 'setting/updateSocialLinks/fulfilled') {
                dispatch(fetchSettings()).then(() => {
                    dispatch(clearSettingsState());
                })
            }
        })
    }, [dispatch, formData]);

    const handleDealModalChange = useCallback(async () => {
        const { dealModal } = formData;
        const form = new FormData();
        form.append("headline", dealModal.headline);
        form.append("description", dealModal.description);
        formData.dealModal.images.forEach((img) => {
            form.append("images", img.file);  // 👈 actual File object
        });
        await dispatch(updateDealModal(form)).then(async (data) => {
            if (data?.type === 'setting/updateDealModal/fulfilled') {
                dispatch(fetchSettings()).then(() => {
                    dispatch(clearSettingsState());
                })
            }
        })
    }, [dispatch, formData]);

    const handleCopy = useCallback((text) => {
        if (!text) return;

        navigator.clipboard.writeText(text)
            .then(() => {
                // optional: toast/snackbar
                toast.success("Link copied to clipboard");
            })
            .catch(() => {
                toast.error("Copy failed");
            });
    }, []);

    const siteLogoUrl = useMemo(() => {
        if (!data?.site?.logo?.webViewLink) return data?.site?.logo?.webViewLink;
        return;
    }, [data]);

    const dealModalUrl = useMemo(() => {
        if (!data?.modal?.image?.webViewLink) return data?.modal?.image?.webViewLink;
        return;
    }, [data]);

    return (
        <Box component='div' sx={{
            width: '100%',
            m: '15px 15px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
            // position: 'fixed'
        }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: colors.black }}>General Setting</Typography>

            <Box component='div' sx={{
                width: '95%',
                // height: 'auto',
                background: colors.white,
                display: 'flex',
                p: '20px 20px',
                flexDirection: 'column',
                borderRadius: '20px'
            }}>
                {/* Site settings */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: '14px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                            backgroundColor: colors.grayLight_1,
                        },
                    }}
                    onClick={() => toggleSection('site')}
                >
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: 500,
                            color: colors.black,
                        }}
                    >
                        Site Setting
                    </Typography>

                    <ChevronRightIcon
                        sx={{
                            color: colors.gray,
                            transform: openSection === 'site' ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: '0.3s',
                        }}
                    />
                </Box>
                <Collapse in={openSection === 'site'} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            // justifyContent: 'space-between',
                            p: '14px 16px',
                            gap: 2,
                            borderRadius: '12px',
                            // cursor: 'pointer',
                            // transition: '0.3s',
                        }}
                    >
                        <Box sx={{
                            width: '100%',
                            maxWidth: '200px',
                            aspectRatio: '1 / 1',
                            display: 'flex',
                            position: 'relative',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: colors.grayLight_1,
                            borderRadius: '10px',
                            boxShadow: `0px 2px 2px ${colors.blackLight_20}`,
                        }}
                            onClick={() => logoInputRef.current.click()}
                        >
                            <Box
                                component='img'
                                // formData.images.length > 0 ? formData.images[currentIndex].preview :
                                src={displayedLogo} // Placeholder if no image
                                alt='Preview'
                                sx={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '10px',
                                    opacity: 1
                                }}
                            />
                        </Box>
                        <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleLogoUpload}
                        />
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                            <TextField variant='outlined' label='Site Title'
                                fullWidth
                                value={formData.siteSettings.name}
                                onChange={(e) => setFormData({ ...formData, siteSettings: { ...formData.siteSettings, name: e.target.value } })}
                                size='small' />
                            <TextField variant='outlined' label='Email'
                                fullWidth
                                value={user?.email}
                                InputProps={{
                                    readOnly: true,
                                }}
                                size='small'
                            />
                            <Admin.Tags
                                placeholder="Tags"
                                style={{
                                    maxWidth: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    '&:hover': { border: '1px solid #000' },
                                }}
                                value={formData.siteSettings.keywords || []} // make sure it's an array
                                onChange={(newTags) =>
                                    setFormData({
                                        ...formData,
                                        siteSettings: { ...formData.siteSettings, keywords: newTags },
                                    })
                                }
                            />
                            <TextField variant='outlined' label='Headline'
                                fullWidth
                                value={formData.siteSettings.headline}
                                onChange={(e) => setFormData({ ...formData, siteSettings: { ...formData.siteSettings, headline: e.target.value } })}
                                size='small' />
                            <TextField variant='outlined' label='Site Description'
                                multiline
                                fullWidth
                                rows={3}
                                value={formData.siteSettings.description}
                                onChange={(e) => setFormData({ ...formData, siteSettings: { ...formData.siteSettings, description: e.target.value } })}
                                size='small' />
                            <TextField variant='outlined' label='Address'
                                multiline
                                fullWidth
                                rows={2}
                                value={formData.siteSettings.address}
                                onChange={(e) => setFormData({ ...formData, siteSettings: { ...formData.siteSettings, address: e.target.value } })}
                                size='small' />
                            <TextField variant='outlined' label='Phone Number'
                                fullWidth
                                value={formData.siteSettings.phone}
                                onChange={(e) => setFormData({ ...formData, siteSettings: { ...formData.siteSettings, phone: e.target.value } })}
                                size='small'
                            />

                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Image URL"
                                    value={data?.site?.logo?.id && data?.site?.logo?.webViewLink}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size="medium"
                                                    onClick={() => handleCopy(siteLogoUrl)}
                                                >
                                                    <Icon
                                                        fontSize='small'
                                                        component={ContentCopyOutlinedIcon}
                                                        sx={{ color: colors.iconColor_7 }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button variant='contained' onClick={handleSiteSettingsChange} sx={{
                                    minWidth: 200, background: colors.primary,
                                    alignSelf: 'flex-end',
                                    '& .MuiCircularProgress-root': {
                                        color: colors.primary, // 👈 your custom loader color
                                    },
                                }}>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>

                {/* New Deal Modal */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: '14px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                            backgroundColor: colors.grayLight_1,
                        },
                    }}
                    onClick={() => toggleSection('deal')}
                >
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: 500,
                            color: colors.black,
                        }}
                    >
                        New Deal
                    </Typography>

                    <ChevronRightIcon
                        sx={{
                            color: colors.gray,
                            transform: openSection === 'deal' ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: '0.3s',
                        }}
                    />
                </Box>
                <Collapse in={openSection === 'deal'} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            // justifyContent: 'space-between',
                            p: '14px 16px',
                            gap: 2,
                            borderRadius: '12px',
                            // cursor: 'pointer',
                            // transition: '0.3s',
                        }}
                    >
                        <Box sx={{
                            width: '100%',
                            maxWidth: '200px',
                            aspectRatio: '1 / 1',
                            display: 'flex',
                            position: 'relative',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: colors.grayLight_1,
                            borderRadius: '10px',
                            boxShadow: `0px 2px 2px ${colors.blackLight_20}`,
                        }}
                            onClick={() => dealModalInputRef.current.click()}
                        >
                            <Box
                                component='img'
                                // formData.images.length > 0 ? formData.images[currentIndex].preview :
                                src={displayedDealModal} // Placeholder if no image
                                alt='Preview'
                                sx={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '10px',
                                    opacity: 1
                                }}
                            />
                        </Box>
                        <input
                            ref={dealModalInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageUpload}
                        />
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                            <TextField variant='outlined' label='Head Line'
                                sx={{
                                    width: '100%',
                                }}
                                value={formData.dealModal.headline}
                                onChange={(e) => setFormData({ ...formData, dealModal: { ...formData.dealModal, headline: e.target.value } })}
                                size='small' />
                            <TextField variant='outlined' label='Deal Description'
                                sx={{
                                    width: '100%',
                                }}
                                value={formData.dealModal.description}
                                onChange={(e) => setFormData({ ...formData, dealModal: { ...formData.dealModal, description: e.target.value } })}
                                size='small' />
                            <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    label="Deal Link"
                                    value={data?.modal?.image?.id && data?.modal?.image?.webViewLink}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton size="medium" onClick={() => handleCopy(dealModalUrl)}>
                                                    <Icon
                                                        fontSize='small'
                                                        component={ContentCopyOutlinedIcon}
                                                        sx={{ color: colors.iconColor_7 }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button variant='contained' onClick={handleDealModalChange} sx={{
                                    minWidth: 200, background: colors.primary,
                                    alignSelf: 'flex-end',
                                    '& .MuiCircularProgress-root': {
                                        color: colors.primary, // 👈 your custom loader color
                                    },
                                }}>
                                    Upload New Deal
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: '14px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                            backgroundColor: colors.grayLight_1,
                        },
                    }}
                    onClick={() => toggleSection('social')}
                >
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: 500,
                            color: colors.black,
                        }}
                    >
                        Social Links
                    </Typography>

                    <ChevronRightIcon
                        sx={{
                            color: colors.gray,
                            transform: openSection === 'social' ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: '0.3s',
                        }}
                    />
                </Box>
                <Collapse in={openSection === 'social'} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            // justifyContent: 'space-between',
                            p: '14px 16px',
                            gap: 2,
                            borderRadius: '12px',
                            // cursor: 'pointer',
                            // transition: '0.3s',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            label='Whatsapp'
                            value={formData.social.whatsapp}
                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, whatsapp: e.target.value } })}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            fontSize='small'
                                            component={WhatsAppIcon}
                                            sx={{ color: colors.iconColor_7 }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="medium" onClick={() => handleCopy(data?.social?.whatsapp)}>
                                            <Icon
                                                fontSize='small'
                                                component={ContentCopyOutlinedIcon}
                                                sx={{ color: colors.iconColor_7 }}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            label='Facebook'
                            value={formData.social.facebook}
                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, facebook: e.target.value } })}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            fontSize='small'
                                            component={FacebookOutlinedIcon}
                                            sx={{ color: colors.iconColor_7 }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="medium" onClick={() => handleCopy(data?.social?.facebook)}>
                                            <Icon
                                                fontSize='small'
                                                component={ContentCopyOutlinedIcon}
                                                sx={{ color: colors.iconColor_7 }}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            label='Snapchat'
                            value={formData.social.snapchat}
                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, snapchat: e.target.value } })}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            fontSize='small'
                                            component={FaSnapchat}
                                            sx={{ color: colors.iconColor_7 }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="medium" onClick={() => handleCopy(data?.social?.snapchat)}>
                                            <Icon
                                                fontSize='small'
                                                component={ContentCopyOutlinedIcon}
                                                sx={{ color: colors.iconColor_7 }}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            label='TikTok'
                            value={formData.social.tiktok}
                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, tiktok: e.target.value } })}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            fontSize='small'
                                            component={FaTiktok}
                                            sx={{ color: colors.iconColor_7 }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="medium" onClick={() => handleCopy(data?.social?.tiktok)}>
                                            <Icon
                                                fontSize='small'
                                                component={ContentCopyOutlinedIcon}
                                                sx={{ color: colors.iconColor_7 }}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            size="small"
                            label='Instagram'
                            value={formData.social.instagram}
                            onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            fontSize='small'
                                            component={InstagramIcon}
                                            sx={{ color: colors.iconColor_7 }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="medium" onClick={() => handleCopy(data?.social?.instagram)}>
                                            <Icon
                                                fontSize='small'
                                                component={ContentCopyOutlinedIcon}
                                                sx={{ color: colors.iconColor_7 }}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button variant='contained' onClick={handleSocialLinksChange} sx={{
                            minWidth: 200, background: colors.primary,
                            alignSelf: 'flex-end',
                            '& .MuiCircularProgress-root': {
                                color: colors.primary, // 👈 your custom loader color
                            },
                        }}>
                            Save
                        </Button>
                    </Box>
                </Collapse>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: '14px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                            backgroundColor: colors.grayLight_1,
                        },
                    }}
                    onClick={() => toggleSection('note')}
                >
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: 500,
                            color: colors.black,
                        }}
                    >
                        Note
                    </Typography>

                    <ChevronRightIcon
                        sx={{
                            color: colors.gray,
                            transform: openSection === 'note' ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: '0.3s',
                        }}
                    />
                </Box>
                <Collapse in={openSection === 'note'} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            // justifyContent: 'space-between',
                            p: '14px 16px',
                            gap: 2,
                            borderRadius: '12px',
                            // cursor: 'pointer',
                            // transition: '0.3s',
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            label='Note'
                            placeholder='اَکڑ بَکڑ بَمبے بو، اَسی نَوے پُورے سَو۔'
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            fontSize='small'
                                            component={EditNoteIcon}
                                            sx={{ color: colors.iconColor_7 }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant='contained' onClick={handleNoteChange} sx={{
                            minWidth: 200, background: colors.primary,
                            alignSelf: 'flex-end',
                            '& .MuiCircularProgress-root': {
                                color: colors.primary, // 👈 your custom loader color
                            },
                        }}>
                            Save
                        </Button>
                    </Box>
                </Collapse>
            </Box>

            {/* Legal & Support */}
            <Typography
                sx={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: colors.black,
                }}
            >
                Legal & Support
            </Typography>
            <Box component='div' sx={{
                width: '95%',
                // height: 'auto',
                background: colors.white,
                display: 'flex',
                p: '20px 20px',
                flexDirection: 'column',
                borderRadius: '20px'
            }}>
                {settingsList_2.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: '14px 16px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: '0.3s',
                            '&:hover': {
                                backgroundColor: colors.grayLight_1,
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 500,
                                color: colors.black,
                            }}
                        >
                            {item.title}
                        </Typography>

                        <ChevronRightIcon sx={{ color: colors.gray }} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default AllSetting
