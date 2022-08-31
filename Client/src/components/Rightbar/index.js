import React, { forwardRef } from "react";
import {
    Container,
} from "@material-ui/core";


import { rightbarStyles } from "../../style";



const RightBar = forwardRef((props, ref) => {
    const classes = rightbarStyles();
    return (
        <Container ref={ref} className={classes.container}>
            {props.children}
        </Container>
    )
})

export default RightBar;
