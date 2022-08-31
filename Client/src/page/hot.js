import { Grid } from "@material-ui/core";
import React, { createRef, useEffect } from "react";

import FeedHot from "../components/Feed/FeedHot";
import LeftBar from "../components/Leftbar";
import RightBar from "../components/Rightbar";
import SpeedDialButton from "../components/SpeedDialBtn";
import { homeMenu } from "../constant/menu";
import useStyles from "../style";
import FriendRecommendCard from '../components/Card/FriendRecommend';
import TourRecommendCardForYou from "../components/Card/TourForYou";


export default function HotPage(props) {

    const classes = useStyles();

    const ref = createRef();


    useEffect(() => {
        document.title = "Hot | Triple H";
    }, [])

    return (
        <Grid container className={classes.container}>
            <SpeedDialButton />
            <Grid container className={classes.containerHome} style={{marginTop: -50}}>
                <Grid item md={3} sm={3} xs={2}>
                    <LeftBar menuList={homeMenu} className={classes.leftbar}/>
                </Grid>
                <Grid item md={6} sm={9} xs={10}>
                    <FeedHot />
                </Grid>
                <Grid item md={3} className={classes.rightbar}>
                    <RightBar ref={ref}>
                        <TourRecommendCardForYou />
                        <FriendRecommendCard />
                    </RightBar>
                </Grid>
            </Grid>
        </Grid>
    )
}