import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminAddLocation from '../../../components/Admin/Location/Add';

export default function AdminLocationAdd(props) {
  useEffect(() => {
    document.title = 'Admin - Thêm địa điểm';
  }, []);

  return (
    <Grid container>
      <Grid item md={3} sm={2} xs={2}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={10} xs={10}>
        <AdminAddLocation />
      </Grid>
    </Grid>
  );
}
