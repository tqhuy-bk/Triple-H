import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Tour from '../../components/Tour/TourDetail';
import customAxios from '../../utils/fetchData';
import { NotFound } from '../404';
import { loadTour } from '../../redux/actions/createTourAction';
import { sortTourDate } from '../../utils/utils';
import Loading from '../../components/Loading';
import AddTour from '../../components/Tour/AddTour';

export default function TourDetail(props) {
  const location = useLocation();

  const edit = new URLSearchParams(location.search).get('edit');

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const { id } = useParams();
  const [tour, setTour] = useState();
  const [state, setState] = useState({
    loading: false,
    notFound: false,
    error: false
  });

  const [isOwn, setIsOwn] = useState(false);
  // const [joined, setJoined] = useState(false);
  // const [joinLoc, setJoinLoc] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [isInvite, setIsInvite] = useState(false); //isJoin: flase
  const [memberIsEdit, setMemberIsEdit] = useState(false); // isJoin: true; isEdit:true/false
  const getTourDetail = async (id, token) => {
    setState({
      loading: true,
      error: false,
      notFound: false
    });
    await customAxios(token)
      .get(`/tour/${id}`)
      .then(res => {
        setTour(sortTourDate(res.data.tour));
        setState({
          loading: false,
          error: false,
          notFound: false
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
    getTourDetail(id, auth.token);
  }, [id, auth.token]);

  useEffect(() => {
    if (tour && tour.name) {
      document.title = tour.name;
    }
  }, [tour]);

  useEffect(() => {
    if (auth.user && tour) {
      setIsOwn(tour.userId._id === auth.user._id);
    }
  }, [tour, auth.user]);

  useEffect(() => {
    if (
      auth.user &&
      tour &&
      tour.joinIds.findIndex(
        join => join.id._id === auth.user._id && join.isJoin
      ) >= 0
    ) {
      console.log('join');
      setIsJoin(true);
    }
    if (
      auth.user &&
      tour &&
      tour.joinIds.findIndex(join => join.id._id === auth.user._id) >= 0
    ) {
      console.log('member');
      setIsMember(true);
    }

    if (
      auth.user &&
      tour &&
      tour.joinIds.findIndex(
        join => join.id._id === auth.user._id && !join.isJoin
      ) >= 0
    ) {
      console.log('invite');
      setIsInvite(true);
    }
    if (
      auth.user &&
      tour &&
      tour.joinIds.findIndex(
        join => join.id._id === auth.user._id && join.isJoin && join.isEdit
      ) >= 0
    ) {
      console.log('isedit');
      setMemberIsEdit(true);
    }
  }, [tour, auth.user]);

  // useEffect(() => {
  //   if (auth.user && tour) {

  //   }
  // }, [tour, auth.user]);

  useEffect(() => {
    if (edit === 'true' && tour) {
      dispatch(loadTour({ tour: tour }));
    }
  }, [edit, tour, dispatch]);

  const tryAgain = () => {
    getTourDetail(id, auth.token);
  };

  return (
    <>
      {state.notFound ? (
        <NotFound />
      ) : state.loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
        >
          <Loading />
        </div>
      ) : state.error ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 150 }}
        >
          <>
            <Typography>Có lỗi xảy ra</Typography>
            <Button onClick={tryAgain}>Thử lại</Button>
          </>
        </div>
      ) : (
        tour &&
        (edit === 'true' && (isOwn || memberIsEdit) ? (
          <AddTour isUpdate={true} />
        ) : tour.isPublic || isMember ? (
          <Tour
            tour={tour}
            setTour={setTour}
            isOwn={isOwn}
            isInvite={isInvite}
            setIsInvite={setIsInvite}
            memberIsEdit={memberIsEdit}
            setMemberIsEdit={setMemberIsEdit}
            isMember={isMember}
            isJoin={isJoin}
          />
        ) : (
          <NotFound />
        ))
      )}
    </>
  );
}
