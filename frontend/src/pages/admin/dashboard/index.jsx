import { Box, Button, Divider, Grid, Icon, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AdminFooter, DashboardOrderTile } from '../../../components/admin';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { chartData, purchases } from '../../../services/utils/constants';
import { LineChart } from '@mui/x-charts/LineChart';

const Dashboard = () => {
  const location = useLocation();
  const [activeRange, setActiveRange] = useState('monthly');
  const path = location.pathname.trim();

  let breadcrumb = ["Home"];
  if (path.includes("admin") && (path.endsWith("/") || path === "/admin")) {
    breadcrumb.push("Dashboard");
  } else {
    const parts = path.split("/").filter(Boolean);
    breadcrumb = ["Home", ...parts.map(
      part => part.charAt(0).toUpperCase() + part.slice(1)
    )];
  }

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
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 2,
        px: { xs: 1, sm: 2, md: 0.5 },
      }}
    >
      {/* Header & Breadcrumb */}
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'flex-end' },
          gap: 2,
          // mt: 2,
        }}
      >
        <Box>
          <Typography
            component='h3'
            sx={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: { xs: '20px', sm: '24px' }
            }}
          >
            {breadcrumb[1]}
          </Typography>
          <Typography
            component='p'
            sx={{
              color: '#000',
              fontSize: { xs: '14px', sm: '16px' },
              wordBreak: 'break-word'
            }}
          >
            {breadcrumb.join(' > ')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Icon component={CalendarMonthOutlinedIcon} sx={{ color: '#232321' }} />
          <Typography
            component='p'
            sx={{
              color: '#000',
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: 500,
            }}
          >
            {dateRange || "Feb 16,2022 - Feb 20,2022"}
          </Typography>
        </Box>
      </Box>

      {/* Dashboard Tiles */}
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {Array(4).fill(0).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <DashboardOrderTile
              title={'Total Orders'}
              amount={'126.500'}
              percentage={'34.7'}
              lastMonth={'Compared to Oct 2023'}
            />
          </Grid>
        ))}
      </Grid>

      {/* Sales Graph */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: '#FAFAFA',
          p: { xs: 2, md: 3 },
          mt: 3,
          borderRadius: '15px',
        }}
      >
        {/* Header with buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            component="h3"
            sx={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: { xs: '18px', md: '20px' },
            }}
          >
            Sale Graph
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant={activeRange === 'weekly' ? "contained" : "outlined"} onClick={() => setActiveRange('weekly')} sx={{ borderRadius: '8px', borderColor: activeRange === 'weekly' ? '#003F62' : '#232321', color: activeRange === 'weekly' ? '#FFFFFF' : '#232321', fontSize: '12px', background: activeRange === 'weekly' ? '#003F62' : 'transparent' }}>
              Weekly
            </Button>
            <Button variant={activeRange === 'monthly' ? "contained" : "outlined"} onClick={() => setActiveRange('monthly')} sx={{ borderRadius: '8px', borderColor: activeRange === 'monthly' ? '#003F62' : '#232321', color: activeRange === 'monthly' ? '#FFFFFF' : '#232321', fontSize: '12px', background: activeRange === 'monthly' ? '#003F62' : 'transparent' }}>
              Monthly
            </Button>
            <Button variant={activeRange === 'yearly' ? "contained" : "outlined"} onClick={() => setActiveRange('yearly')} sx={{ borderRadius: '8px', borderColor: activeRange === 'yearly' ? '#003F62' : '#232321', color: activeRange === 'yearly' ? '#FFFFFF' : '#232321', fontSize: '12px', background: activeRange === 'yearly' ? '#003F62' : 'transparent' }}>
              Yearly
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2, background: '#232321' }} />

        {/* Chart */}
        <Box sx={{ width: '100%', height: { xs: 250, sm: 300, md: 350, lg: 400 } }}>
          <LineChart
            grid={{ horizontal: { stroke: '#E6E6E6', strokeWidth: 1, opacity: 0.5 } }}
            xAxis={[
              {
                data: chartData[activeRange].xAxis,
                scaleType: 'band',
                sx: {
              '& .MuiChartsAxis-line': { stroke: '#E6E6E6', strokeWidth: 3 },
                  '& .MuiChartsAxis-tickLabel': { fontSize: '16px !important', fontWeight: '600 !important', fill: '#212121' },
                },
              },
            ]}
            yAxis={[
              {
                min: 0, 
                max: activeRange === 'yearly' ? 5000 : activeRange === 'monthly' ? 1000 : 300, 
                tickMinStep: activeRange === 'yearly' ? 1000 : 100, 
                valueFormatter: (v) => `₹${v}`,
              },

            ]}
            series={[
              {
                id: 'sales',
                data: chartData[activeRange].series,
                curve: 'natural',
                showMark: false,
                color: 'url(#lineGradient)', // ⬅️ use the gradient
              },
            ]}
            sx={{
              // line thickness
              '& .MuiLineElement-root': { strokeWidth: 5, strokeLinecap: 'round' },

              // (optional) axis cosmetics you already wanted
              '& .MuiChartsAxis-line': { stroke: '#E6E6E6', strokeWidth: 3 },
              '& .MuiChartsAxis-tick': { display: 'none' },
              '& .MuiChartsAxis-tickLabel': { fontSize: '16px !important', fontWeight: '600 !important', fill: '#8D8D8D' },

              '& .MuiLineChart-legend': { display: 'none' },
            }}
          // height={300}
          >
            {/* ⬇️ Define the gradient INSIDE the chart */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f3f3f3ff" />
                <stop offset="100%" stopColor="#1B59F8" />
              </linearGradient>
            </defs>
          </LineChart>
        </Box>
      </Box>

      <AdminFooter />
    </Box>
  )
}

export default Dashboard;
