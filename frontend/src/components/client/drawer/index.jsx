import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import { clientBar, colors, socialMediaLinks } from '../../../services';
import { Icon, MenuItem, Slider, TextField, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export const DrawerComponent = ({ toggleDrawer, open }) => {
    const location = useLocation();
    return (
        <div>
            <Drawer open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: 250,
                        px: 2,
                        py: 1,
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                        backgroundColor: colors.white, // optional
                        mb: { xs: 2, sm: 0 }, // margin-bottom only on mobile
                        height: { xs: 'calc(100% - 16px)', sm: 'calc(100% - 16px)' },
                    },
                }}>
                <Box role="presentation" justifyContent={'space-between'} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={toggleDrawer(false)}>
                    <List>
                        {clientBar.map((item) => {
                            const isActive = location.pathname === item.link

                            return (
                                <ListItem key={item.id} disablePadding sx={{
                                    borderRadius: "20px",
                                    color: isActive ? colors.white : colors.textColor_4,
                                    background: isActive ? colors.greenDark_2 : colors.transparent,
                                }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Icon component={item.icon} sx={{ color: isActive ? colors.white : null }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} sx={{ fontFamily: 'cinzel', fontSize: '16px', }} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', mb: 2, padding: '0px 15px', }}>
                        <Divider variant="fullWidth" sx={{ my: 2, borderWidth: 1, backgroundColor: colors.greenDark_2, opacity: 0.4 }} />
                        <Box component={Link} href={'/account'}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',

                                gap: 2,
                                color: colors.greenDark_2,
                                textDecoration: 'none',
                            }}
                        >
                            <Icon component={PersonIcon} sx={{ color: colors.iconColor_11 }} />
                            <Typography variant='h5' sx={{ fontFamily: 'nunito-sans', fontWeight: '600', fontSize: '18px', }}>Account</Typography>
                        </Box>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, mt: 3 }}>
                            {
                                socialMediaLinks.map((item) => {
                                    return (
                                        <Icon key={item.id}
                                            component={item.icon}
                                            sx={{ color: colors.iconColor_1, cursor: 'pointer' }}
                                            onClick={() => window.open(item.link, '_blank')} />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}

export const FilterSortDrawer = ({ drawerOpen, toggleDrawer, priceRange, handlePriceChange, handleMaxChange, handleMinChange, sortOption, setSortOption }) => {
    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
                sx: {
                    width: { xs: 320, sm: 380, md: 400 }, // 📱 100% on phones, fixed width on larger screens
                    borderRadius: { xs: 0, sm: "12px 0 0 12px" },
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    backgroundColor: colors.white,
                },
            }}
        >
            {/* ✅ Smooth Scroll Area */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 3 },
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: colors.grayDark_1,
                        borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f0f0f0",
                    },
                }}
            >
                {/* === Drawer Content === */}
                <Typography
                    sx={{
                        fontFamily: "playfairDisplay",
                        fontSize: { xs: "20px", sm: "24px" },
                        mb: 2,
                        color: colors.textColor_3,
                        textAlign: "left",
                    }}
                >
                    Filter & Sort
                </Typography>

                {/* === Price Filter === */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            fontFamily: "roboto-medium",
                            fontSize: { xs: "15px", sm: "16px" },
                            mb: 1,
                            color: colors.textColor_1,
                        }}
                    >
                        Price Range
                    </Typography>

                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        sx={{
                            color: colors.textColor_3,
                            mt: 1,
                        }}
                    />

                    <Typography
                        sx={{
                            fontFamily: "roboto-regular",
                            fontSize: "14px",
                            color: colors.textColor_1,
                            mb: 2,
                        }}
                    >
                        ${priceRange[0]} – ${priceRange[1]}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexDirection: { xs: "column", sm: "row" },
                        }}
                    >
                        <TextField
                            label="Min"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={priceRange[0]}
                            onChange={handleMinChange}
                            fullWidth
                        />
                        <TextField
                            label="Max"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={priceRange[1]}
                            onChange={handleMaxChange}
                            fullWidth
                        />
                    </Box>
                </Box>

                {/* === Sort Options === */}
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "roboto-medium",
                            fontSize: { xs: "15px", sm: "16px" },
                            mb: 1,
                            color: colors.textColor_1,
                        }}
                    >
                        Sort by
                    </Typography>

                    {[
                        "Default",
                        "Alphabetically: A → Z",
                        "Alphabetically: Z → A",
                        "Price: Low → High",
                        "Price: High → Low",
                        "Newest",
                        "Oldest",
                    ].map((option) => {
                        const isSelected = option === sortOption;
                        return (
                            <MenuItem
                                key={option}
                                onClick={() => setSortOption(option)}
                                sx={{
                                    fontFamily: "roboto-regular",
                                    fontSize: "16px",
                                    color: isSelected
                                        ? `${colors.white} !important`
                                        : `${colors.textColor_3}`,
                                    backgroundColor: isSelected
                                        ? `${colors.greenDark_1} !important`
                                        : colors.transparent,
                                    borderRadius: "8px",
                                    transition: "all 0.25s ease-in-out",
                                    ":hover": {
                                        backgroundColor: `${colors.greenLight_2} !important`,
                                        color: `${colors.textColor_3} !important`,
                                    },
                                    mb: 0.5,
                                }}
                            >
                                {option}
                            </MenuItem>
                        );
                    })}
                </Box>
            </Box>

            {/* === Done Button === */}
            <Box
                sx={{
                    borderTop: `1px solid ${colors.borderColor}`,
                    p: { xs: 2, sm: 3 },
                    backgroundColor: colors.white,
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    onClick={toggleDrawer(false)}
                    sx={{
                        backgroundColor: colors.greenDark_1,
                        textTransform: "none",
                        fontFamily: "roboto-medium",
                        fontSize: "16px",
                        color: colors.white,
                        borderRadius: "8px",
                        py: 1.2,
                        ":hover": { backgroundColor: colors.greenDark_2 },
                    }}
                >
                    Apply
                </Button>
            </Box>
        </Drawer>
    )
}
