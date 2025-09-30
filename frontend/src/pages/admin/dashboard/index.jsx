import { Avatar, Box, Button, Checkbox, Divider, Grid, Icon, IconButton, Menu, MenuItem, Pagination, PaginationItem, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminFooter, DashboardOrderTile } from '../../../components/admin';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { chartData, purchases } from '../../../services/utils/constants';
import { LineChart } from '@mui/x-charts/LineChart';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { colors } from '../../../services';

const Dashboard = () => {
  const location = useLocation();
      const navigate = useNavigate();
  const [activeRange, setActiveRange] = useState('monthly');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(1);
    const isSelected = (id) => selected.includes(id);
  const rowsPerPage = 8;


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


  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    handleSortClose();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = purchases.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const sortedPurchases = [...purchases].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Convert amount and date for correct sorting
    if (sortConfig.key === 'amount') {
      aValue = parseFloat(aValue.replace(/[^\d.-]/g, ''));
      bValue = parseFloat(bValue.replace(/[^\d.-]/g, ''));
    }

    if (sortConfig.key === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedPurchases = sortedPurchases

  const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter((item) => item !== id);
        }

        setSelected(newSelected);
    };

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
              color: colors.textColor_4,
              fontWeight: 'bold',
              fontSize: { xs: '20px', sm: '24px' }
            }}
          >
            {breadcrumb[1]}
          </Typography>
          <Typography
            component='p'
            sx={{
              color: colors.textColor_4,
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
          <Icon component={CalendarMonthOutlinedIcon} sx={{ color: colors.iconColor_6 }} />
          <Typography
            component='p'
            sx={{
              color: colors.textColor_4,
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
          background: colors.grayLight_1,
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
              color: colors.textColor_4,
              fontWeight: 'bold',
              fontSize: { xs: '18px', md: '20px' },
            }}
          >
            Sale Graph
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant={activeRange === 'weekly' ? "contained" : "outlined"} onClick={() => setActiveRange('weekly')} sx={{ borderRadius: '8px', borderColor: activeRange === 'weekly' ? colors.borderColor_2 : colors.borderColor_4, color: activeRange === 'weekly' ? colors.white : colors.grayDark_1, fontSize: '12px', background: activeRange === 'weekly' ? colors.primary : colors.transparent }}>
              Weekly
            </Button>
            <Button variant={activeRange === 'monthly' ? "contained" : "outlined"} onClick={() => setActiveRange('monthly')} sx={{ borderRadius: '8px', borderColor: activeRange === 'monthly' ? colors.borderColor_2 : colors.borderColor_4, color: activeRange === 'monthly' ? colors.white : colors.grayDark_1, fontSize: '12px', background: activeRange === 'monthly' ? colors.primary : colors.transparent }}>
              Monthly
            </Button>
            <Button variant={activeRange === 'yearly' ? "contained" : "outlined"} onClick={() => setActiveRange('yearly')} sx={{ borderRadius: '8px', borderColor: activeRange === 'yearly' ? colors.borderColor_2 : colors.borderColor_4, color: activeRange === 'yearly' ? colors.white : colors.grayDark_1, fontSize: '12px', background: activeRange === 'yearly' ? colors.primary : colors.transparent }}>
              Yearly
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2, background: colors.grayDark_1 }} />

        {/* Chart */}
        <Box sx={{ width: '100%', height: { xs: 250, sm: 300, md: 350, lg: 400 } }}>
          <LineChart
            grid={{ horizontal: { stroke: colors.grayLight_2, strokeWidth: 1, opacity: 0.5 } }}
            xAxis={[
              {
                data: chartData[activeRange].xAxis,
                scaleType: 'band',
                sx: {
                  '& .MuiChartsAxis-line': { stroke: colors.grayLight_2, strokeWidth: 3 },
                  '& .MuiChartsAxis-tickLabel': { fontSize: '16px !important', fontWeight: '600 !important', fill: colors.grayDark_3 },
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
              '& .MuiChartsAxis-line': { stroke: colors.grayLight_2, strokeWidth: 3 },
              '& .MuiChartsAxis-tick': { display: 'none' },
              '& .MuiChartsAxis-tickLabel': { fontSize: '16px !important', fontWeight: '600 !important', fill: colors.gray },

              '& .MuiLineChart-legend': { display: 'none' },
            }}
          // height={300}
          >
            {/* ⬇️ Define the gradient INSIDE the chart */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor= {colors.grayLight_4} />
                <stop offset="100%" stopColor= {colors.blue} />
              </linearGradient>
            </defs>
          </LineChart>
        </Box>
        <Box component='div' sx={{
          width: '95%',
          background: colors.white,
          display: 'flex',
          p: '20px 20px',
          mt: 2,
          gap: 1,
          flexDirection: 'column',
          borderRadius: '20px'
        }}>
          <Box component='div' sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Typography component='h3' sx={{
              color: colors.textColor_4,
              fontSize: '20px',
              fontWeight: 600
            }}>Recent Orders</Typography>
            <Box component='div'>
              <IconButton onClick={handleSortClick} sx={{ color: colors.iconColor_7 }}><Icon fontSize='small' component={MoreVertRoundedIcon} /></IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSortClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right', // menu opens to the left
                }}
                disableScrollLock
                sx={{ position: 'fixed' }}
              >
                <MenuItem onClick={() => handleSort('product')} sx={{ gap: 1.5 }}><Icon fontSize='small' component={SortByAlphaRoundedIcon} /> Sort by Product</MenuItem>
                <MenuItem onClick={() => handleSort('date')} sx={{ gap: 1.5 }}><Icon fontSize='small' component={DateRangeOutlinedIcon} /> Sort by Date</MenuItem>
                <MenuItem onClick={() => handleSort('amount')} sx={{ gap: 1.5 }}><Icon fontSize='small' component={MonetizationOnOutlinedIcon} /> Sort by Amount</MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider />

          <TableContainer  >
            <Table sx={{ minWidth: 650 }} aria-label="recent purchases table">
              <TableHead>
                <TableRow >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < purchases.length}
                      checked={purchases.length > 0 && selected.length === purchases.length}
                      onChange={handleSelectAllClick}
                      sx={{
                        color: colors.black,
                        '&.Mui-checked': {
                          color: colors.black,
                        },
                      }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Customer Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  paginatedPurchases.length > 0 ?
                    paginatedPurchases
                      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                      .map((purchase) => {
                        const StatusDot = styled('span')(({ status }) => ({
                          height: 8,
                          width: 8,
                          backgroundColor:
                            status === 'Delivered'
                              ? colors.primary // Green for Delivered
                              : status === 'Canceled'
                                ? colors.yellow // Orange for Canceled
                                : colors.grayLight_5, // Default grey
                          borderRadius: '50%',
                          display: 'inline-block',
                          marginRight: 8,
                        }));

                        const StatusText = styled(Typography)(({ status }) => ({
                          color:
                            status === 'Delivered'
                              ? colors.primary
                              : status === 'Canceled'
                                ? colors.yellow
                                : colors.gray_1,
                          fontWeight: 500,
                        }));
                        return (
                          <TableRow key={purchase.id} sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            cursor: 'pointer'
                          }}
                            onClick={() => navigate(`/admin/orders/${purchase.id}`)}
                          >
                            <TableCell padding='checkbox'>
                              <Checkbox
                                checked={isSelected(purchase.id)}
                                onChange={() => handleClick(purchase.id)}
                                sx={{
                                  color: colors.black,
                                  '&.Mui-checked': {
                                    color: colors.black,
                                  },
                                }} />
                            </TableCell>
                            <TableCell component='th' scope='row' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>
                              {purchase.product}
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}>{purchase.orderId}</TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>{purchase.date}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={purchase.customerName}
                                  src={purchase.customerAvatar}
                                  sx={{ width: 24, height: 24, mr: 1 }} />
                                {purchase.customerName}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <StatusDot status={purchase.status} />
                                <StatusText sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} status={purchase.status}>{purchase.status}</StatusText>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} align="right">{purchase.amount}</TableCell>
                          </TableRow>
                        )
                      })
                    :
                    <Typography variant='body1' component='p' sx={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: colors.textColor_3,
                    }}>No Purchases Found</Typography>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box component='div' sx={{
          display: 'flex',
          mt: 2,
        }}>
          <Pagination
            count={Math.ceil(sortedPurchases.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            shape='rounded'
            boundaryCount={1}
            siblingCount={1}
            variant='outlined'
            renderItem={(item) => {

              if (item.type === 'next') {
                if (page >= Math.ceil(sortedPurchases.length / rowsPerPage)) return null;
                return (
                  <PaginationItem
                    {...item}
                    sx={{
                      minWidth: 70,
                      height: 32,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      border: `1px solid ${colors.borderColor_4}`,
                      color: colors.grayDark_1,
                      backgroundColor: colors.transparent,
                      '&:hover': {
                        backgroundColor: colors.transparent,
                        color: colors.grayDark_1,
                      },
                    }}
                    slots={{
                      next: () => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
                          <Typography variant='button' component='p' sx={{ color: colors.textColor_3 }} >Next</Typography>
                          <Icon component={ArrowForwardIosRoundedIcon}
                            sx={{
                              fontSize: '14px'
                            }}
                          />
                        </Box>
                      ),
                    }}
                  />
                );
              }
              if (item.type === 'previous') {
                if (page === 1) return null;
                return (
                  <PaginationItem
                    {...item}
                    sx={{
                      minWidth: 70,
                      height: 32,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      border: `1px solid ${colors.borderColor_4}`,
                      color: colors.grayDark_1,
                      backgroundColor: colors.transparent,
                      '&:hover': {
                        backgroundColor: colors.transparent,
                        color: colors.grayDark_1,
                      },
                    }}
                    slots={{
                      previous: () => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1, pr: 1 }}>
                          <Icon component={ArrowBackIosNewRoundedIcon}
                            sx={{
                              fontSize: '14px'
                            }}
                          />
                          <Typography variant='button' component='p' sx={{ color: colors.textColor_3 }} >Prev</Typography>
                        </Box>
                      ),
                    }}
                  />
                );
              }

              return (
                <PaginationItem
                  {...item}
                  sx={{
                    minWidth: 45,
                    mr: 1,
                    height: 32,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: item.selected ? colors.white : colors.grayDark_1,
                    '&.Mui-selected': {
                      backgroundColor: colors.grayDark_1,
                      color: colors.white,
                      '&:hover': {
                        backgroundColor: colors.grayDark_1,
                        color: colors.white,
                      },
                    },
                    border: `1px solid ${colors.borderColor_4}`,
                    '&:hover': {
                      backgroundColor: colors.grayDark_1,
                      color: colors.white
                    }
                  }}

                />
              )
            }}
          />
        </Box>
      </Box>

      <AdminFooter />
    </Box>
  )
}

export default Dashboard;
