import { Box, Button, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { AdminFooter } from '../../../components/admin';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { colors } from '../../../services';
import { useSelector } from 'react-redux';
// import { purchases } from '../../../services/utils/constants';


const Orders = () => {
    const location = useLocation();
    const [isOrderDetail, setIsOrderDetail] = useState(false);
    const { dateRange } = useSelector((state) => state.order);
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
        if (/^[a-zA-Z0-9]+$/.test(segment) && pathSegments[index - 1] === 'orders') return 'Order Details';
        // Fallback for numeric product IDs
        // if (pathSegments[index - 1] === 'orders' && /^\d+$/.test(segment)) {
        //     return 'Order Details';
        // }

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
                                color: colors.textColor_4,
                                fontWeight: 'bold',
                                fontSize: '24px'
                            }}>{isOrderDetail ? breadcrumb.split(' > ')[2] : breadcrumb.split(' > ')[1]}</Typography>
                            <Typography component='p' sx={{
                                color: colors.textColor_4,
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
                                        <Icon component={CalendarMonthOutlinedIcon} sx={{ color: colors.iconColor_6, }} />
                                    </Box>
                                    <Box>
                                        <Typography component='p' sx={{
                                            color: colors.textColor_4,
                                            fontSize: '16px',
                                            fontWeight: 500,
                                        }}>{dateRange ? dateRange : 'No Orders Yet'}</Typography>
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
