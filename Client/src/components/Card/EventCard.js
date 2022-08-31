import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { cardStyles } from "../../style";

export default function EventCard(props) {

    const { event } = props;

    const classes = cardStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardMedia
                className={classes.image}
                image={event.images[0]}
                alt={event.name}
                title={event.fullname}
            />
            <CardContent>
                <Typography component={Link} to={"/event/" + event.name} className={classes.locationName} variant="h6">{event.fullname.length > 28 ? event.fullname.slice(0, 28) + "..." : event.fullname}</Typography>
                <Typography variant="body2" className={classes.locationName}>{event.timedes}</Typography>
            </CardContent>
            <CardActions className={classes.footer}>
                <Button className={classes.seeMore} component={Link} to={"/event/" + event.name}>
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    )
}