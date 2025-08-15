import { Box, Button, Grid, Icon, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AdminFooter, DashboardOrderTile } from '../../../components/admin';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { purchases } from '../../../services/utils/constants';

const Dashboard = () => {
  const location = useLocation();

  const path = location.pathname.trim();
  console.log('path', path);
  let breadcrumb = ["Home"];

  if (path.includes("admin") && path.endsWith("/") && path.endsWith("")) {
    breadcrumb.push("Dashboard");
  } else {
    const parts = path.split("/").filter(Boolean);
    breadcrumb = ["Home", ...parts.map(
      part => part.charAt(0).toUpperCase() + part.slice(1)
    )];
  }

  console.log('breadcrumb', breadcrumb);

  const getFormattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDateRangeFromPurchases = () => {
    if (!purchases || purchases.length === 0) return '';

    const dates = purchases.map(p => new Date(p.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    return `${getFormattedDate(minDate)} - ${getFormattedDate(maxDate)}`;
  };

  const dateRange = getDateRangeFromPurchases();


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
              }}>{breadcrumb[1]}</Typography>
              <Typography component='p' sx={{
                color: '#000000',
                fontWeight: 400,
                fontSize: '16px'
              }}>{breadcrumb.join(' > ')}</Typography>
            </Box>
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
          </Box>
          <Box component='main' sx={{
            width: '100%',
          }}>
            <Grid container spacing={1.5} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardOrderTile title={'Total Oders'} amount={'126.500'} percentage={'34.7'} lastMonth={'Compared to Oct 2023'} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardOrderTile title={'Total Oders'} amount={'126.500'} percentage={'34.7'} lastMonth={'Compared to Oct 2023'} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardOrderTile title={'Total Oders'} amount={'126.500'} percentage={'34.7'} lastMonth={'Compared to Oct 2023'} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardOrderTile title={'Total Oders'} amount={'126.500'} percentage={'34.7'} lastMonth={'Compared to Oct 2023'} />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <AdminFooter />
      </Box>
    </>
  )
}

export default Dashboard;
