import React, { useEffect, useState } from 'react';

import LeftBar from '../../components/Leftbar';
import { NotFound } from '../404';
import { Grid, Button, Typography } from '@material-ui/core';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { homeMenu } from '../../constant/menu';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import customAxios from "../../utils/fetchData";
import Volunteer from '../../components/Volunteer/VolunteerDetail';
import customAxios from '../../utils/fetchData';
import Loading from '../../components/Loading';

export default function VolunteerDetail() {
  const { auth } = useSelector(state => state);
  const { id } = useParams();
  const [volunteerDetail, setVolunteerDetail] = useState();
  const [state, setState] = useState({
    loading: false,
    notFound: false,
    error: false
  });

  const getVolunteer = (id, token) => {
    setState({
      loading: true,
      notFound: false,
      error: false
    });
    customAxios(token)
      .get(`/volunteer/${id}`)
      .then(res => {
        setVolunteerDetail(res.data.volunteer);
        setState({
          loading: false,
          notFound: false,
          error: false
        });
      })
      .catch(err => {
        if (err && err.response && err.response.status === 404)
          setState({
            loading: false,
            error: true,
            notFound: true
          });
        else
          setState({
            loading: false,
            error: true,
            notFound: false
          });
      });
  };

  useEffect(() => {
    getVolunteer(id, auth.token);
  }, [id, auth.token]);

  useEffect(() => {
    if (volunteerDetail && volunteerDetail.name) {
      document.title = volunteerDetail.name;
    }
  }, [volunteerDetail]);

  const tryAgain = () => {
    getVolunteer(id, auth.token);
  };

  return (
    <Grid container style={{ margin: 0, padding: 0 }}>
      <SpeedDialButton />
      <Grid item md={3} sm={2} xs={2}>
        <LeftBar menuList={homeMenu} />
      </Grid>
      <Grid
        item
        md={9}
        sm={10}
        xs={10}
        style={{ padding: 30, backgroundColor: '#fafafa' }}
      >
        {state.notFound ? (
              <NotFound />
            ) : state.loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 150
                }}
              >
                <Loading />
              </div>
            ) : state.error ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 150
                }}
              >
                <>
                  <Typography>Có lỗi xảy ra</Typography>
                  <Button onClick={tryAgain}>Thử lại</Button>
                </>
              </div>
            ) : (
              volunteerDetail && <Volunteer volunteer={volunteerDetail} />
            )
        }
      </Grid>
    </Grid>
  );
}
