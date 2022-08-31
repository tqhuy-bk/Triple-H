import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftBar from '../../components/Leftbar';
import SpeedDialButton from '../../components/SpeedDialBtn';
import { homeMenu } from '../../constant/menu';
import { getVolunteers } from '../../redux/callApi/volunteerCall';
import useStyles from '../../style';
import Loading from '../../components/Loading';
import Volunteers from '../../components/Volunteer/Volunteers';

export default function Volunteer() {
    const dispatch = useDispatch();

    const classes = useStyles();
    useEffect(() => {
      document.title = 'Du lịch tình nguyện | Triple H';
    }, []);

    const { volunteer } = useSelector(state => state);

    useEffect(() => {
      if (volunteer.loading || volunteer.error || volunteer.volunteers) return;
      dispatch(getVolunteers());
    }, [dispatch, volunteer]);
    return (
        <Grid container className={classes.container}>
            <SpeedDialButton />
            <Grid container className={classes.containerProvince}>
                <Grid item md={3} sm={2} xs={2}>
                    <LeftBar menuList={homeMenu} />
                </Grid>
                <Grid item md={9} sm={10} xs={10}>
                    {
                      volunteer.loading ? 
                          <div className={classes.center}> <Loading /> </div>
                      : volunteer.error ?
                          <div className={classes.center}> Có lỗi xảy ra </div>
                      : 
                        <Volunteers />
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}
