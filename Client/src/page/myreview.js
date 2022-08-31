import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import customAxios from '../utils/fetchData';
import LocationList from '../components/MyReview/LocationList';
import MapReview from '../components/MyReview/MapReview';
import Loading from '../components/Loading';
import useStyles from '../style';

export default function MyReviewPage() {
  const { token } = useSelector(state => state.auth);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showInfo, setShowInfo] = useState(null);
  const [center, setCenter] = useState({
    lat: 15,
    lng: 108
  });
  const [zoom, setZoom] = useState(8);
  const classes = useStyles();
  useEffect(() => {
    if (token) {
      setLoading(true);
      customAxios(token)
        .get('/user/review')
        .then(res => {
          setReviews(res.data.reviews);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setError(true);
        });
    }
  }, [token]);

  useEffect(() => {
    document.title = 'Review của tôi';
  }, []);

  if (loading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
      >
        <Loading />
      </div>
    );

  if (error) return <div className={classes.center}>Có lỗi xảy ra</div>;

  return (
    <div style={{ marginTop: 80, marginInline: 80, alignContent: 'center' }}>
      <Grid container spacing={5}>
        <Grid item md={8} sm={8} xs={12}>
          <MapReview
            reviews={reviews}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            center={center}
            zoom={zoom}
          />
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <LocationList
            reviews={reviews}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            setZoom={setZoom}
            setCenter={setCenter}
          />
        </Grid>
      </Grid>
    </div>
  );
}
