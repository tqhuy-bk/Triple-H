import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ImageList from '../../components/Modal/ImageList';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { eventStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import { NotFound } from '../404';

export default function EventPage(props) {
  const [event, setEvent] = useState();
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();

  const getEvent = async id => {
    await customAxios()
      .get(`/event/${id}`)
      .then(res => {
        setEvent(res.data.event);
      })
      .catch(err => {
        if (err.response.status === 404) setNotFound(true);
      });
  };

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
  }, [id]);

  const classes = eventStyles();

  useEffect(() => {
    if (event?.fullname) {
      document.title = event.fullname;
    }
  }, [event]);

  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <Grid container className={classes.container}>
          {event && (
            <>
              <SpeedDialButton />
              <Grid item md={12}>
                <div className={classes.center}>
                  <div className={classes.coverText}>
                    <Typography variant="h2" className={classes.fullname}>
                      {event.fullname}
                    </Typography>
                    {event.provinceId && (
                      <div className={classes.provinceName}>
                        <>
                          <LocationOn className={classes.locationIcon} />
                          <Typography
                            variant="h4"
                            component={Link}
                            to={`/province/${event.provinceId.name}`}
                          >
                            {event.provinceId.fullname}
                          </Typography>
                        </>
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
              <Container>
                <Card className={classes.cardContent}>
                  <CardContent>
                    <Typography variant="h4" style={{ marginBottom: 20 }}>
                      {event.fullname}
                    </Typography>
                    <Typography variant="h5">Thời gian:</Typography>
                    <Typography style={{ padding: 10 }}>
                      {event.timedes}
                    </Typography>
                    <Typography variant="h5" style={{ margin: 5 }}>
                      Mô tả:
                    </Typography>
                    <Typography style={{ padding: 10 }}>
                      {event.description}
                    </Typography>
                  </CardContent>
                  <CardMedia>
                    <ImageList imageList={event.images} show2Image={true} isPost={false} />
                  </CardMedia>
                </Card>
              </Container>
            </>
          )}
        </Grid>
      )}
    </>
  );
}
