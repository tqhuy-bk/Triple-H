import { Container, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import clsx from 'clsx';

import { searchStyles } from "../style";
import SpeedDialButton from "../components/SpeedDialBtn";
import TabPanel from '../components/Search/TabPanel';


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function listSearch() {
    return [
        'location',
        'user',
        'tour',
        'post',
        'volunteer',
        'event',
        'service'
    ]
}

export default function SearchPage(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const classes = searchStyles();
    const [value, setValue] = useState(0);
    const location = useLocation();

    const query = (new URLSearchParams(location.search)).get("q");

    const list = listSearch();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        document.title = `Kết quả tìm kiếm cho "${query}"`
    }, [query])


    return (
        <>
            <SpeedDialButton />
            <Container>
                <div className={classes.appBarSpacer} />
                <div className={classes.appBarSpacer} />
                <Grid container>
                    <Grid item md={3} sm={12} xs={12}>
                        <Tabs
                            orientation={matches ? "vertical" : "horizontal"}
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="Địa điểm" {...a11yProps(0)} className={value === 0 ? clsx(classes.tab, classes.active) : classes.tab} />
                            <Tab label="Người dùng" {...a11yProps(1)} className={value === 1 ? clsx(classes.tab, classes.active) : classes.tab} />
                            <Tab label="Tour" {...a11yProps(2)} className={value === 2 ? clsx(classes.tab, classes.active) : classes.tab} />
                            <Tab label="Bài viết" {...a11yProps(3)} className={value === 3 ? clsx(classes.tab, classes.active) : classes.tab} />
                            <Tab label="Tình nguyện" {...a11yProps(4)} className={value === 4 ? clsx(classes.tab, classes.active) : classes.tab} />
                            <Tab label="Sự kiện" {...a11yProps(5)} className={value === 5 ? clsx(classes.tab, classes.active) : classes.tab} />
                            <Tab label="Dịch vụ" {...a11yProps(6)} className={value === 6 ? clsx(classes.tab, classes.active) : classes.tab} />
                        </Tabs>
                    </Grid>
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography className={classes.query}>Hiển thị kết quả tìm kiếm cho "{query}"</Typography>
                        {list.map((item, index) =>
                            <TabPanel key={index} value={value} index={index} item={item} q={query} />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}