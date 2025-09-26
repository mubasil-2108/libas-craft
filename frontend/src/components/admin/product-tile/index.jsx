import { Box, Divider, Grid, Icon, IconButton, LinearProgress, Link, Typography } from '@mui/material'
import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { useNavigate } from 'react-router-dom';

const ProductTile = ({ product }) => {
    const navigate = useNavigate();
    const formattedPrice = new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2
    }).format(product.salePrice);

    const salesPercentage = (product.sales / product.stockQuantity) * 100;

    // ✅ Truncate helper
    const truncateText = (text, maxLength) =>
        text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box component='div' sx={{
                minWidth: '300px',
                maxWidth: '300px',
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
                    <Box component='img' src={`https://www.googleapis.com/drive/v3/files/${product.productPhoto?.[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                        alt={product.productPhoto?.[0]?.name}
                        sx={{
                            width: '84px',
                            height: '84px',
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                        onError={(e) => {
                            e.currentTarget.src = "/watch.jpg";
                            console.log("Error loading image, using fallback.", e);
                        }}
                    />
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

                                    flexGrow: 1,
                                    flexShrink: 1,
                                    fontSize: '16px',
                                    fontWeight: 600
                                }}>{truncateText(product?.productName, 15)}</Typography>

                                <Typography variant='h6' sx={{
                                    color: '#000000',
                                    opacity: 0.6,
                                    fontSize: '14px',
                                    fontWeight: 600
                                }}>{product?.category}</Typography>
                            </Box>
                            <Box component='div'  sx={{ alignItems: 'start' }}>
                                <IconButton onClick={()=> navigate(`/admin/products/${product?._id}`)} size='small' sx={{
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
                            {formattedPrice}
                        </Typography>
                    </Box>
                </Box>

                <Box component='div' sx={{
                    mt: '10px',
                    display: 'flex',
                    flexDirection: 'column',
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
                    }}>{truncateText(product?.productDescription, 40)}</Typography>
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
                            }}>{salesPercentage}%</Typography>
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
                            <LinearProgress variant='determinate' value={((product.stockQuantity - product.sales) / product.stockQuantity) * 100} color='inherit' sx={{ width: '50px', borderRadius: '10px', color: '#FFA52F' }} />
                            <Typography component='span' sx={{
                                fontSize: '14px',
                                fontWeight: 500,
                                opacity: 0.6,
                                color: '#000000',
                            }}>{product.stockQuantity - product.sales}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default ProductTile
