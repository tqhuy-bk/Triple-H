import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminUsers from '../../../components/Admin/User';

export default function AdminUsersPage(props) {
  useEffect(() => {
    document.title = 'Admin - Người dùng';
  });

  return (
    <Grid container>
      <Grid item md={3} sm={2} xs={2}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={10} xs={10}>
        <AdminUsers />
      </Grid>
    </Grid>
  );
}
