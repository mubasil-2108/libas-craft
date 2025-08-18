import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export const adminBar = [
  {
    id: 1,
    name: 'Dashboard',
    icon: DashboardOutlinedIcon,
    link: '/admin/'
  },
  {
    id: 2,
    name: 'All products',
    icon: Inventory2OutlinedIcon,
    link: '/admin/products'
  },
  {
    id: 3,
    name: 'Order list',
    icon: DescriptionOutlinedIcon,
    link: '/admin/orders'
  },
]

export const categories = [
  {
    id: 1,
    name: 'Clothes',
    productsNo: 21
  },
  {
    id: 2,
    name: 'Shoes',
    productsNo: 15
  },
  {
    id: 3,
    name: 'Accessories',
    productsNo: 30
  },
];

export const dummyProducts = [
  {
    id: 1,
    name: 'Energizer Max',
    category: 'Battery',
    price: 110.4,
    summary: 'Reliable battery for everyday use with long-lasting performance.',
    sales: 1269,
    total: 2000,
    image: '/productImg.png'
  },
  {
    id: 2,
    name: 'Duracell Ultra',
    category: 'Battery',
    price: 150.0,
    summary: 'Duracell’s premium battery for high-drain devices.',
    sales: 900,
    total: 1200,
    image: '/productImg.png'
  },
  {
    id: 3,
    name: 'PowerMax Pro',
    category: 'Battery',
    price: 95.0,
    summary: 'Affordable battery with decent capacity and durability.',
    sales: 600,
    total: 1000,
    image: '/productImg.png'
  },
  {
    id: 4,
    name: 'Sony Alkaline',
    category: 'Battery',
    price: 130.5,
    summary: 'Mid-range battery with steady output for electronics.',
    sales: 720,
    total: 1500,
    image: '/productImg.png'
  },
  {
    id: 5,
    name: 'AmazonBasics Cell',
    category: 'Battery',
    price: 80.99,
    summary: 'Good value pack battery option from Amazon.',
    sales: 1100,
    total: 1600,
    image: '/productImg.png'
  },
  {
    id: 6,
    name: 'Panasonic Power',
    category: 'Battery',
    price: 105.5,
    summary: 'Efficient energy battery for day-to-day usage.',
    sales: 1350,
    total: 1800,
    image: '/productImg.png'
  },
  {
    id: 7,
    name: 'Tesla Energy Cell',
    category: 'Battery',
    price: 200.0,
    summary: 'Premium battery inspired by Tesla’s energy tech.',
    sales: 500,
    total: 1000,
    image: '/productImg.png'
  },
  {
    id: 8,
    name: 'Anker Charge Pro',
    category: 'Battery',
    price: 160.75,
    summary: 'Rechargeable battery with high retention capacity.',
    sales: 1000,
    total: 1400,
    image: '/productImg.png'
  },
  {
    id: 9,
    name: 'GP Ultra',
    category: 'Battery',
    price: 120.25,
    summary: 'Well-balanced battery for remotes and toys.',
    sales: 980,
    total: 1300,
    image: '/productImg.png'
  },
  {
    id: 10,
    name: 'Eveready Gold',
    category: 'Battery',
    price: 98.5,
    summary: 'Basic battery for low-power gadgets.',
    sales: 875,
    total: 1200,
    image: '/productImg.png'
  }
];

export const imageTilesData = [
  {
    id: 1,
    name: 'product-thumbnail.png',
    progress: 90,
    status: 'uploaded',
    src: '/watch.jpg',
  },
  {
    id: 2,
    name: 'new-arrival.jpg',
    progress: 100,
    status: 'uploaded',
    src: '/watch.jpg',
  },
  {
    id: 3,
    name: 'summer-sale.jpeg',
    progress: 65,
    status: 'uploading',
    src: '/watch.jpg',
  },
  {
    id: 4,
    name: 'winter-stock.webp',
    progress: 100,
    status: 'uploaded',
    src: '/watch.jpg',
  },
];

export const purchases = [
  {
    id: 1,
    product: 'Lorem Ipsum',
    orderId: '#25426',
    date: 'Nov 8th,2023',
    customerName: 'Kavin',
    customerAvatar: '/avatar.png', // Placeholder avatar
    status: 'Delivered',
    amount: '₹200.00',
  },
  {
    id: 2,
    product: 'Lorem Ipsum',
    orderId: '#25425',
    date: 'Nov 7th,2023',
    customerName: 'Komael',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹200.00',
  },
  {
    id: 3,
    product: 'Lorem Ipsum',
    orderId: '#25424',
    date: 'Nov 6th,2023',
    customerName: 'Nikhil',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹200.00',
  },
  {
    id: 4,
    product: 'Lorem Ipsum',
    orderId: '#25423',
    date: 'Nov 5th,2023',
    customerName: 'Shivam',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹200.00',
  },
  {
    id: 5,
    product: 'Lorem Ipsum',
    orderId: '#25422',
    date: 'Nov 4th,2023',
    customerName: 'Shadab',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹200.00',
  },
  {
    id: 6,
    product: 'Lorem Ipsum',
    orderId: '#25421',
    date: 'Nov 2nd,2023',
    customerName: 'Yogesh',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹200.00',
  },
  {
    id: 7,
    product: 'Lorem Ipsum',
    orderId: '#25423', // Assuming a typo and this is meant to be unique
    date: 'Nov 1st,2023',
    customerName: 'Sunita',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹200.00',
  },
  {
    id: 8,
    product: 'Lorem Ipsum',
    orderId: '#25421', // Assuming a typo and this is meant to be unique
    date: 'Nov 1st,2023', // Assuming a different date for distinctness
    customerName: 'John Doe', // Example
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹200.00',
  },
  {
    id: 9,
    product: 'Lorem Ipsum',
    orderId: '#25420',
    date: 'Oct 31st, 2023',
    customerName: 'Alice',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹250.00',
  },
  {
    id: 10,
    product: 'Lorem Ipsum',
    orderId: '#25419',
    date: 'Oct 30th, 2023',
    customerName: 'Bob',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹180.00',
  },
  {
    id: 11,
    product: 'Lorem Ipsum',
    orderId: '#25418',
    date: 'Oct 29th, 2023',
    customerName: 'Charlie',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹300.00',
  },
  {
    id: 12,
    product: 'Lorem Ipsum',
    orderId: '#25417',
    date: 'Oct 28th, 2023',
    customerName: 'David',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹120.00',
  },
  {
    id: 13,
    product: 'Lorem Ipsum',
    orderId: '#25416',
    date: 'Oct 27th, 2023',
    customerName: 'Eva',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹500.00',
  },
  {
    id: 14,
    product: 'Lorem Ipsum',
    orderId: '#25415',
    date: 'Oct 26th, 2023',
    customerName: 'Frank',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹220.00',
  },
  {
    id: 15,
    product: 'Lorem Ipsum',
    orderId: '#25414',
    date: 'Oct 25th, 2023',
    customerName: 'Grace',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹310.00',
  },
  {
    id: 16,
    product: 'Lorem Ipsum',
    orderId: '#25413',
    date: 'Oct 24th, 2023',
    customerName: 'Henry',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹270.00',
  },
  {
    id: 17,
    product: 'Lorem Ipsum',
    orderId: '#25412',
    date: 'Oct 23rd, 2023',
    customerName: 'Ivy',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹150.00',
  },
  {
    id: 18,
    product: 'Lorem Ipsum',
    orderId: '#25411',
    date: 'Oct 22nd, 2023',
    customerName: 'Jack',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹260.00',
  },
  {
    id: 19,
    product: 'Lorem Ipsum',
    orderId: '#25410',
    date: 'Oct 21st, 2023',
    customerName: 'Karen',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹190.00',
  },
  {
    id: 20,
    product: 'Lorem Ipsum',
    orderId: '#25409',
    date: 'Oct 20th, 2023',
    customerName: 'Leo',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹210.00',
  },
  {
    id: 21,
    product: 'Lorem Ipsum',
    orderId: '#25408',
    date: 'Oct 19th, 2023',
    customerName: 'Mona',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹230.00',
  },
  {
    id: 22,
    product: 'Lorem Ipsum',
    orderId: '#25407',
    date: 'Oct 18th, 2023',
    customerName: 'Nathan',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹300.00',
  },
  {
    id: 23,
    product: 'Lorem Ipsum',
    orderId: '#25406',
    date: 'Oct 17th, 2023',
    customerName: 'Olivia',
    customerAvatar: '/avatar.png',
    status: 'Canceled',
    amount: '₹180.00',
  },
  {
    id: 24,
    product: 'Lorem Ipsum',
    orderId: '#25405',
    date: 'Oct 16th, 2023',
    customerName: 'Paul',
    customerAvatar: '/avatar.png',
    status: 'Delivered',
    amount: '₹250.00',
  },
];

export const CARD_BRANDS = [
  { type: 'visa', label: 'Visa' },
  { type: 'mastercard', label: 'Mastercard' },
  { type: 'amex', label: 'American Express' },
  { type: 'diners', label: 'Diners Club' },
  { type: 'discover', label: 'Discover' },
  { type: 'jcb', label: 'JCB' },
  { type: 'unionpay', label: 'UnionPay' },
  { type: 'maestro', label: 'Maestro' },
  { type: 'mir', label: 'Mir' },
  { type: 'elo', label: 'Elo' },
  { type: 'hiper', label: 'Hiper' },
  { type: 'hipercard', label: 'Hipercard' },
  { type: 'verve', label: 'Verve' },
];

export const productOrders = [
  { product: 'Wireless Headphones', orderId: 'ORD-1001', qty: 2, total: '120.00' },
  { product: 'Smartphone', orderId: 'ORD-1002', qty: 1, total: '699.00' },
  { product: 'Gaming Mouse', orderId: 'ORD-1003', qty: 3, total: '150.00' },
  { product: 'Mechanical Keyboard', orderId: 'ORD-1004', qty: 1, total: '89.00' },
  { product: 'Laptop Stand', orderId: 'ORD-1005', qty: 2, total: '60.00' },
  { product: '4K Monitor', orderId: 'ORD-1006', qty: 1, total: '350.00' },
  { product: 'USB-C Hub', orderId: 'ORD-1007', qty: 4, total: '80.00' },
  { product: 'Bluetooth Speaker', orderId: 'ORD-1008', qty: 1, total: '45.00' },
  { product: 'External Hard Drive', orderId: 'ORD-1009', qty: 2, total: '150.00' },
  { product: 'Fitness Tracker', orderId: 'ORD-1010', qty: 1, total: '99.00' },
  { product: 'Tablet', orderId: 'ORD-1011', qty: 1, total: '299.00' },
  { product: 'Webcam', orderId: 'ORD-1012', qty: 2, total: '140.00' },
  { product: 'Ergonomic Chair', orderId: 'ORD-1013', qty: 1, total: '220.00' },
  { product: 'Desk Lamp', orderId: 'ORD-1014', qty: 2, total: '60.00' },
  { product: 'Smartwatch', orderId: 'ORD-1015', qty: 1, total: '199.00' },
];

export const notifications = [
  { id: 1, title: 'Product Sold', price: 140, date: 'Nov 15, 2023', status: 'Sold' },
  { id: 2, title: 'Order Dispatched', price: 250, date: 'Nov 16, 2023', status: 'Dispatched' },
  { id: 3, title: 'New Review Added', price: null, date: 'Nov 17, 2023', status: 'Review' },
  { id: 4, title: 'Low Stock Alert', price: 99, date: 'Nov 18, 2023', status: 'Stock Low' },
  { id: 5, title: 'Refund Processed', price: 500, date: 'Nov 19, 2023', status: 'Refund' },
  { id: 6, title: 'Product Sold', price: 120, date: 'Nov 20, 2023', status: 'Sold' },
  { id: 7, title: 'Order Dispatched', price: 350, date: 'Nov 21, 2023', status: 'Dispatched' },
  { id: 8, title: 'Low Stock Alert', price: 75, date: 'Nov 22, 2023', status: 'Stock Low' },
  { id: 9, title: 'New Review Added', price: null, date: 'Nov 23, 2023', status: 'Review' },
  { id: 10, title: 'Product Sold', price: 200, date: 'Nov 24, 2023', status: 'Sold' }
];

export const chartData = {
  weekly: {
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [120, 200, 150, 80, 70, 110, 130],
  },
  monthly: {
    xAxis: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [300, 500, 250, 700, 600, 900],
  },
  yearly: {
    xAxis: ['2019', '2020', '2021', '2022', '2023', '2024'],
    series: [2000, 2500, 1800, 3000, 4000, 4500],
  },
};