import { Grid } from "@material-ui/core";
import React, { createRef, useEffect } from "react";
import { useDispatch } from 'react-redux'

import Calendar from '../components/Calendar';
import FriendRecommendCard from "../components/Card/FriendRecommend";
import FeedService from "../components/Feed/FeedService";
import LeftBar from "../components/Leftbar";
import RightBar from "../components/Rightbar";
import SpeedDialButton from "../components/SpeedDialBtn";
import { homeMenu } from "../constant/menu";
import useStyles from "../style";
import { getServices } from '../redux/callApi/serviceCall';

export default function ServicePage(props) {

    const ref = createRef();

    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getServices(null, 0));
    }, [dispatch]);

    useEffect(() => {
        document.title = "Dịch vụ | Triple H";
    }, [])

    return (
        <Grid container className={classes.container}>
            <SpeedDialButton />
            <Grid container className={classes.containerHome} style={{marginTop: -50}}> 
                <Grid item md={3} sm={2} xs={2}>
                    <LeftBar menuList={homeMenu} />
                </Grid>
                <Grid item md={6} sm={10} xs={10}>
                    <FeedService />
                </Grid>
                <Grid item md={3} className={classes.rightbar}>
                    <RightBar ref={ref}>
                        <Calendar />
                        <FriendRecommendCard />
                    </RightBar>
                </Grid>
            </Grid>
        </Grid>
    )
}