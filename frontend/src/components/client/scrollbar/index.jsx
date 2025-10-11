import React, { useRef } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function CustomScrollComponent() {
  const scrollRef = useRef(null);

  const scrollTo = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 100; // Adjust scroll distance
      const currentScroll = scrollRef.current.scrollTop;

      if (direction === 'up') {
        scrollRef.current.scrollTo({
          top: currentScroll - scrollAmount,
          behavior: 'smooth',
        });
      } else if (direction === 'down') {
        scrollRef.current.scrollTo({
          top: currentScroll + scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <Stack alignItems="center" spacing={1}>
      {/* 1. Scrollable Content Area */}
      <Box
        ref={scrollRef}
        sx={{
          height: 300, // Fixed height to enable scrolling
          overflowY: 'auto',
          width: 300, // Example width
          border: '1px solid #eee',
          // APPLY THE CUSTOM SCROLLBAR STYLES HERE
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(96, 125, 139, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
        }}
      >
        {/* Lots of content to make it scrollable */}
        {Array.from({ length: 50 }).map((_, i) => (
          <Box key={i} p={1} borderBottom="1px dotted #ccc">
            Item {i + 1}
          </Box>
        ))}
      </Box>

      {/* 2. Custom Navigation Buttons */}
      <Stack direction="column" spacing={1} alignItems="center">
        {/* Up Button (Light Blue/Teal background in your image) */}
        <IconButton
          onClick={() => scrollTo('up')}
          sx={{
            color: 'primary.main', // Icon color (up arrow)
            backgroundColor: 'lightblue', // Light background
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>

        {/* Down Button (Pink/Red background in your image) */}
        <IconButton
          onClick={() => scrollTo('down')}
          sx={{
            color: 'error.main', // Icon color (down arrow)
            backgroundColor: 'pink', // Pink background
            '&:hover': {
              backgroundColor: 'error.light',
            },
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default CustomScrollComponent;