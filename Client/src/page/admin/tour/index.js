import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminTour from '../../../components/Admin/Tour';

export default function AdminTourPage() {
  useEffect(() => {
    document.title = 'Admin - Hành trình';
  }, []);

  return (
    <Grid container>
      <Grid item md={3}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9}>
        <AdminTour />
      </Grid>
    </Grid>
  );
}
