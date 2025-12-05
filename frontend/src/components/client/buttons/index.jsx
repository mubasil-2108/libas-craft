import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

export const CartButton = ({
  width = "180px",
  height = "50px",
  borderRadius = "25px",
  fontSize = "16px",
  textColor = "#F5FFF5",
  bgColor1 = "#316D52",
  bgColor2 = "#1E4434",
  hoverColor1 = "#316D52",
  hoverColor2 = "#2D6A4F",
  shadowColor = "rgba(49, 109, 82, 0.4)",
  successColor1 = "#2D6A4F",
  successColor2 = "#1E4434",
  progressColor = "#F5FFF5",
  handleCartAction,
  isInCart
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return; // prevent double-click
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
        handleCartAction();
    }, 1500); // reset after animation
  };

  return (
    <CartButtonWrapper
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontSize={fontSize}
      textColor={textColor}
      bgColor1={bgColor1}
      bgColor2={bgColor2}
      hoverColor1={hoverColor1}
      hoverColor2={hoverColor2}
      shadowColor={shadowColor}
      successColor1={successColor1}
      successColor2={successColor2}
      progressColor={progressColor}
      $isAnimating={isAnimating}
    >
      <Box component='div'>
        <Box
          component='label'
          className={`cart-button ${isAnimating ? 'animating' : ''}`}
          onClick={handleClick}
        >
          <Typography component='span' className="cart-icon">
            <Box
              component='svg'
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <Box component='circle' r={1} cy={21} cx={9} />
              <Box component='circle' r={1} cy={21} cx={20} />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </Box>
          </Typography>
          {isInCart ? "Remove from Cart" : "Add to Cart"}
          <Box component='div' className="progress-bar" />
        </Box>
      </Box>
    </CartButtonWrapper>
  );
};

const CartButtonWrapper = styled.div`
  .cart-button {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: ${({ borderRadius }) => borderRadius};
    font-size: ${({ fontSize }) => fontSize};
    color: ${({ textColor }) => textColor};
    background: linear-gradient(135deg, ${({ bgColor1, bgColor2 }) => `${bgColor1}, ${bgColor2}`});
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px ${({ shadowColor }) => shadowColor};
  }

  .cart-button:hover {
    background: linear-gradient(135deg, ${({ hoverColor1, hoverColor2 }) => `${hoverColor1}, ${hoverColor2}`});
    transform: scale(1.05);
  }

  .cart-button:active {
    transform: scale(0.95) translateY(2px);
    box-shadow: 0 4px 10px ${({ shadowColor }) => shadowColor};
  }

  .cart-icon svg {
    vertical-align: middle;
    width: 20px;
    height: 20px;
    color: ${({ textColor }) => textColor};
    transition: all 0.3s ease;
  }

  .cart-button:hover .cart-icon svg {
    transform: scale(1.1);
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: ${({ progressColor }) => progressColor};
    width: 0;
  }

  @keyframes progress {
    0% { width: 0; }
    100% { width: 100%; }
  }

  .cart-button.animating .progress-bar {
    animation: progress 1s ease-in-out forwards;
  }

  .cart-button.animating {
    animation: addToCart 1.5s ease-in-out forwards;
  }

  @keyframes addToCart {
    0% { opacity: 0.8; }
    66% {
      background: linear-gradient(135deg, ${({ bgColor1, bgColor2 }) => `${bgColor1}, ${bgColor2}`});
    }
    67% {
      background: linear-gradient(135deg, ${({ successColor1, successColor2 }) => `${successColor1}, ${successColor2}`});
    }
    100% { opacity: 1; }
  }

  @keyframes addedToCart {
    0% { transform: scale(1); }
    50% { transform: scale(1.4) rotate(45deg); }
    100% { transform: scale(1) rotate(0); }
  }

  .cart-button.animating .cart-icon {
    animation: addedToCart 0.5s ease-in-out 1s;
  }
`;
