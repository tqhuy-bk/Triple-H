import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import useStyles from "../style";

export function NotFound() {
    const classes = useStyles();

    useEffect(() => {
        document.title = "Trang không tồn tại!";
    }, [])

    return (
        <div className={classes.notFoundContainer}>
            <Typography variant="h1" style={{ paddingTop: '30vh' }}>404!</Typography>
            <Typography variant="h2" style={{ paddingBottom: 30 }}>Trang không tồn tại</Typography>
            <Link to="/">Quay lại trang chủ</Link>
        </div>
    )
}

export default function NotFoundPage() {

    return (
        <>
            <Header />
            <NotFound />
        </>
    )
}