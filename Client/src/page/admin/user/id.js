import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminUserDetail from '../../../components/Admin/User/Detail';
import { useParams } from 'react-router-dom';
import customAxios from '../../../utils/fetchData';
import { adminStyles } from '../../../style';
import Loading from '../../../components/Loading';

export default function AdminUserDetailPage(props) {
  const { subpage } = useParams();

  const [user, setUser] = useState(null);
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const getUser = async id => {
    setState({
      loading: true,
      error: null
    });
    await customAxios()
      .get(`/user/${id}`)
      .then(res => {
        setUser(res.data.user);
        console.log(res.data.user);
        setState({
          loading: false,
          error: null
        });
      })
      .catch(err => {
        setState({
          loading: false,
          error: err
        });
      });
  };

  useEffect(() => {
    getUser(subpage);
  }, [subpage]);

  useEffect(() => {
    document.title = 'Admin - Chi tiết người dùng';
  });

  const classes = adminStyles();

  return (
    <Grid container>
      <Grid item md={3} className={classes.smHidden}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={12} xs={12}>
        <>
          {state.loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 60
              }}
            >
              <Loading />
            </div>
          ) : state.error ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 60
              }}
            >
              <Button onClick={() => getUser(subpage)}>Tải lại</Button>
            </div>
          ) : (
            <AdminUserDetail user={user} setUser={setUser} />
          )}
        </>
      </Grid>
    </Grid>
  );
}
