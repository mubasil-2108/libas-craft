import React, { useEffect } from 'react';
import { Box, Button, Rating, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../store/slices/cartSlice';
import { fetchReviewsByProduct } from '../../../store/slices/reviewsSlice';

const ProductTile = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const productId = item?._id;
  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(fetchReviewsByProduct(productId));
    };
    if (productId) {
      fetchProduct();
    }
  }, [dispatch, productId]);
  const { productReviews } = useSelector((state) => state.reviews);

  const averageRating = productReviews?.length
    ? productReviews?.reduce((sum, r) => sum + r.rating, 0) / productReviews?.length
    : 0;
    const discountAmount = item.regularPrice - item.salePrice;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const isInCart = cartItems.some(i => i.id === item.id);

  const handleCartAction = (e) => {
    e.stopPropagation(); // prevent navigation
    if (isInCart) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        rating: item.rating,
        quantity: 1, // initial quantity
      }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1, sm: 2, md: 3 },
        width: "100%",
      }}
      onClick={() => navigate(`/collections/${item?._id}`)}
    >
      <CardBox isMobile={isMobile}>
        {
          item && item?.salePrice && (
            <Ribbon isMobile={isMobile} title={`"Save - Rs. ${discountAmount}"`}/>
          )
        }


        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                width: "100%",
                height: isMobile ? 130 : { sm: 180, md: 200 },
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                overflow: "hidden",
              }}
            >
              <Box
                component='img'
                src={`https://www.googleapis.com/drive/v3/files/${item?.productPhoto?.[0]?.id}?alt=media&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                alt='Product'
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box sx={{ px: { xs: 1.2, sm: 2 }, py: { xs: 0.8, sm: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center", md: "center" },
                  mb: 0.8,
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'openSans-bold',
                    fontSize: isMobile ? "14px" : { sm: "18px", md: "20px" },
                    color: colors.textColor_10,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item?.productName?.slice(0, 10) + "..."}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'openSans-bold',
                    fontSize: isMobile ? "14px" : { sm: "18px", md: "20px" },
                    color: colors.textColor_10,
                  }}
                >
                  Rs.{item?.salePrice}
                </Typography>
              </Box>

              <Rating
                size={isMobile ? "small" : "medium"}
                name="read-only"
                value={averageRating}
                precision={0.5}
                readOnly
                sx={{ color: colors.iconColor_16, mb: isMobile ? 0.5 : 1 }}
              />

              <Typography
                sx={{
                  fontFamily: 'openSans-regular',
                  fontSize: isMobile ? "11px" : { sm: "13px", md: "14px" },
                  color: colors.textColor_1,
                  opacity: 0.8,
                  lineHeight: 1.4,
                }}
              >
                {item?.productDescription?.slice(0, isMobile ? 60 : 70) + "..."}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button
              variant='contained'
              onClick={handleCartAction}
              sx={{
                width: "100%",
                borderRadius: "0 0 20px 20px",
                py: isMobile ? 0.8 : 1.5,
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: 600,
                textTransform: "none",
                background: `linear-gradient(90deg, ${colors.greenDark_1} 0%, ${colors.teal} 100%)`,
                "&:hover": !isMobile && {
                  background: `linear-gradient(90deg, ${colors.teal} 0%, ${colors.greenDark_1} 100%)`,
                },
              }}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </Box>
        </Box>
      </CardBox>
    </Box>
  );
};

// Responsive card wrapper
const CardBox = styled(Box)(({ isMobile }) => ({
  width: isMobile ? '150px' : '300px',
  borderRadius: 20,
  justifyContent: "space-between",
  background: `linear-gradient(170deg, ${colors.grayLight_1} 0%, ${colors.white} 100%)`,
  position: "relative",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: isMobile ? "none" : "scale(1.03)",
    boxShadow: isMobile ? "0 8px 25px rgba(0,0,0,0.15)" : "0 25px 50px rgba(0,0,0,0.45)",
  },
}));

// Responsive ribbon
const Ribbon = styled(Typography)(({ isMobile, title }) => ({
  position: 'absolute',
  overflow: 'hidden',
  width: isMobile ? '90px' : '120px',
  height: isMobile ? '90px' : '120px',
  top: isMobile ? '-6px' : '-10px',
  left: isMobile ? '-6px' : '-10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  "&::before": {
    content: `${title}`,
    position: "absolute",
    width: "150%",
    height: isMobile ? 25 : 35,
    backgroundImage: `linear-gradient(45deg, ${colors.greenDark_1} 0%, ${colors.teal} 51%, ${colors.greenDark_2} 100%)`,
    transform: "rotate(-45deg) translateY(-20px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 600,
    fontSize: isMobile ? "8px" : "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    boxShadow: "0 5px 10px rgba(0,0,0,0.23)",
  },
}));

export default ProductTile;
