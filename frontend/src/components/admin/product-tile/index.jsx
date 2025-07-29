import { Box, Divider, Grid, Icon, IconButton, LinearProgress, Link, Typography } from '@mui/material'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

const ProductTile = ({ product }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box component='div' sx={{
                minWidth: '300px',
                gap: 1,
                background: '#FAFAFA',
                display: 'flex',
                p: '15px 15px',
                flexDirection: 'column',
                borderRadius: '20px'
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1
                }}>
                    <Box component='img' src={product.image} sx={{
                        width: '84px',
                        height: '84px',
                        objectFit: 'contain',
                        borderRadius: '10px'
                    }} />

                    <Box component='div' sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        width: '100%'
                    }}>
                        <Box component='div' sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Box component='div' sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Typography variant='h6' sx={{
                                    color: '#232321',
                                    fontSize: '16px',
                                    fontWeight: 600
                                }}>{product.name}</Typography>

                                <Typography variant='h6' sx={{
                                    color: '#000000',
                                    opacity: 0.6,
                                    fontSize: '14px',
                                    fontWeight: 600
                                }}>{product.category}</Typography>
                            </Box>
                            <Box component={Link} href={`/admin/products/${product.id}`} sx={{ display: 'flex', alignItems: 'start' }}>
                                <IconButton size='small' sx={{
                                    background: '#EFEFEF',
                                    borderRadius: '10px'
                                }}>
                                    <Icon component={MoreHorizOutlinedIcon} sx={{
                                        color: '#232321',
                                        opacity: 0.5
                                    }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant='h5' component='span' sx={{
                            color: '#232321',
                            fontSize: '14px',
                            fontWeight: 600
                        }}>
                            ₹{product.price}
                        </Typography>
                    </Box>
                </Box>

                <Box component='div' sx={{
                    mt: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: '300px',
                }}>
                    <Typography variant='body1' component='p' sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#232321',
                    }}>Summary</Typography>
                    <Typography variant='body1' component='p' sx={{
                        fontSize: '14px',
                        fontWeight: 500,
                        opacity: 0.6,
                        color: '#232321',
                    }}>{product.summary}</Typography>
                </Box>

                <Box component='div' sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: '10px',
                    borderRadius: '8px',
                    gap: 1,
                    border: '1px solid rgba(35,35,35,0.3)',
                }}>
                    <Box component='div' sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography component='p' sx={{
                            fontSize: '14px',
                            fontWeight: 500,
                            opacity: 0.8,
                            color: '#232321',
                        }}>Sales</Typography>
                        <Box component='div' sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Icon component={ArrowUpwardOutlinedIcon} sx={{
                                color: '#FFA52F',
                                fontSize: '18px'
                            }} />
                            <Typography component='span' sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                opacity: 0.6,
                                color: '#000000',
                            }}>{product.sales}</Typography>
                        </Box>
                    </Box>

                    <Divider variant='fullWidth' />

                    <Box component='div' sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography component='p' sx={{
                            fontSize: '14px',
                            fontWeight: 500,
                            opacity: 0.8,
                            color: '#232321',
                        }}>Remaining Products</Typography>
                        <Box component='div' sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <LinearProgress variant='determinate' value={((product.total - product.sales) / product.total) * 100} color='inherit' sx={{ width: '50px', borderRadius: '10px', color: '#FFA52F' }} />
                            <Typography component='span' sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                opacity: 0.6,
                                color: '#000000',
                            }}>{product.total - product.sales}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default ProductTile
