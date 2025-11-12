import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { colors } from '../color';
// import PaymentIcon from '@mui/icons-material/Payment';
// import { TbPackageImport } from "react-icons/tb";
// import { BiSupport } from "react-icons/bi";

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

export const reasons = [
  {
    id: 1,
    reason: 'Natural\nIngredients',
    image: '/ingrediants.png',
  },
  {
    id: 2,
    reason: 'Cruelty Free',
    image: '/cruelity-free.png',
  },
  {
    id: 3,
    reason: 'Eco-friendly\nPackagaing',
    image: '/eco-friendly.png',
  }
]

export const dummyOrders = [
  {
    id: 1,
    productName: "Classic Leather Watch",
    image: "/watch.jpg",
    price: 150,
    steps: ["Ordered", "Payment", "Confirmation", "Delivery"],
    activeStep: 2, // currently at "Confirmation"
  },
  {
    id: 2,
    productName: "Wireless Bluetooth Headphones",
    image: "/watch.jpg",
    price: 250,
    steps: ["Ordered", "Payment", "Confirmation", "Delivery"],
    activeStep: 1, // currently at "Payment"
  },
  {
    id: 3,
    productName: "Smart Fitness Band",
    image: "/watch.jpg",
    price: 180,
    steps: ["Ordered", "Payment", "Confirmation", "Delivery"],
    activeStep: 3, // completed
  },
  {
    id: 4,
    productName: "Men's Running Shoes",
    image: "/watch.jpg",
    price: 320,
    steps: ["Ordered", "Payment", "Confirmation", "Delivery"],
    activeStep: 0, // just ordered
  },
];

export const dummyCart = [
  {
    id: 1,
    name: 'Classic Leather Watch',
    price: 150.0,
    image: '/watch.jpg',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Smart Fitness Band',
    price: 200.0,
    image: '/watch.jpg',
    quantity: 2,
  },
   {
    id: 3,
    name: 'Smart Fitness Band',
    price: 200.0,
    image: '/watch.jpg',
    quantity: 2,
  },
   {
    id: 4,
    name: 'Smart Fitness Band',
    price: 200.0,
    image: '/watch.jpg',
    quantity: 2,
  },
  {
    id: 5,
    name: 'Smart Fitness Band',
    price: 200.0,
    image: '/watch.jpg',
    quantity: 2,
  },
];

export const dummyCatalog = [
  {
    id: 1,
    name: "Luxury Watch",
    price: 1500,
    description:
      "Elegant timepiece with premium leather strap and water-resistant design.",
    image: "/watch.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Classic Chrono",
    price: 2000,
    description:
      "Timeless chronograph with a bold stainless steel body and precise movement.",
    image: "/watch.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Modern Minimal",
    price: 1200,
    description:
      "Sleek and minimal design perfect for casual and formal occasions.",
    image: "/watch.jpg",
    rating: 4,
  },
  {
    id: 4,
    name: "Titan Edge",
    price: 2500,
    description:
      "Ultra-slim design crafted for comfort and durability with premium materials.",
    image: "/watch.jpg",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Aviator Series",
    price: 1800,
    description:
      "Inspired by aviation, this watch features precision and bold aesthetics.",
    image: "/watch.jpg",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Vintage Gold",
    price: 2200,
    description:
      "A retro gold finish with fine craftsmanship for a timeless look.",
    image: "/watch.jpg",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Smart Analog",
    price: 2700,
    description:
      "A hybrid analog smartwatch with modern features and classic appeal.",
    image: "/watch.jpg",
    rating: 4.6,
  },
  {
    id: 8,
    name: "Steel Force",
    price: 2100,
    description:
      "Rugged stainless steel construction with superior performance design.",
    image: "/watch.jpg",
    rating: 4.4,
  },
  {
    id: 9,
    name: "Midnight Black",
    price: 1900,
    description:
      "Matte black aesthetic with luminous dials and bold wrist presence.",
    image: "/watch.jpg",
    rating: 4.9,
  },
  {
    id: 10,
    name: "Royal Blue",
    price: 2300,
    description:
      "Blue dial luxury watch combining precision engineering and style.",
    image: "/watch.jpg",
    rating: 4.2,
  },
];


export const clientBar = [
  {
    id: 1,
    name: 'Home',
    icon: HomeOutlinedIcon,
    link: '/'
  },
  {
    id: 2,
    name: 'Catalog',
    icon: ShoppingBagOutlinedIcon,
    link: '/collections/all'
  },
  {
    id: 3,
    name: 'Contact',
    icon: PhoneOutlinedIcon,
    link: '/contact'
  },
];

export const socialMediaLinks = [
  {
    id: 1,
    icon: FacebookIcon,
    name: 'Facebook',
    link: 'https://www.facebook.com/'
  },
  {
    id: 2,
    icon: WhatsAppIcon,
    name: 'WhatsApp',
    link: 'https://web.whatsapp.com/'
  },
  {
    id: 3,
    icon: FaSnapchatGhost,
    name: 'Snapchat',
    link: 'https://www.snapchat.com/'
  },
  {
    id: 4,
    icon: FaTiktok,
    name: 'TikTok',
    link: 'https://www.tiktok.com/'
  },
  {
    id: 5,
    icon: InstagramIcon,
    name: 'Instagram',
    link: 'https://www.instagram.com/'
  }
];

export const dummyPackages = [
  {
    id: 1,
    title: "Living Room Special Set",
    price: "229.99",
    rating: 5,
    description: "A perfect combination of comfort and elegance for your living space.",
    image: "/watch.jpg",
  },
  {
    id: 2,
    title: "Modern Wooden Chair",
    price: "149.50",
    rating: 4.5,
    description: "Crafted with high-quality wood, ideal for both indoor and outdoor use.",
    image: "/watch.jpg",
  },
  {
    id: 3,
    title: "Minimalist Table Lamp",
    price: "89.99",
    rating: 4,
    description: "Soft, ambient lighting that complements any modern interior.",
    image: "/watch.jpg",
  },
  {
    id: 4,
    title: "Premium Leather Sofa",
    price: "899.00",
    rating: 5,
    description: "Luxury and comfort combined in one elegant leather design.",
    image: "/watch.jpg",
  },
  {
    id: 5,
    title: "Wall Art Canvas Set",
    price: "199.99",
    rating: 4.5,
    description: "Set of 3 premium-quality abstract art pieces for your walls.",
    image: "/watch.jpg",
  },
];


export const benefits = [
  {
    id: 1,
    name: 'Payment Method',
    desc: 'We offer flexible payment\noptions, to make easier.',
    image: '/payment-method.png',
    bgColor: colors.blueLight_1
  },
  {
    id: 2,
    name: 'Return Policy',
    desc: 'You can return a product\nwithin 30 days.',
    image: '/return-policy.png',
    bgColor: colors.grayLight_9
  },
  {
    id: 3,
    name: 'Customer Support',
    desc: 'Our customer support\nis 24/7.',
    image: '/customer-support.png',
    bgColor: colors.greenLight_2
  },
];

export const dummyCategories = [
  { id: 1, name: 'Skincare', image: '/images/skincare.png' },
  { id: 2, name: 'Haircare', image: '/images/haircare.png' },
  { id: 3, name: 'Makeup', image: '/images/makeup.png' },
  { id: 4, name: 'Fragrance', image: '/images/fragrance.png' },
  { id: 5, name: 'Body & Bath', image: '/images/bodybath.png' },
  { id: 6, name: 'Wellness', image: '/images/wellness.png' },
  { id: 7, name: 'Skincare', image: '/images/skincare.png' },
  { id: 8, name: 'Haircare', image: '/images/haircare.png' },
  { id: 9, name: 'Makeup', image: '/images/makeup.png' },
  { id: 10, name: 'Fragrance', image: '/images/fragrance.png' },
  { id: 11, name: 'Body & Bath', image: '/images/bodybath.png' },
  { id: 12, name: 'Wellness', image: '/images/wellness.png' },
];

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

export const images = [
  '/watch.jpg',
  '/herbal.png',
  '/master-card.png',
  '/news-letter.jpg',
  '/watch.jpg',
  '/herbal.png',
  '/master-card.png',
  '/news-letter.jpg',
];
export const productSections = [
  {
    title: "Product Description",
    paragraph:
      "This herbal supplement supports healthy immune function and overall well-being. Made from natural ingredients with no artificial preservatives. This herbal supplement supports healthy immune function and overall well-being. Made from natural ingredients with no artificial preservatives.",
  },
  {
    title: "Benefits",
    points: [
      "Boosts immune system naturally",
      "Supports respiratory health",
      "Rich in antioxidants",
      "100% herbal composition",
    ],
  },
  {
    title: "Product Details",
    points: [
      "Form: Capsule",
      "Packaging: 60 capsules per bottle",
      "Shelf Life: 24 months",
    ],
  },
  {
    title: "More Details",
    paragraph:
      "This product is manufactured in GMP-certified facilities ensuring purity, safety, and potency.",
  },
];
export const ratings = [
  { stars: 5, value: 90 },
  { stars: 4, value: 70 },
  { stars: 3, value: 40 },
  { stars: 2, value: 20 },
  { stars: 1, value: 10 },
];

export const reviews = [
  {
    id: 1,
    name: "Nicolas Cage",
    avatarName: "Nicolas Cage",
    rating: 4.5,
    title: "Great Product",
    comment:
      "Absolutely love this sideboard! The build quality and design are excellent. It fits perfectly in my living room.",
    daysAgo: "3 Days ago",
  },
  {
    id: 2,
    name: "Emma Watson",
    avatarName: "Emma Watson",
    rating: 5,
    title: "Perfect Choice",
    comment:
      "This product exceeded my expectations. The materials feel premium and the finish is flawless. Highly recommended!",
    daysAgo: "1 Week ago",
  },
  {
    id: 3,
    name: "Chris Evans",
    avatarName: "Chris Evans",
    rating: 3.5,
    title: "Good but not great",
    comment:
      "The product is decent, but I expected a bit more for the price. Still, it works well for my needs.",
    daysAgo: "2 Weeks ago",
  },
  {
    id: 4,
    name: "Scarlett Johansson",
    avatarName: "Scarlett Johansson",
    rating: 4,
    title: "Stylish and Useful",
    comment:
      "Really stylish design and easy to assemble. Adds a modern touch to my room.",
    daysAgo: "1 Month ago",
  },
  {
    id: 5,
    name: "Robert Downey Jr.",
    avatarName: "Robert Downey Jr.",
    rating: 5,
    title: "Worth Every Penny",
    comment:
      "Incredible quality! I’ve received so many compliments. It’s sturdy, elegant, and looks amazing.",
    daysAgo: "2 Months ago",
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
  },
  {
    id: 11,
    name: 'Anker Fast Charger',
    category: 'Charger',
    price: 45.99,
    summary: '20W fast charger with USB-C port for smartphones.',
    sales: 1500,
    total: 2000,
    image: '/productImg.png'
  },
  {
    id: 12,
    name: 'Belkin BoostCharge',
    category: 'Charger',
    price: 60.5,
    summary: 'Durable charger with dual USB output.',
    sales: 1200,
    total: 1800,
    image: '/productImg.png'
  },
  {
    id: 13,
    name: 'Samsung Adaptive Charger',
    category: 'Charger',
    price: 39.99,
    summary: 'Adaptive fast charging for Samsung Galaxy series.',
    sales: 900,
    total: 1500,
    image: '/productImg.png'
  },
  {
    id: 14,
    name: 'Apple MagSafe Charger',
    category: 'Charger',
    price: 99.0,
    summary: 'Wireless charging for iPhone with MagSafe tech.',
    sales: 800,
    total: 1200,
    image: '/productImg.png'
  },
  // 🔋 Power Banks
  {
    id: 15,
    name: 'Xiaomi Power Bank 20k',
    category: 'Power Bank',
    price: 75.25,
    summary: '20000mAh high-capacity portable power bank.',
    sales: 1900,
    total: 2500,
    image: '/productImg.png'
  },
  {
    id: 16,
    name: 'Anker PowerCore Slim',
    category: 'Power Bank',
    price: 65.0,
    summary: 'Compact 10000mAh power bank with fast charging.',
    sales: 1100,
    total: 1500,
    image: '/productImg.png'
  },
  {
    id: 17,
    name: 'RAVPower SuperBank',
    category: 'Power Bank',
    price: 120.0,
    summary: '30000mAh massive capacity with PD support.',
    sales: 600,
    total: 1000,
    image: '/productImg.png'
  },
  // 🌞 Solar Panels
  {
    id: 18,
    name: 'EcoFlow Solar 110W',
    category: 'Solar Panel',
    price: 250.0,
    summary: 'Foldable solar panel for outdoor adventures.',
    sales: 450,
    total: 800,
    image: '/productImg.png'
  },
  {
    id: 19,
    name: 'Renogy Solar Kit',
    category: 'Solar Panel',
    price: 400.5,
    summary: '400W complete solar kit for RVs and camping.',
    sales: 300,
    total: 600,
    image: '/productImg.png'
  },
  {
    id: 20,
    name: 'Jackery SolarSaga',
    category: 'Solar Panel',
    price: 199.99,
    summary: 'Durable 100W solar panel for power stations.',
    sales: 500,
    total: 700,
    image: '/productImg.png'
  },
  // ⚡ Inverters
  {
    id: 21,
    name: 'Sukam Pure Sine',
    category: 'Inverter',
    price: 350.0,
    summary: 'Pure sine wave inverter for home appliances.',
    sales: 250,
    total: 500,
    image: '/productImg.png'
  },
  {
    id: 22,
    name: 'Luminous EcoVolt',
    category: 'Inverter',
    price: 280.5,
    summary: 'Eco-friendly inverter with smart load sharing.',
    sales: 400,
    total: 700,
    image: '/productImg.png'
  },
  {
    id: 23,
    name: 'Tesla Power Inverter',
    category: 'Inverter',
    price: 600.0,
    summary: 'High-tech inverter designed for solar integration.',
    sales: 180,
    total: 400,
    image: '/productImg.png'
  },
  // 📱 Smart Devices
  {
    id: 24,
    name: 'Google Nest Thermostat',
    category: 'Smart Device',
    price: 250.0,
    summary: 'Smart home thermostat with energy-saving AI.',
    sales: 700,
    total: 1000,
    image: '/productImg.png'
  },
  {
    id: 25,
    name: 'Amazon Echo Dot',
    category: 'Smart Device',
    price: 50.0,
    summary: 'Voice assistant smart speaker with Alexa.',
    sales: 3000,
    total: 5000,
    image: '/productImg.png'
  },
  {
    id: 26,
    name: 'Philips Hue Smart Bulb',
    category: 'Smart Device',
    price: 30.0,
    summary: 'Wi-Fi enabled bulb with millions of colors.',
    sales: 2200,
    total: 4000,
    image: '/productImg.png'
  },
  {
    id: 27,
    name: 'Ring Video Doorbell',
    category: 'Smart Device',
    price: 180.0,
    summary: 'Smart doorbell with HD video and motion alerts.',
    sales: 1200,
    total: 2000,
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