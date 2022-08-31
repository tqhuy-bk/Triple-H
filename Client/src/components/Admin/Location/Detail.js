import { Button, IconButton, Paper } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import FormLocationAdmin from './Form';
import { NotFound } from '../../../page/404';
import customAxios from '../../../utils/fetchData';
import Loading from '../../Loading';

function AdminLocationDetail() {
  const { subpage } = useParams();

  const [location, setLocation] = useState(null);
  const [state, setState] = useState({
    notFound: false,
    loading: false,
    error: false
  });

  const getLocation = async id => {
    setState({
      notFound: false,
      loading: true,
      error: false
    });
    await customAxios()
      .get(`/location/${id}`)
      .then(res => {
        setLocation(res.data.location);
        // setLocation({
        //   ...res.data.location,
        //   position: {
        //     lng: res.data.location.position[0],
        //     lat: res.data.location.position[1]
        //   }
        // });
        setState({
          notFound: false,
          loading: false,
          error: false
        });
      })
      .catch(err => {
        setState({
          notFound: false,
          loading: false,
          error: true
        });
      });
  };

  useEffect(() => {
    getLocation(subpage);
  }, [subpage]);

  useEffect(() => {
    document.title = 'Admin - Chỉnh sửa địa điểm';
  }, []);

  return (
    <Paper
      style={{
        marginTop: 120,
        marginInline: 50,
        marginBottom: 30,
        padding: 30
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <IconButton component={Link} to={`/admin/location`} title="Quay lại">
            <ArrowBack />
          </IconButton>
        </div>
        <Button
          target={'_blank'}
          component={Link}
          to={`/location/${subpage}`}
          style={{ margin: 20, textTransform: 'none' }}
          color="primary"
          variant="contained"
        >
          Xem trang chi tiết
        </Button>
      </div>
      {state.notFound ? (
        <NotFound />
      ) : state.loading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          <Loading />
        </div>
      ) : state.error ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}
        >
          Có lỗi xảy ra
        </div>
      ) : (
        location && (
          <FormLocationAdmin
            location={location}
            setLocation={setLocation}
            mode="edit"
          />
        )
      )}
    </Paper>
  );
}

export default AdminLocationDetail;
