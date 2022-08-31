import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminServices from '../../../components/Admin/Service';

export default function AdminServicePage(props) {
  useEffect(() => {
    document.title = 'Admin - Dịch vụ';
  }, []);

  return (
    <Grid container>
      <Grid item md={3}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9}>
        <AdminServices />
      </Grid>
    </Grid>
  );
}
