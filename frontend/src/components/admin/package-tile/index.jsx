import { Box, Divider, Grid, Icon, IconButton, LinearProgress, Link, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../services';
import { useDispatch } from 'react-redux';

const PackageTile = ({ product, handleDeletePackage, handleMainProduct }) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const priceValue = product?.packageSalePrice
        ? product?.packageSalePrice
        : product?.packageRegularPrice;

    const formattedPrice = `Rs. ${priceValue?.toFixed(2)?.toLocaleString()}`;

    // ✅ Truncate helper
    const truncateText = (text, maxLength) =>
        text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewDetails = () => {
        handleMenuClose();
        navigate(`/admin/packages/${product?._id}`);
    };

    const handleSelectMain = () => {
        handleMainProduct(product?._id);
        handleMenuClose();
    };

    const handleDelete = () => {
        handleDeletePackage(product?._id);
        handleMenuClose();
    };

    // ()=> navigate(`/admin/products/${product?._id}`)

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box component='div' sx={{
                minWidth: '300px',
                maxWidth: '300px',
                gap: 1,
                background: colors.grayLight_1,
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
                    <Box component='img' src={`https://www.googleapis.com/drive/v3/files/${product?.packageImage?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
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
                                    color: colors.textColor_3,

                                    flexGrow: 1,
                                    flexShrink: 1,
                                    fontSize: '16px',
                                    fontWeight: 600
                                }}>{truncateText(product?.packageName, 15)}</Typography>
                            </Box>
                            <Box component='div' sx={{ alignItems: 'start' }}>
                                <IconButton onClick={handleMenuOpen} size='small' sx={{
                                    background: colors.iconBgColor_1,
                                    borderRadius: '10px'
                                }}>
                                    <Icon component={MoreHorizOutlinedIcon} sx={{
                                        color: colors.iconColor_6,
                                        opacity: 0.5
                                    }} />
                                </IconButton>
                                {/* MENU LIST */}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                >
                                    <MenuItem onClick={handleViewDetails} sx={{ gap: 1, alignItems: 'center', }}>
                                        <Icon fontSize='small' component={VisibilityOutlinedIcon} />
                                        View Details</MenuItem>
                                    <MenuItem onClick={handleSelectMain} sx={{ gap: 1, alignItems: 'center', }}>
                                        <Icon fontSize='small' component={GradeIcon} />
                                        Select to Main Package</MenuItem>
                                    <MenuItem
                                        onClick={handleDelete}
                                        sx={{ color: 'red', gap: 1, alignItems: 'center', }}
                                    >
                                        <Icon fontSize='small' component={DeleteOutlineOutlinedIcon} />
                                        Delete Package
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                         <Box component='div' sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                        <Typography variant='h5' component='span' sx={{
                            color: colors.textColor_3,
                            fontSize: '14px',
                            fontWeight: 600
                        }}>
                            {formattedPrice}
                        </Typography>
                        {
                                        product?.mainPackage && (
                                            <Icon fontSize='inherit' component={GradeIcon} sx={{ fontSize: '16px', color: colors.iconColor_3 }} />
                                        )
                                    }
                        </Box>
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
                        color: colors.textColor_3,
                    }}>Summary</Typography>
                    <Typography variant='body1' component='p' sx={{
                        fontSize: '14px',
                        fontWeight: 500,
                        opacity: 0.6,
                        color: colors.textColor_3,
                    }}>{truncateText(product?.packageDescription, 40)}</Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default PackageTile
