import { Box, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { adminBar, categories } from '../../../services/utils/constants'
import { useLocation } from 'react-router-dom'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const AdminSidebar = () => {
    const location = useLocation()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [showCategories, setShowCategories] = useState(true)

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0].id) // default select first category
        }
    }, [])
    return (
        <Box component='div' sx={{
            minWidth: '200px',
            // height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FAFAFA',
            padding: '20px',
        }}>
            <Box component='img' src='/Group.png' sx={{
                objectFit: 'contain',
                maxWidth: '190px',
                alignSelf: 'center',
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
                            categories.map((category) => {
                                const isCategoryActive = selectedCategory === category.id
                                return (
                                    <Box key={category.id} component='div'
                                        onClick={() => setSelectedCategory(category.id)}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
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
