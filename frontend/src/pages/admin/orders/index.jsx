import { Box, Button, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { AdminFooter } from '../../../components/admin';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// import { purchases } from '../../../services/utils/constants';


const Orders = () => {
    const location = useLocation();
    const [isOrderDetail, setIsOrderDetail] = useState(false);
    const capitalize = (str) =>
        str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const pathSegments = location.pathname.split('/').filter(Boolean);

    useEffect(() => {
        const isDetail =
            (pathSegments.some(seg => seg.startsWith('order=')) ||
                (pathSegments.includes('orders') &&
                    /^\d+$/.test(pathSegments[pathSegments.length - 1])));

        setIsOrderDetail(isDetail);
    }, [pathSegments, location.pathname]);

    const breadcrumb = pathSegments.map((segment, index) => {
        if (segment === 'admin') return 'Home';
        if (segment === 'orders') return 'Orders List';

        // Handle custom "product=ID" segment
        if (segment.startsWith('orders=')) {
            setIsOrderDetail(true);
            return 'Order Detail';
        }

        // Fallback for numeric product IDs
        if (pathSegments[index - 1] === 'orders' && /^\d+$/.test(segment)) {
            return 'Order Details';
        }

        return capitalize(segment);
    }).join(' > ');

    // const getFormattedDate = (dateString) => {
    //     const options = { year: 'numeric', month: 'short', day: 'numeric' };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    // };

    // const getDateRangeFromPurchases = () => {
    //     if (!purchases || purchases.length === 0) return '';

    //     const dates = purchases.map(p => new Date(p.date));
    //     const minDate = new Date(Math.min(...dates));
    //     const maxDate = new Date(Math.max(...dates));

    //     return `${getFormattedDate(minDate)} - ${getFormattedDate(maxDate)}`;
    // };

    // const dateRange = getDateRangeFromPurchases();


    return (
        <>
            <Box component='div' sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                flex: 1
                // alignItems:'center'
            }}>
                <Box component='div' sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    <Box component='div' sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        m: '0px 15px',
                        alignItems: 'end',
                        justifyContent: 'space-between',
                    }}>
                        <Box component='div'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography component='h3' sx={{
                                color: '#000000',
                                fontWeight: 'bold',
                                fontSize: '24px'
                            }}>{isOrderDetail ? breadcrumb.split(' > ')[2] : breadcrumb.split(' > ')[1]}</Typography>
                            <Typography component='p' sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: '16px'
                            }}>{breadcrumb}</Typography>
                        </Box>
                        {
                            !isOrderDetail && (
                                <Box component='div' sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    maxWidth: '228px',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                }}>
                                    <Box>
                                        <Icon component={CalendarMonthOutlinedIcon} sx={{ color: '#232321', }} />
                                    </Box>
                                    <Box>
                                        <Typography component='p' sx={{
                                            color: '#000000',
                                            fontSize: '16px',
                                            fontWeight: 500,
                                        }}>Feb 16,2022 - Feb 20,2022</Typography>
                                        {/* {dateRange} */}
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                    <Box component='main' sx={{
                        width: '100%',
                    }}>
                        <Outlet />
                    </Box>
                </Box>
                <AdminFooter />
            </Box>
        </>
    )
}

export default Orders
