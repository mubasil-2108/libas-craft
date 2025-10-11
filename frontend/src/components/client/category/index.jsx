import { Box, Button, Drawer, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { colors, dummyCategories } from '../../../services'
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CustomScrollComponent from '../scrollbar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Scrollbars } from 'react-custom-scrollbars';
import CategoryTile from '../category-tile';

const Categories = () => {

    const listRef = useRef(null);
    const smoothScroll = (target, distance, duration = 200) => {
        const start = target.getScrollTop();
        const startTime = performance.now();

        const animate = (time) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            target.scrollTop(start + distance * progress);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    const scrollUp = () => {
        if (listRef.current) smoothScroll(listRef.current, -20);
    };

    const scrollDown = () => {
        if (listRef.current) smoothScroll(listRef.current, 20);
    };
    return (
        <Box component='div' sx={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            px: 10,
            py: 10,
            gap: 5,
            backgroundColor: colors.white,
        }}>
            <Typography sx={{
                fontFamily: 'playfairDisplay',
                fontSize: '64px',
                color: colors.textColor_7,
            }} >Explore by Category</Typography>
            <Box component='div' sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.white,
            }}>
                <Box
                    component="div"
                    sx={{
                        minWidth: '220px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        py: 2,
                        gap: 7,
                    }}
                >
                    <Box component='div' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search"
                            size="small"
                            sx={{
                                background: colors.inputBgColor_1,
                                borderRadius: '8px',
                                width: '200px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: 'none', // default
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'none', // hover effect
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'none', // focused effect
                                    },
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: colors.iconColor_13 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box component='div' sx={{ px: 2, display: 'flex', flexDirection: 'column', }}>
                        <Scrollbars autoHeight ref={listRef} autoHeightMax={300}
                            renderView={props => <div {...props} style={{
                                ...props.style,
                                overflowX: 'hidden',
                                overflowY: 'auto',
                            }} />
                            }
                            renderTrackVertical={props => <div {...props} style={{
                                ...props.style,
                                right: 2,
                                bottom: 2,
                                top: 2,
                                width: '3px',
                            }} />
                            }
                            thumbSize={50}
                            thumbMinSize={50}
                            renderThumbVertical={props => <div {...props} style={{
                                ...props.style,
                                backgroundColor: colors.grayDark_1,
                            }} />
                            }
                            style={{
                                width: '100%',
                                borderColor: 'black',
                                borderLeftColor: 'black'
                            }}>
                            <Box component='div'
                                sx={{
                                    mt: 1,
                                    height: '300px',
                                    width: '100%',
                                }}
                            >
                                <List >
                                    {
                                        dummyCategories.map((item) => (
                                            <ListItem key={item.id} button sx={{
                                                width: '170px',
                                                cursor: 'pointer',

                                                borderRadius: '10px',
                                            }}>
                                                <ListItemText sx={{
                                                    fontFamily: 'roboto-regular',
                                                    fontSize: '24px',
                                                    color: colors.textColor_8
                                                }}>{item.name}</ListItemText>
                                            </ListItem>
                                        ))
                                    }
                                </List>

                            </Box>
                        </Scrollbars>

                    </Box>
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button variant='contained' endIcon={<ArrowForwardIcon />}
                            sx={{
                                backgroundColor: colors.buttonColor_1,
                                color: colors.textColor_5,
                                fontFamily: 'openSans-bold',
                                textTransform: 'none',
                                '&:hover': { backgroundColor: colors.greenDark_2 }
                            }}>All Categories</Button>
                        <Box component='div' sx={{ px: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, }}>
                            <IconButton
                                onClick={scrollUp}
                                size='small'
                                sx={{
                                    backgroundColor: colors.iconBgColor_5,
                                    '&:hover': { backgroundColor: colors.grayLight_1 },
                                }}
                            >
                                <ArrowUpwardIcon sx={{ fontSize: 12, color: colors.iconColor_14 }} />
                            </IconButton>
                            <IconButton
                                onClick={scrollDown}
                                size='small'
                                sx={{
                                    backgroundColor: colors.iconBgColor_6,
                                    '&:hover': { backgroundColor: colors.grayLight_1 },
                                }}
                            >
                                <ArrowDownwardIcon sx={{ fontSize: 12, color: colors.iconColor_14 }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box component='div' sx={{
                    // minWidth: '200px',
                    maxWidth: '850px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2
                }}>
                    <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        {[...Array(6)].map((_, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <CategoryTile />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box >
    )
}

export default Categories
