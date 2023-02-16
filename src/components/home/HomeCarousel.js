import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import FirstImg from '../../assets/HomeCarouselImg/1.png';
import SecondImg from '../../assets/HomeCarouselImg/2.png';
import ThirdImg from '../../assets/HomeCarouselImg/3.png';


const items = [
  { title: 'Item 1', image: FirstImg },
  { title: 'Item 2', image: SecondImg },
  { title: 'Item 3', image: ThirdImg },
];

const Carousel = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Start the timer when the component mounts
    setTimer(setInterval(handleNext, 10000));

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleNext = () => {
    setCurrentItem(currentItem === items.length - 1 ? 0 : currentItem + 1);
  };

  const handlePrevious = () => {
    setCurrentItem(currentItem === 0 ? items.length - 1 : currentItem - 1);
  };

  const handleInteraction = () => {
    // Reset the timer when the user interacts with the carousel
    clearInterval(timer);
    setTimer(setInterval(handleNext, 10000));
  };

  return (
    <Box
      sx={{
        width: 'inherit',
        height: '640px',
        margin: 'auto',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
      onTouchStart={handleInteraction}
      onMouseDown={handleInteraction}
    >
      {items.map((item, index) => (
        <Box
          key={item.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentItem ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s',
              transform:
                index === currentItem ? 'translateX(0)' : 'translateX(100%)',
            }}
          />
        </Box>
      ))}
      <IconButton
        sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handlePrevious}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handleNext}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

export default Carousel;
