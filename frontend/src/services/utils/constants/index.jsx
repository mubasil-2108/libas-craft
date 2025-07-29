import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export const adminBar = [
    {
        id: 1,
        name: 'Dashboard',
        icon: DashboardOutlinedIcon,
        link: '/admin/dashboard'
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

