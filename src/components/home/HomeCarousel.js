import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import FirstImg from '../../assets/HomeCarouselImg/1.png';
import SecondImg from '../../assets/HomeCarouselImg/2.png';
import ThirdImg from '../../assets/HomeCarouselImg/3.png';


function HomeCarousel() {
    
    const items = [
        { title: 'Item 1', image: FirstImg },
        { title: 'Item 2', image: SecondImg },
        { title: 'Item 3', image: ThirdImg },
    ];
    
    const [currentItem, setCurrentItem] = useState(0);

    const handleNext = () => {
        setCurrentItem(currentItem === items.length - 1 ? 0 : currentItem + 1);
      };
      
    const handlePrevious = () => {
    setCurrentItem(currentItem === 0 ? items.length - 1 : currentItem - 1);
    };

    return (
        <Box sx={{ position: '', width: "100%" }}>
          <img src={items[currentItem].image} width="100%" alt={items[currentItem].title} />
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
    