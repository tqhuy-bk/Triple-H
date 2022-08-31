import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminServiceDetail from '../../../components/Admin/Service/Detail';

export default function AdminServiceDetailPage(props) {
  useEffect(() => {
    document.title = 'Admin - Chi tiết dịch vụ';
  }, []);
  return (
    <Grid container>
      <Grid item md={3}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9}>
        <AdminServiceDetail />
      </Grid>
    </Grid>
  );
}
