import { Avatar, Box, Button, Checkbox, Divider, Grid, Icon, IconButton, Menu, MenuItem, Pagination, PaginationItem, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toPng, toJpeg } from "html-to-image";
import { AdminFooter, DashboardOrderTile } from '../../../components/admin';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { chartData, customerMenuItems, orderMenuItems, productMenuItems, purchases, revenueMenuItems } from '../../../services/utils/constants';
import { LineChart } from '@mui/x-charts/LineChart';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { colors, formatDate, stringAvatar } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../../store/slices/orderSlice';
import { getAllProducts } from '../../../store/slices/productSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const [activeRange, setActiveRange] = useState('monthly');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(1);
  const isSelected = (id) => selected.includes(id);
  const rowsPerPage = 8;

  const orderList = Array.isArray(orders) ? orders : [];

  console.log(orderList, "orders in dashboard useSelector");

  useEffect(() => {
    // Dispatch action to fetch orders
    dispatch(getAllOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      await dispatch(getAllOrders())
        .catch((error) => {
          toast.error(error?.message || 'Failed to fetch orders');
        });
    }
    fetchAllOrders();
  }, [dispatch]);

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRevenueFilter, setSelectedRevenueFilter] = useState("All");
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState("All");
  const [selectedProductFilter, setSelectedProductFilter] = useState("All");
  const totalOrders = orders?.length;

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return selectedStatus === "All"
      ? orders
      : orders.filter(order => order?.status === selectedStatus);
  }, [orders, selectedStatus]);

  const totalAmount = useMemo(() => {
    return filteredOrders.reduce(
      (acc, order) => acc + (order?.totalAmount || 0),
      0
    );
  }, [filteredOrders]);

  const selectedCount = filteredOrders.length;
  let percentage = 0;

  if (totalOrders > 0) {
    percentage = ((selectedCount / totalOrders) * 100).toFixed(1);
  }

  const revenueFilteredOrders = useMemo(() => {
    if (!orders) return [];
    if (selectedRevenueFilter === "All") return orders;
    if (selectedRevenueFilter === "Paid")
      return orders.filter(order => order?.isPaid === true);
    if (selectedRevenueFilter === "Unpaid")
      return orders.filter(order => order?.isPaid === false);
    return orders;
  }, [orders, selectedRevenueFilter]);

  // 🔹 Revenue Calculation
  const totalRevenue = useMemo(() => {
    return orders?.reduce(
      (acc, order) => acc + (order?.totalAmount || 0),
      0
    ) || 0;
  }, [orders]);

  const filteredRevenue = useMemo(() => {
    return revenueFilteredOrders.reduce(
      (acc, order) => acc + (order?.totalAmount || 0),
      0
    );
  }, [revenueFilteredOrders]);

  // 🔹 Revenue Percentage
  let revenuePercentage = 0;

  if (totalRevenue > 0) {
    revenuePercentage = ((filteredRevenue / totalRevenue) * 100).toFixed(1);
  }


  const customerStats = useMemo(() => {
    if (!orders) return { total: 0, newC: 0, returning: 0 };

    const userOrderCount = {};

    orders.forEach(order => {
      const userId = order?.user;
      if (!userOrderCount[userId]) userOrderCount[userId] = 0;
      userOrderCount[userId] += 1;
    });

    const totalCustomers = Object.keys(userOrderCount).length;
    const newCustomers = Object.values(userOrderCount).filter(c => c === 1).length;
    const returningCustomers = Object.values(userOrderCount).filter(c => c > 1).length;

    return { total: totalCustomers, newC: newCustomers, returning: returningCustomers };
  }, [orders]);
  // 🔹 Get unique users from orders
  const uniqueUsers = [...new Set(orders?.map(order => order?.user))];

  const totalCustomers = uniqueUsers.length;

  let customerCount = customerStats.total;

  if (selectedCustomerFilter === "New") {
    customerCount = customerStats.newC;
  }
  if (selectedCustomerFilter === "Returning") {
    customerCount = customerStats.returning;
  }

  // 🔹 TOTAL PRODUCTS
  const totalProducts = products?.length || 0;

  const productStats = useMemo(() => {
    if (!products) return {
      total: 0,
      lowStock: [],
      outOfStock: [],
      topSelling: [],
      mostViewed: []
    };

    const lowStock = products.filter(
      p => p?.stockQuantity > 0 && p?.stockQuantity <= 5
    );

    const outOfStock = products.filter(
      p => p?.stockQuantity === 0
    );

    const topSelling = [...products]
      .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
      .slice(0, 5);

    const mostViewed = [...products]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);

    return {
      total: products.length,
      lowStock,
      outOfStock,
      topSelling,
      mostViewed
    };
  }, [products]);

  let productAmount = productStats.total;

  if (selectedProductFilter === "Low Stock")
    productAmount = productStats.lowStock.length;

  if (selectedProductFilter === "Out of Stock")
    productAmount = productStats.outOfStock.length;

  if (selectedProductFilter === "Top Selling")
    productAmount = productStats.topSelling.length;

  if (selectedProductFilter === "Most Viewed")
    productAmount = productStats.mostViewed.length;

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 🔹 SALES GRAPH DATA GENERATION

  const salesData = useMemo(() => {
    if (!orders || orders.length === 0) {
      return { xAxis: [], series: [] };
    }

    const grouped = {};

    orders.forEach(order => {
      if (!order?.createdAt) return;

      const date = new Date(order.createdAt);
      let key = "";

      if (activeRange === "weekly") {
        key = date.toISOString().split("T")[0];
      }

      if (activeRange === "monthly") {
        key = `${date.getFullYear()}-${date.getMonth()}`;
      }

      if (activeRange === "yearly") {
        key = date.getFullYear().toString();
      }

      if (!grouped[key]) grouped[key] = 0;
      grouped[key] += order.totalAmount || 0;
    });

    const sortedKeys = Object.keys(grouped).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const xAxis = sortedKeys.map(key => {
      const date = new Date(key);

      if (activeRange === "weekly")
        return date.toLocaleDateString("default", { weekday: "short" });

      if (activeRange === "monthly")
        return date.toLocaleDateString("default", { month: "short", year: "numeric" });

      if (activeRange === "yearly")
        return key;

      return key;
    });

    const series = sortedKeys.map(key => grouped[key]);

    return { xAxis, series };
  }, [orders, activeRange]);

  const downloadChart = useCallback(async (type = "png") => {
    if (!chartRef.current) return;

    try {
      const svgElement = chartRef.current.querySelector("svg");

      const options = {
        backgroundColor: "#ffffff",
        cacheBust: true,
        pixelRatio: 2,
      };

      const dataUrl =
        type === "png"
          ? await toPng(svgElement, options)
          : await toJpeg(svgElement, { ...options, quality: 1 });

      const link = document.createElement("a");
      link.download = `sales-graph.${type}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, []);

  const filteredPurchases =
    selectedStatus === "All"
      ? orderList
      : orderList.filter(p => p.status === selectedStatus);
  const sortedPurchases = useMemo(() => {
    const sorted = [...filteredPurchases];

    if (!sortConfig.key) return sorted;

    return sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (sortConfig.key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredPurchases, sortConfig]);

  const paginatedPurchases = sortedPurchases


  const handleSelectAllClick = useCallback((event) => {
    if (event.target.checked) {
      setSelected(orderList.map(n => n._id));
    } else {
      setSelected([]);
    }
  }, [orderList]);

  const handleClick = useCallback((id) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredPurchases.length / rowsPerPage);
  }, [filteredPurchases.length]);

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
        {/* Orders */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardOrderTile
            menuItems={orderMenuItems}
            title={selectedStatus === "All" ? 'Total Orders' : `${selectedStatus} Orders`}
            amount={totalAmount}
            percentage={percentage}
            lastMonth={`Total ${selectedCount} Orders`}
            onStatusChange={setSelectedStatus}
          />
        </Grid>
        {/* Revenue */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardOrderTile
            menuItems={revenueMenuItems}
            title={
              selectedRevenueFilter === "All"
                ? "Total Revenue"
                : `${selectedRevenueFilter} Revenue`
            }
            amount={filteredRevenue}
            percentage={revenuePercentage}
            lastMonth={`Rs.${filteredRevenue} of Rs.${totalRevenue}`}
            onStatusChange={setSelectedRevenueFilter}
          />
        </Grid>
        {/* Customer */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardOrderTile
            menuItems={customerMenuItems}
            title={
              selectedCustomerFilter === "All"
                ? "Total Customers"
                : `${selectedCustomerFilter} Customers`
            }
            amount={customerCount}
            lastMonth={`${customerCount} of ${totalCustomers} Customers`}
            onStatusChange={setSelectedCustomerFilter}
            isCustomerTile={true}
          />
        </Grid>
        {/* Product Insights */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardOrderTile
            menuItems={productMenuItems}
            title={`${selectedProductFilter} Products`}
            amount={productAmount}
            lastMonth={`${totalProducts} Total Products`}
            onStatusChange={setSelectedProductFilter}
            isProductTile={true}
          />
        </Grid>
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
            <IconButton onClick={() => downloadChart("png")}>
              <Icon component={FileDownloadOutlinedIcon} sx={{ color: colors.iconColor_6 }} />
            </IconButton>
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
        <Box ref={chartRef} component={'div'} sx={{ width: '100%', background: colors.grayLight_1, height: { xs: 250, sm: 300, md: 350, lg: 400 } }}>
          <LineChart
            grid={{ horizontal: { stroke: colors.grayLight_2, strokeWidth: 1, opacity: 1 } }}
            xAxis={[
              {
                // data: chartData[activeRange].xAxis,
                data: salesData.xAxis,
                scaleType: 'band',
                sx: {
                  '& .MuiChartsAxis-line': { stroke: colors.grayLight_2, strokeWidth: 3 },
                  '& .MuiChartsAxis-tickLabel': { fontSize: '16px !important', fontWeight: '600 !important', fill: colors.grayDark_3 },
                },
              },
            ]}
            yAxis={[
              {
                width: 90,
                min: 0,
                max: Math.max(...salesData.series, 0) * 1.2,
                valueFormatter: (v) =>
                  `Rs.${Intl.NumberFormat('en', {
                    notation: 'compact'
                  }).format(v)}`,
                sx: {
                  '& .MuiChartsAxis-line': { stroke: colors.grayLight_2, strokeWidth: 3 },
                  '& .MuiChartsAxis-tickLabel': { fontSize: '14px !important', fontWeight: '600 !important', fill: colors.grayDark_3 },
                }
              },

            ]}
            series={[
              {
                id: 'sales',
                // data: chartData[activeRange].series,
                data: salesData.series,
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

              '& .MuiLineChart-legend': { display: 'none' },
            }}
          // height={300}
          >
            {/* ⬇️ Define the gradient INSIDE the chart */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={colors.grayLight_4} />
                <stop offset="100%" stopColor={colors.blue} />
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
          </Box>
          <Divider />
          <TableContainer  >
            <Table sx={{ minWidth: 650 }} aria-label="recent orders table">
              <TableHead>
                <TableRow >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < orderList.length}
                      checked={orderList.length > 0 && selected.length === orderList.length}
                      onChange={handleSelectAllClick}
                      sx={{
                        color: colors.black,
                        '&.Mui-checked': {
                          color: colors.black,
                        },
                      }} />
                  </TableCell>
                  {/* <TableCell sx={{ fontWeight: 'bold', color: colors.grayDark_1, opacity: 0.8 }}>Product</TableCell> */}
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
                              ? colors.green // Green for Delivered
                              : status === 'Canceled'
                                ? colors.iconColor_2 // Orange for Canceled
                                : status === 'Processing'
                                  ? colors.grayLight_5
                                  : status === 'Shipped'
                                    ? colors.iconColor_8
                                    : colors.iconColor_10, // Default grey
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
                          <TableRow key={purchase?._id} sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            cursor: 'pointer'
                          }}
                            onClick={(e) => {
                              // Prevent navigation if the click is on a checkbox or button inside the row
                              if (
                                e.target.closest('input[type="checkbox"]') ||
                                e.target.closest('button')
                              ) return;

                              navigate(`/admin/orders/${purchase?._id}`);
                            }}
                          >
                            <TableCell padding='checkbox'>
                              <Checkbox
                                checked={isSelected(purchase?._id)}
                                onChange={(e) => {
                                  e.stopPropagation(); // Prevent row click
                                  handleClick(purchase?._id);
                                }}
                                sx={{
                                  color: colors.black,
                                  '&.Mui-checked': {
                                    color: colors.black,
                                  },
                                }} />
                            </TableCell>
                            {/* <TableCell component='th' scope='row' sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>
                                                                  {purchase.product}
                                                              </TableCell> */}
                            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black, }}>#{purchase?.orderId}</TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }}>{formatDate(purchase?.createdAt)}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {/* <Avatar alt={purchase?.customerName}
                                                                          src={purchase?.customerAvatar}
                                                                          sx={{ width: 24, height: 24, mr: 1 }} /> */}
                                <Avatar
                                  {...stringAvatar(purchase?.shippingAddress?.firstName + " " + purchase?.shippingAddress?.lastName || "Unknown User")}
                                  sx={{
                                    ...stringAvatar(purchase?.shippingAddress?.firstName + " " + purchase?.shippingAddress?.lastName || "Unknown User").sx,
                                    width: 30,
                                    height: 30,
                                    fontSize: '14px',
                                  }}
                                />
                                {purchase?.shippingAddress?.firstName} {purchase?.shippingAddress?.lastName}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <StatusDot status={purchase?.status} />
                                <StatusText sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} status={purchase.status}>{purchase?.status}</StatusText>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: '14px', fontWeight: 600, color: colors.black }} align="right">Rs. {purchase?.totalAmount}/-</TableCell>
                          </TableRow>
                        )
                      })
                    :
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="center"
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: colors.textColor_3,
                          py: 3,
                        }}
                      >
                        No Purchases Found
                      </TableCell>
                    </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {totalPages > 1 && (
          <Box component="div" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              shape="rounded"
              boundaryCount={1}
              siblingCount={1}
              variant="outlined"
              renderItem={(item) => {
                if (item.type === "next" && page >= totalPages) return null;
                if (item.type === "previous" && page === 1) return null;

                return (
                  <PaginationItem
                    {...item}
                    slots={{
                      previous: () => (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, pr: 1 }}>
                          <Icon component={ArrowBackIosNewRoundedIcon} sx={{ fontSize: "14px" }} />
                          <Typography variant="button" component="p" >
                            Prev
                          </Typography>
                        </Box>
                      ),
                      next: () => (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, pr: 1 }}>
                          <Typography variant="button" component="p">
                            Next
                          </Typography>
                          <Icon component={ArrowForwardIosRoundedIcon} sx={{ fontSize: "14px" }} />
                        </Box>
                      ),
                    }}
                    sx={{
                      minWidth: item.type === "page" ? 45 : 70,
                      mr: 1,
                      height: 32,
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: item.selected ? colors.white : colors.grayDark_1,
                      border: `1px solid ${colors.borderColor_7}`,
                      "&.Mui-selected": {
                        backgroundColor: colors.greenDark_3,
                        color: colors.white,
                        "&:hover": {
                          backgroundColor: colors.greenDark_1,
                          color: colors.white,
                        },
                      },
                      "&:hover": {
                        backgroundColor: colors.greenDark_1,
                        color: colors.white,
                      },
                    }}
                  />
                );
              }}
            />
          </Box>
        )}
      </Box>

      <AdminFooter />
    </Box>
  )
}

export default Dashboard;
