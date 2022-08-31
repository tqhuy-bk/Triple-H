import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpeedDialButton from '../../components/SpeedDialBtn';
import HelpCard from '../../components/Help/HelpCard';
import useStyles from '../../style';

export default function HelpPage() {
  const { list } = useSelector(state => state.help);
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Trợ giúp';
  }, []);

  return (
    <Grid container className={classes.container}>
      <SpeedDialButton />
      <Grid
        container
        className={classes.containerHome}
        spacing={3}
        style={{ marginTop: 20 }}
      >
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h5">Yêu cầu trợ giúp gần bạn</Typography>
        </Grid>
        {list.map(item => (
          <Grid item md={4} sm={6} xs={12} key={item._id} id={item._id}>
            <HelpCard help={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
