import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import LeftBar from '../../components/Leftbar';
import { adminListMenu } from '../../constant/adminMenu';
import AdminHome from '../../components/Admin';

export default function AdminHomePage(props) {
  useEffect(() => {
    document.title = 'Admin';
  }, []);

  return (
    <Grid container>
      <Grid item md={3} sm={2} xs={2}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={10} xs={10}>
        <AdminHome />
      </Grid>
    </Grid>
  );
}
