import {
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme,
  Button,
  Avatar,
  CardHeader
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { timeAgo } from '../../utils/date';
import { helpStyles } from '../../style';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ItemHelp({ help }) {
  const classes = helpStyles();
  return (
    <Card
      component={Link}
      to={`/help/${help._id}`}
    >
      <CardHeader
        className={classes.cardHelpHeader}
        avatar={<Avatar alt="avatar" src={help.userId.avatar} className={classes.cardHelpAvatar}/>}
        title={
          <Typography
            component={Link}
            to={`/u/${help.userId._id}`}
            noWrap={false}
            variant="h6"
            className={classes.userName}
          >
            {help.userId.fullname}
          </Typography>
        }
        subheader={
          <Typography color="textSecondary" gutterBottom variant="body2">
             {timeAgo(new Date(help.createdAt))}
          </Typography>
        }
      />
      <CardContent style={{paddingBottom: 0, paddingTop: 10}}>
        <Typography>
          đang ở gần bạn và gặp sự cố {help.type && `về ${help.type}`}
        </Typography>
        <Button size="small" className={classes.buttonDetail}>
              Chi tiết
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SwipeableViewHelp() {
  const { list } = useSelector(state => state.help);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = list.length;
  const classes = helpStyles();
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
    list.length > 0 && (
      <Card className={classes.help}>
        <div className={classes.helpHeader}>
          <Typography className={classes.title}>Trợ giúp</Typography>
          <div className={classes.fadeLoading}></div>
        </div>
        <div className={classes.helpBody}>
            {list.length > 1 &&
              <IconButton onClick={handleBack} size="small">
                <ChevronLeft />
              </IconButton>
            }
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              interval={5000}
            >
              {list.map(item => (
                <ItemHelp help={item} key={item._id} />
              ))}
            </AutoPlaySwipeableViews>
            {list.length > 1 &&
              <IconButton onClick={handleNext} size="small">
                <ChevronRight />
              </IconButton>
            }
        </div>
      </Card>
    )
  );
}
