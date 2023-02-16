import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

function HomeCarousel(params) {
    
    const items = [
        { title: 'Item 1', image: '../../assets/HomeCarouselImg/1.PNG' },
        { title: 'Item 2', image: '/images/item2.jpg' },
        { title: 'Item 3', image: '/images/item3.jpg' },
    ];
    
    const [currentItem, setCurrentItem] = useState(0);

    const handleNext = () => {
        setCurrentItem(currentItem === items.length - 1 ? 0 : currentItem + 1);
      };
      
    const handlePrevious = () => {
    setCurrentItem(currentItem === 0 ? items.length - 1 : currentItem - 1);
    };

    return (
        <Box sx={{ position: 'relative' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {items[currentItem].title}
        </Typography>
        <img src={items[currentItem].image} alt={items[currentItem].title} />
        <IconButton
          sx={{ position: 'absolute', left: 0 }}
          onClick={handlePrevious}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          sx={{ position: 'absolute', right: 0 }}
          onClick={handleNext}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
      
    )
}

export default HomeCarousel;
    