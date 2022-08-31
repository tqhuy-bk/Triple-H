import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
  Drawer
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import * as tourAction from '../../redux/actions/createTourAction';
import { useDispatch, useSelector } from 'react-redux';
import { tourdetailStyles } from '../../style';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { ServiceDetail } from './ServiceDetail';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ServiceRecommendItem({ service }) {
  const { recommendService } = useSelector(state => state.createTour);
  const { indexDate, indexEvent } = recommendService;
  const classes = tourdetailStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    setOpen(open);
  };

  const addToDate = () => {
    dispatch(
      tourAction.addService({
        service,
        indexDate: indexDate,
        indexEvent: indexEvent
      })
    );
  };

  return (
    <>
      <Card>
        <CardMedia
          className={classes.media}
          image={service?.images[0]}
          title={service?.name}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            onClick={toggleDrawer(true)}
            className={classes.serviceName}
          >
            {service?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {service?.andress}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {service?.cost}
          </Typography>
        </CardContent>
        <CardActions className={classes.buttonWrapper}>
          <Button
            size="small"
            onClick={addToDate}
            className={classes.reviewBtn}
            style={{ marginBlock: 10 }}
          >
            Thêm dịch vụ
          </Button>
        </CardActions>
      </Card>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer(false)}
        style={{ zIndex: 10 }}
      >
        <ServiceDetail
          service={service}
          // state={state}
          // getServiceDetail={getServiceDetail}
          handleClose={toggleDrawer}
        />
      </Drawer>
    </>
  );
}

export default function ServiceRecommend({ services }) {
  const classes = tourdetailStyles();

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = services.length;
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
    <div style={{ marginTop: 30, borderTop:"1px solid #a9a9a9" }}>
      <Typography variant="h6" style={{marginLeft: 30}}>Dịch vụ gần đó:</Typography>
      <div className={classes.serviceRecommendWrapper}>
        <div style={{ marginTop: 130 }}>
          {services.length > 1 && (
            <IconButton onClick={handleBack} size="small">
              <ChevronLeft />
            </IconButton>
          )}
        </div>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={5000}
        >
          {services.map(item => (
            <ServiceRecommendItem key={item._id} service={item} />
          ))}
        </AutoPlaySwipeableViews>
        <div style={{ marginTop: 130 }}>
          {services.length > 1 && (
            <IconButton onClick={handleNext} size="small">
              <ChevronRight />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}
