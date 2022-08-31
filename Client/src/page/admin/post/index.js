import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LeftBar from '../../../components/Leftbar';
import { adminListMenu } from '../../../constant/adminMenu';
import AdminPosts from '../../../components/Admin/Post';

export default function AdminPostsPage(props) {
  useEffect(() => {
    document.title = 'Admin - Bài viết/review';
  }, []);

  return (
    <Grid container>
      <Grid item md={3}>
        <LeftBar menuList={adminListMenu} showHelp={false} />
      </Grid>
      <Grid item md={9}>
        <AdminPosts />
      </Grid>
    </Grid>
  );
}
