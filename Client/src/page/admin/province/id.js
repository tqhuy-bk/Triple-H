import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';

import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import DetailProvinceAdmin from '../../../components/Admin/Province/Detail';
import { adminStyles } from '../../../style';

export default function AdminProvinceDetail() {
  const classes = adminStyles();

  useEffect(() => {
    document.title = 'Admin - Chỉnh sửa tỉnh';
  }, []);

  return (
    <Grid container>
      <Grid item md={3} className={classes.smHidden}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9} sm={12} xs={12}>
        <DetailProvinceAdmin />
      </Grid>
    </Grid>
  );
}
