import { Button, CardMedia, Grid, Typography } from '@material-ui/core';
import { AccessibilityNew } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import HelpCard from '../../components/Help/HelpCard';
import Loading from '../../components/Loading';
// import KEY from '../../key/googlemap';
import customAxios from '../../utils/fetchData';
import { NotFound } from '../404';
import { helpStyles } from '../../style';
import SpeedDialButton from '../../components/SpeedDialBtn';
import ImageList from '../../components/Modal/ImageList';

const KEY = process.env.REACT_APP_GOOGLE_MAP;

export default function HelpDetailPage() {
  const { id } = useParams();
  const classes = helpStyles();
  const { token } = useSelector(state => state.auth);

  const [help, setHelp] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    customAxios(token)
      .get(`/help/${id}`)
      .then(res => {
        setHelp(res.data.help);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err?.response?.status === 404) return setNotFound(true);
        return setError(true);
      });
  }, [id, token]);

  useEffect(() => {
    document.title = 'Trợ giúp';
  }, []);

  if (loading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        <Loading />
      </div>
    );
  if (notFound) return <NotFound />;
  if (error)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        <Typography>Có lỗi xảy ra</Typography>
      </div>
    );

  return (
    <Grid container className={classes.container}>
      <SpeedDialButton />
      <Grid container className={classes.helpDetailContainer}>
        <Button
          component={Link}
          to="/help"
          variant="outline"
          style={{ marginBlock: 30 }}
          className={classes.buttonDetailCard}
        >
          Yêu cầu trợ giúp gần bạn
        </Button>
        {help && (
          <Grid container spacing={3}>
            <Grid item lg={5} md={4} sm={12}>
              <HelpCard help={help} detail />
              {help.images && (
                <CardMedia style={{ marginTop: 15, borderRadius: 15 }}>
                  <ImageList
                    imageList={help.images}
                    show2Image={true}
                    defaultHeight={300}
                    isPost={false}
                  />
                </CardMedia>
              )}
            </Grid>
            <Grid item lg={7} md={8} sm={12}>
              <div style={{ height: 600, borderRadius: 15 }}>
                {help?.position?.length ? (
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: KEY }}
                    defaultCenter={{
                      lat: help.position[1],
                      lng: help.position[0]
                    }}
                    defaultZoom={15}
                  >
                    <AccessibilityNew
                      style={{ color: 'red', fontSize: 32 }}
                      lng={help.position[0]}
                      lat={help.position[1]}
                    />
                  </GoogleMapReact>
                ) : (
                  <div>
                    <Typography>Không có vị trí của người yêu cầu</Typography>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
