import { Box, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { adminBar, categories } from '../../../services/utils/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../../store/slices/productSlice';

const AdminSidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate();
    const { products } = useSelector((state) => state.product)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [showCategories, setShowCategories] = useState(true)

    const categoriesWithCount = useMemo(() => {
        const counts = {}
        products.forEach((p) => {
            if (!counts[p.category]) counts[p.category] = 0
            counts[p.category] += 1
        })

        const mapped = Object.keys(counts).map((key, index) => ({
            id: index + 1,
            name: key,
            productsNo: counts[key],
        }));

        return [{ id: 0, name: "All", productsNo: products.length }, ...mapped];
    }, [products])

    useEffect(() => {
        if (categoriesWithCount.length > 0) {
            setSelectedCategory(categoriesWithCount[0].id) // default select first category
        }
    }, [categoriesWithCount])

    return (
        <Box component='div' sx={{
            minWidth: '200px',
            // height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FAFAFA',
            padding: '20px',
        }}>
            <Box component='img' src='/logo.jpeg' onClick={() => navigate('/admin/')} sx={{
                objectFit: 'contain',
                maxWidth: '230px',
                alignSelf: 'center',
                cursor: 'pointer',
                mb: '50px',
                mt: '10px'
            }} />
            {
                adminBar.map((item) => {
                    const isActive = location.pathname === item.link
                    return (
                        <Box key={item.id} sx={{
                            pb: '10px'
                        }}>
                            <Box component={Link} href={item.link}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px 20px',
                                    gap: 1,
                                    color: isActive ? '#fff' : '#000',
                                    textDecoration: 'none',
                                    borderRadius: '10px',
                                    background: isActive ? '#003F62' : '#FAFAFA',
                                    '&:hover': {
                                        background: '#003F62',
                                        color: '#fff'
                                    }
                                }}
                            >
                                <Icon sx={{ fontSize: '20px' }} component={item.icon} />
                                <Typography variant='button' fontSize={'14px'}>{item.name}</Typography>
                            </Box>
                        </Box>
                    )
                })
            }
            <Box component='div'>
                <Box
                    onClick={() => setShowCategories(!showCategories)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 0px',
                        color: '#000',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        background: '#FAFAFA',
                        cursor: 'pointer',
                    }}
                >
                    <Typography variant='body1' fontSize={'20px'} fontWeight={'bold'}>Categories</Typography>
                    <Icon sx={{
                        fontSize: '20px',
                        transform: showCategories ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }} component={KeyboardArrowDownOutlinedIcon} />
                </Box>
                {showCategories && (
                    <Box component='div' sx={{
                        padding: '10px 0px',
                    }}>
                        {
                            categoriesWithCount.map((category) => {
                                const isCategoryActive = selectedCategory === category.id
                                return (
                                    <Box key={category.id} component='div'
                                        onClick={() => {
                                            setSelectedCategory(category.id)
                                            dispatch(setCategory(category.name));
                                        }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            mb: '10px'
                                        }}>
                                        <Typography color='#232321' variant='body1' fontSize={'16px'}>{category.name}</Typography>
                                        <Box component='div' sx={{
                                            width: '35px',
                                            height: '30px',
                                            background: isCategoryActive ? '#003F62' : '#E7E7E3',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Typography variant='body1' fontSize={'14px'} sx={{
                                                textAlign: 'center',
                                                color: isCategoryActive ? '#fff' : '#232321'
                                            }}>{category.productsNo}</Typography>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default AdminSidebar
