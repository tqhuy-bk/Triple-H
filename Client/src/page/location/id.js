import { Button, Grid, Typography } from '@material-ui/core';
import { PhotoLibrary } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Lightbox from 'react-image-lightbox';

import MapCard from '../../components/Map/MapCard';
import RatingChart from '../../components/Card/RatingChart';
import WeatherCardGeneral from '../../components/Card/WeatherCard';
import FeedReview from '../../components/Feed/FeedReview';
import { SeeMoreText } from '../../components/SeeMoreText';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { locationStyles } from '../../style';
import customAxios from '../../utils/fetchData';
import { NotFound } from '../404';
import { getPostsLocation } from '../../redux/callApi/postCall';
import MapPinIcon from '../../components/Icons/MapPin';
import Loading from '../../components/Loading';

export default function Location(props) {
  const [location, setLocation] = useState(null);
  const classes = locationStyles();
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [state, setState] = useState({
    loading: false,
    error: false
  });
  const dispatch = useDispatch();
  const { auth, post } = useSelector(state => state);

  const getLocation = async (id, token) => {
    if (id) {
      setState({
        loading: true,
        error: false
      });
      setNotFound(false);
      await customAxios(token)
        .get(`/location/${id}`)
        .then(res => {
          setLocation(res.data.location);
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

  const handleShowImage = () => {
    setShowImg(true);
  };

  const handleCloseImage = () => {
    setShowImg(false);
  };

  const nextImage = () => {
    setImgIdx((imgIdx + 1) % location.images.length);
  };

  const prevImage = () => {
    setImgIdx((imgIdx + location.images.length - 1) % location.images.length);
  };

  useEffect(() => {
    if (id) {
      getLocation(id, auth.token);
    }
  }, [id, auth.token]);

  useEffect(() => {
    if (
      !location ||
      post.loading ||
      post.loadingFirst ||
      post.error ||
      (post.posts && post.id === location._id)
    )
      return;
    console.log(post);
    dispatch(getPostsLocation(location._id, 0));
  }, [location, dispatch, post, id]);

  useEffect(() => {
    if (location?.fullname) {
      document.title = location.fullname;
    }
  }, [location]);

  const tryAgain = () => {
    getLocation(id, auth.token);
  };

  return (
    <>
      {state.loading ? (
        <div className={classes.centerMarginTop}>
          <Loading />
        </div>
      ) : state.error ? (
        <div className={classes.centerMarginTop}>
          <div>
            <Button onClick={tryAgain}>Thử lại</Button>
          </div>
        </div>
      ) : notFound ? (
        <NotFound />
      ) : (
        <Grid container className={classes.container}>
          {location && (
            <>
              <SpeedDialButton />
              <Grid item md={12} sm={12} xs={12}>
                <div className={classes.fullname}>
                  <Typography
                    variant="h4"
                    noWrap={false}
                    className={classes.titleFullname}
                  >
                    {location.fullname}
                  </Typography>
                </div>
                <div className={classes.provinceWrap}>
                  <>
                    <MapPinIcon className={classes.iconProvince} />
                    <Typography
                      className={classes.provinceName}
                      variant="h5"
                      component={Link}
                      to={`/province/${location.province.name}`}
                    >
                      {location.province.fullname}
                    </Typography>
                  </>
                </div>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <div className={classes.infoPanel}>
                  <div className={classes.infoHeader}>
                    <Typography variant="h6">Thông tin chung</Typography>
                  </div>
                  <div className={classes.infoContent}>
                    <SeeMoreText
                      maxText={500}
                      text={location.information}
                      variant="body1"
                    />
                  </div>
                </div>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <div className={classes.imageList}>
                  {location.images.length === 1 ? (
                    <img
                      src={location.images[0]}
                      alt="Đang tải..."
                      className={classes.imageLength1}
                      onClick={handleShowImage}
                    />
                  ) : location.images.length === 2 ? (
                    <div
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={location.images[0]}
                        alt="Đang tải..."
                        className={classes.image2}
                        onClick={handleShowImage}
                      />
                      <img
                        src={location.images[1]}
                        alt="Đang tải..."
                        className={classes.image3}
                        onClick={handleShowImage}
                      />
                      {location.images.length >= 2 && (
                        <span
                          className={classes.imageMore}
                          onClick={handleShowImage}
                        >
                          <PhotoLibrary style={{ fontSize: 12 }} /> Xem tất cả
                          ảnh ({location.images.length})
                        </span>
                      )}
                    </div>
                  ) : (
                    <>
                      <img
                        src={location.images[0]}
                        alt="Đang tải..."
                        className={classes.image1}
                        onClick={handleShowImage}
                      />
                      <div
                        style={{
                          height: '100%',
                          width: '100%',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={location.images[1]}
                          alt="Đang tải..."
                          className={classes.image2}
                          onClick={handleShowImage}
                        />
                        <img
                          src={location.images[2]}
                          alt="Đang tải..."
                          className={classes.image3}
                          onClick={handleShowImage}
                        />
                        {location.images.length >= 3 && (
                          <span
                            className={classes.imageMore}
                            onClick={handleShowImage}
                          >
                            <PhotoLibrary style={{ fontSize: 12 }} /> Xem tất cả
                            ảnh ({location.images.length})
                          </span>
                        )}
                      </div>
                    </>
                  )}
                  {showImg && (
                    <Lightbox
                      mainSrc={location.images[imgIdx]}
                      nextSrc={
                        location.images[(imgIdx + 1) % location.images.length]
                      }
                      prevSrc={
                        location.images[
                          (imgIdx + location.images.length - 1) %
                            location.images.length
                        ]
                      }
                      mainSrcThumbnail={location.images[imgIdx]}
                      imageCaption={location.images[imgIdx]}
                      nextSrcThumbnail={
                        location.images[(imgIdx + 1) % location.images.length]
                      }
                      prevSrcThumbnail={
                        location.images[
                          (imgIdx + location.images.length - 1) %
                            location.images.length
                        ]
                      }
                      onCloseRequest={handleCloseImage}
                      onMoveNextRequest={nextImage}
                      onMovePrevRequest={prevImage}
                    />
                  )}
                </div>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <div className={classes.map}>
                  <MapCard
                    position={location.position}
                    zoom={12}
                    name={location.fullname}
                    height={400}
                  />
                </div>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <div className={classes.rate}>
                  <RatingChart star={location.star} />
                </div>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <div className={classes.review}>
                  <div className={classes.reviewTop}>
                    <Typography variant="h5">Đánh giá từ cộng đồng</Typography>
                  </div>
                  <div className={classes.overView}>
                    <div className={classes.overView_image}>
                      <img
                        style={{ maxHeight: '100%' }}
                        src="https://ik.imagekit.io/reviewcafe/Online_Review-cuate_wG_WzURJF.svg"
                        alt="icon"
                      />
                    </div>
                    <div className={classes.overView_text}>
                      <Typography variant="h5">Bạn đã từng đến đây?</Typography>
                      <Typography>
                        Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi
                        người cùng biết
                      </Typography>
                    </div>
                  </div>
                  <FeedReview location={location} />
                </div>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <div className={classes.weather}>
                  <WeatherCardGeneral
                    position={location.position}
                    nameShow={location.fullname}
                  />
                </div>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
}
