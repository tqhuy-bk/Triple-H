import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminEventAdd from '../../../components/Admin/Event/Add';
import { adminStyles } from '../../../style';

export default function AdminEventAddPage() {
  const classes = adminStyles();

  useEffect(() => {
    document.title = 'Admin - Thêm sự kiện';
  }, []);

  return (
    <Grid container>
      <Grid item md={3} className={classes.smHidden}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={10} xs={12}>
        <AdminEventAdd />
      </Grid>
    </Grid>
  );
}
