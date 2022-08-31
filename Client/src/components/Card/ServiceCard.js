import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  Typography
} from '@material-ui/core';
import { Star } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { cardStyles } from '../../style';
import { getStar } from '../../utils/utils';
import { ServiceDetail } from '../Service/ServiceDetail';

export default function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);

  const classes = cardStyles();

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    setOpen(open);
  };

  return (
    <Card className={classes.cardContainer}>
      <CardMedia
        className={classes.image}
        image={service.images[0]}
        alt={service.name}
        title={service.name}
      />
      <CardContent>
        <Typography
          component={Link}
          to={'/service/' + service._id}
          className={classes.locationName}
          variant="h6"
        >
          {service.name.length > 30
            ? service.name.slice(0, 30) + '...'
            : service.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        <div className={classes.star}>
          <Typography>{getStar(service.star)}</Typography>
          <Star className={classes.starIcon} />
        </div>
        <Button className={classes.seeMore} onClick={toggleDrawer(true)}>
          Xem thêm
        </Button>
        <Drawer
          anchor={'right'}
          open={open}
          onClose={toggleDrawer(false)}
          style={{ zIndex: 10 }}
        >
          <ServiceDetail service={service} handleClose={toggleDrawer(false)} />
        </Drawer>
      </CardActions>
    </Card>
  );
}
