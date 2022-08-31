import { Button, Card, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

import LocationCard from '../../components/Card/LocationCard';
import { provinceStyles } from '../../style';
import WeatherCardGeneral from '../../components/Card/WeatherCard';
import CovidCard from '../../components/Card/CovidCard';
import SpeedDialButton from '../../components/SpeedDialBtn';
import ServiceCard from '../../components/Card/ServiceCard';
import customAxios from '../../utils/fetchData';
import MapCard from '../../components/Map/MapCard';
import { NotFound } from '../404';
import EventCard from '../../components/Card/EventCard';
import Loading from '../../components/Loading';

const ITEM_PER_PAGE = 6;

export default function Province(props) {
  const [province, setProvince] = useState(null);
  const [locations, setLocations] = useState(null);
  const [services, setServices] = useState(null);
  const [events, setEvents] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const [state, setState] = useState({
    loading: false,
    error: false
  });

  const [stateLocation, setStateLocation] = useState({
    loading: false,
    error: false
  });
  const [stateEvent, setStateEvent] = useState({
    loading: false,
    error: false
  });
  const [stateService, setStateService] = useState({
    loading: false,
    error: false
  });

  const [pageLoc, setPageLoc] = useState(1);
  const [pageSer, setPageSer] = useState(1);

  const handleChangeLoc = (e, value) => {
    setPageLoc(value);
  };

  const handleChangeSer = (e, value) => {
    setPageSer(value);
  };

  const classes = provinceStyles();

  const getProvince = async id => {
    if (id) {
      setState({
        loading: true,
        error: false
      });
      setNotFound(false);
      await customAxios()
        .get(`/province/${id}`)
        .then(res => {
          setProvince(res.data.province);
          setState({
            loading: false,
            error: false
          });
        })
        .catch(err => {
          if (err.response && err.response.status === 404) setNotFound(true);
          else
            setState({
              loading: false,
              error: true
            });
        });
    }
  };

  const getLocation = async id => {
    if (id) {
      setStateLocation({
        loading: true,
        error: false
      });
      await customAxios()
        .get(`/location/province/${id}`)
        .then(res => {
          setLocations(res.data.locations);
          setStateLocation({
            loading: false,
            error: false
          });
        })
        .catch(err => {
          setStateLocation({
            loading: false,
            error: true
          });
        });
    }
  };

  const getEvent = async id => {
    if (id) {
      setStateEvent({
        loading: true,
        error: false
      });
      await customAxios()
        .get(`/event/province/${id}`)
        .then(res => {
          setEvents(res.data.events);
          setStateEvent({
            loading: false,
            error: false
          });
        })
        .catch(err => {
          setStateEvent({
            loading: false,
            error: true
          });
        });
    }
  };

  const getService = async id => {
    if (id) {
      setStateService({
        loading: true,
        error: false
      });
      await customAxios()
        .get(`/service/province/${id}`)
        .then(res => {
          setServices(res.data.services);
          setStateService({
            loading: false,
            error: false
          });
        })
        .catch(err => {
          setStateService({
            loading: false,
            error: true
          });
        });
    }
  };

  const tryAgain = () => {
    if (id) {
      getProvince(id);
    }
  };

  useEffect(() => {
    if (id) {
      getProvince(id);
    }
  }, [id]);

  useEffect(() => {
    if (province) {
      getLocation(province._id);

      getEvent(province._id);

      getService(province._id);
    }
  }, [province]);

  useEffect(() => {
    if (province && province.fullname) {
      document.title = province.fullname;
    }
  }, [province]);

  const tryAgainLocation = () => {
    getLocation(province._id);
  };

  const tryAgainEvent = () => {
    getEvent(province._id);
  };

  const tryAgainService = () => {};

  return (
    <>
      {state.loading ? (
        <div className={classes.centerMarginTop}>
          <Loading />
        </div>
      ) : state.error ? (
        <div className={classes.centerMarginTop}>
          <div>
            <Typography>Có lỗi xảy ra</Typography>
            <Button onClick={tryAgain}>Thử lại</Button>
          </div>
        </div>
      ) : notFound ? (
        <NotFound />
      ) : (
        <Grid container>
          <>
            {province && (
              <>
                <SpeedDialButton />
                <Grid item md={12} sm={12} xs={12}>
                  <div className={classes.img}>
                    <img
                      src={province.image}
                      alt="Province"
                      className={classes.image}
                    />
                    <Typography className={classes.provinceName} variant="h1">
                      {province.fullname}
                    </Typography>
                  </div>
                </Grid>
                <Grid container className={classes.container}>
                  <Grid item md={8} sm={12} xs={12}>
                    <Card className={classes.desContainer}>
                      <div className={classes.title}>
                        <Typography variant="h5">
                          Thông tin về {province.fullname}
                        </Typography>
                      </div>
                      <div className={classes.desContent}>
                        <Typography>{province.information}</Typography>
                        <div className={classes.detail}>
                          <div>
                            <Typography variant="h5">I. Tổng quan</Typography>
                            <div>
                              <div className={classes.subtitleDes}>
                                <Typography variant="h6">
                                  {' '}
                                  1. Văn hóa
                                </Typography>
                                <Typography
                                  className={classes.subsubtitleDes}
                                  component="p"
                                >
                                  {province.detail.overview.cultural}
                                </Typography>
                              </div>
                              <div className={classes.subtitleDes}>
                                <Typography variant="h6"> 2. Địa lý</Typography>
                                <Typography
                                  className={classes.subsubtitleDes}
                                  component="p"
                                >
                                  {province.detail.overview.geography}
                                </Typography>
                              </div>
                              <div className={classes.subtitleDes}>
                                <Typography variant="h6">
                                  {' '}
                                  3. Thời tiết
                                </Typography>
                                <Typography
                                  className={classes.subsubtitleDes}
                                  component="p"
                                >
                                  {province.detail.overview.weather}
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Typography variant="h5">
                              II. Phương tiện
                            </Typography>
                            <ul className={classes.ul}>
                              <li className={classes.subsubtitleDes}>
                                Sân bay: {province.detail.vehicle.airport}
                              </li>
                              <li className={classes.subsubtitleDes}>
                                Phương tiện di chuyển:{' '}
                                {province.detail.vehicle.traffic}
                              </li>
                            </ul>
                          </div>
                          <div>
                            <Typography variant="h5">III. Ẩm thực</Typography>
                            <ul className={classes.ul}>
                              {province.detail.food.map((item, index) => (
                                <li
                                  className={classes.subsubtitleDes}
                                  key={index}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className={classes.source}>
                        <i>Nguồn: Internet</i>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item md={4}>
                    <div className={classes.rightbar}>
                      <div className={classes.rightWrap}>
                        <WeatherCardGeneral
                          position={province?.position}
                          nameShow={province?.fullname}
                        />
                        <CovidCard name={province?.fullname} />
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <div className={classes.map}>
                      <MapCard
                        position={province.position}
                        zoom={10}
                        locations={locations}
                      />
                    </div>

                    <div className={classes.locationList}>
                      <div className={classes.title}>
                        <Typography variant="h6">Danh sách địa điểm</Typography>
                      </div>
                      {stateLocation.loading ? (
                        <div className={classes.centerMarginTop}>
                          <Loading />
                        </div>
                      ) : stateLocation.error ? (
                        <div className={classes.centerMarginTop}>
                          <Button onClick={tryAgainLocation}>Thử lại</Button>
                        </div>
                      ) : (
                        locations && (
                          <>
                            <Grid className={classes.listContainer} container>
                              {locations
                                .slice(
                                  (pageLoc - 1) * ITEM_PER_PAGE,
                                  pageLoc * ITEM_PER_PAGE
                                )
                                .map(item => (
                                  <Grid
                                    item
                                    md={4}
                                    sm={6}
                                    xs={12}
                                    key={item._id}
                                  >
                                    <LocationCard location={item} />
                                  </Grid>
                                ))}
                            </Grid>
                            <div className={classes.patination}>
                              <Pagination
                                count={Math.ceil(
                                  locations.length / ITEM_PER_PAGE
                                )}
                                page={pageLoc}
                                onChange={handleChangeLoc}
                                color="primary"
                              />
                            </div>
                          </>
                        )
                      )}
                    </div>

                    <div className={classes.locationList}>
                      <div className={classes.title}>
                        <Typography variant="h6">Danh sách lễ hội</Typography>
                      </div>
                      {stateEvent.loading ? (
                        <div className={classes.centerMarginTop}>
                          <Loading />
                        </div>
                      ) : stateEvent.error ? (
                        <div className={classes.centerMarginTop}>
                          <Button onClick={tryAgainEvent}>Thử lại</Button>
                        </div>
                      ) : (
                        events && (
                          <>
                            <Grid className={classes.listContainer} container>
                              {events
                                ?.slice(
                                  (pageSer - 1) * ITEM_PER_PAGE,
                                  pageSer * ITEM_PER_PAGE
                                )
                                .map(item => (
                                  <Grid
                                    item
                                    md={4}
                                    sm={6}
                                    xs={12}
                                    key={item._id}
                                  >
                                    <EventCard event={item} />
                                  </Grid>
                                ))}
                            </Grid>
                            <div className={classes.patination}>
                              <Pagination
                                count={Math.ceil(events.length / ITEM_PER_PAGE)}
                                page={pageSer}
                                onChange={handleChangeSer}
                                color="primary"
                              />
                            </div>
                          </>
                        )
                      )}
                    </div>
                    <div className={classes.locationList}>
                      <div className={classes.title}>
                        <Typography variant="h6">Danh sách dịch vụ</Typography>
                      </div>
                      {stateService.loading ? (
                        <div className={classes.centerMarginTop}>
                          <Loading />
                        </div>
                      ) : stateService.error ? (
                        <div className={classes.centerMarginTop}>
                          <Button onClick={tryAgainService}>Thử lại</Button>
                        </div>
                      ) : (
                        services && (
                          <>
                            <Grid className={classes.listContainer} container>
                              {services
                                ?.slice(
                                  (pageSer - 1) * ITEM_PER_PAGE,
                                  pageSer * ITEM_PER_PAGE
                                )
                                .map(item => (
                                  <Grid
                                    item
                                    md={4}
                                    sm={6}
                                    xs={12}
                                    key={item._id}
                                  >
                                    <ServiceCard service={item} />
                                  </Grid>
                                ))}
                            </Grid>
                            <div className={classes.patination}>
                              <Pagination
                                count={Math.ceil(
                                  services.length / ITEM_PER_PAGE
                                )}
                                page={pageSer}
                                onChange={handleChangeSer}
                                color="primary"
                              />
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
          </>
        </Grid>
      )}
    </>
  );
}
