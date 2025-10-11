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
import { Icon, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const DrawerComponent = ({ toggleDrawer, open }) => {
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
                                        <ListItemText primary={item.name} sx={{fontFamily:'cinzel', fontSize:'16px',}} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', mb: 2, padding: '0px 15px',}}>
                        <Divider variant="fullWidth" sx={{ my: 2, borderWidth: 1, backgroundColor:colors.greenDark_2, opacity:0.4 }}/>
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
                            <Typography variant='h5' sx={{fontFamily:'nunito-sans', fontWeight:'600', fontSize:'18px',}}>Account</Typography>
                        </Box>
                        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, mt: 3 }}>
                            {
                                socialMediaLinks.map((item)=> {
                                    return (
                                        <Icon key={item.id} 
                                        component={item.icon} 
                                        sx={{ color: colors.iconColor_1, cursor:'pointer'}} 
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

export default DrawerComponent;
