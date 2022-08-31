import React, { useState } from 'react';
import { IconButton, Typography, useTheme } from '@material-ui/core';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { sliderStyles } from '../../style';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const data = [
  {
    label: 'one',
    title: 'Khám phá mọi nơi cùng Triple H',
    subtitle: "It's time to travel",
    imgPath: '/slider1.jpg',
    color: 'white',
    description: 'Ảnh: Núi rừng Tây Bắc'
  },
  {
    label: 'two',
    title: 'Khám phá mọi nơi cùng Triple H',
    subtitle: '',
    imgPath: '/slider2.jpg',
    color: 'white',
    description: 'Ảnh: Cầu Vàng - Bà Nà Hills'
  },
  {
    label: 'three',
    title: 'Khám phá mọi nơi cùng Triple H',
    subtitle: '',
    imgPath: '/slider3.jpg',
    color: 'white',
    description: 'Ảnh: Chùa Trấn Quốc - Hà Nội'
  }
];

export default function Slider() {
  const classes = sliderStyles();

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = data.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1) setActiveStep(0);
    else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) setActiveStep(maxSteps - 1);
    else setActiveStep(activeStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <div className={classes.container}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={9000}
      >
        {data.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 1 ? (
              <div
                style={{
                  background: `linear-gradient(rgb(63 60 60 / 75%),rgb(140 136 136 / 60%)), url(${step.imgPath})`,
                  color: step.color
                }}
                className={classes.img}
              >
                <IconButton
                  onClick={handleBack}
                  className={classes.button}
                  style={{
                    color: step.color
                  }}
                >
                  <ChevronLeft className={classes.icon} />
                </IconButton>

                <div className={classes.textCover}>
                  <Typography variant="h2" className={classes.title}>
                    {step.title}
                  </Typography>
                  <Typography variant="h4" className={classes.subtitle}>
                    {step.subtitle}
                  </Typography>
                  <Typography className={classes.description}>
                    {step.description}
                  </Typography>
                </div>
                <IconButton
                  onClick={handleNext}
                  className={classes.button}
                  style={{
                    color: step.color
                  }}
                >
                  <ChevronRight className={classes.icon} />
                </IconButton>
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}
