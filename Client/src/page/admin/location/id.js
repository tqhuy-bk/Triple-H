import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';

import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import { adminStyles } from '../../../style';
import AdminLocationDetail from '../../../components/Admin/Location/Detail';

export default function AdminLocationDetailPage() {
  const classes = adminStyles();

  useEffect(() => {
    document.title = 'Admin - Chi tiết địa điểm';
  }, []);

  return (
    <Grid container>
      <Grid item md={3} className={classes.smHidden}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={12} xs={12}>
        <AdminLocationDetail />
      </Grid>
    </Grid>
  );
}
