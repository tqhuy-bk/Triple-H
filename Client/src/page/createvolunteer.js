import React, { useEffect, useState } from 'react';
// import LeftBar from '../components/Leftbar';
import { NotFound } from './404';
import { Grid, Button, Typography } from '@material-ui/core';
import SpeedDialButton from '../components/SpeedDialBtn';
// import { homeMenu } from '../constant/menu';
import { Redirect, useLocation } from 'react-router-dom';
import customAxios from '../utils/fetchData';
import { useSelector } from 'react-redux';
import AddVolunteer from '../components/Volunteer/AddVolunteer';
import Loading from '../components/Loading';
import { getToken } from '../utils/token';

export default function CreateVolunteer() {
  const [state, setState] = useState({
    loading: false,
    notFound: false,
    error: false
  });
  const { auth } = useSelector(state => state);
  const [isOwn, setIsOwn] = useState(false);
  // const [isAccountConfirm, serIsAccountConfirm] = useState(false);
  const location = useLocation();
  const [volunteer, setVolunteer] = useState(null);
  const id = new URLSearchParams(location.search).get('id');
  const [edit, setEdit] = useState(false);
  const getVolunteerDetail = async id => {
    setState({
      loading: true,
      error: false,
      notFound: false
    });
    await customAxios()
      .get(`/volunteer/${id}`)
      .then(res => {
        setVolunteer(res.data.volunteer);
        setEdit(true);
        setState({
          loading: false,
          error: false,
          notFound: false
        });
      })
      .catch(err => {
        if (err?.response.status === 404)
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
    if (id != null) getVolunteerDetail(id);
  }, [id]);

  useEffect(() => {
    if (auth.user) {
      if (volunteer) {
        setIsOwn(volunteer.userId._id === auth.user._id);
      }
    } else {
      setState({
        loading: false,
        error: false,
        notFound: true
      });
    }
    if(!(auth.user?.confirmAccount && auth.user?.confirmAccount.state === 1)){
      setState({
        loading: false,
        error: false,
        notFound: true
      });
    }
  }, [setIsOwn, volunteer, auth]);

  useEffect(() => {
    document.title = 'Tạo hoạt động tình nguyện';
  }, []);

  const tryAgain = () => {
    if (id != null) getVolunteerDetail(id);
  };

  const rfToken = getToken();
  if (!rfToken) return <Redirect to="/login" />;

  return (
    <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
      <SpeedDialButton />
      <Grid
        item
        md={9}
        sm={10}
        xs={10}
        style={{ marginTop: 80, border: '1px solid black', marginBottom: 50 }}
      >
        {state.notFound || (volunteer && !isOwn) ? (
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
        ) : edit && isOwn ? (
          volunteer && <AddVolunteer isUpdate={edit} volunteer={volunteer} />
        ) : (
          <AddVolunteer isUpdate={false} volunteer={null} />
        )}
      </Grid>
    </Grid>
  );
}
