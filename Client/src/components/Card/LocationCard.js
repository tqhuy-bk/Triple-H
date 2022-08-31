import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { cardStyles } from "../../style";
import { getStar } from "../../utils/utils";

export default function LocationCard(props) {

    const { location } = props;

    const classes = cardStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardMedia
                className={classes.image}
                image={location.images[0]}
                alt={location.name}
                title={location.fullname}
            />
            <CardContent>
                <Typography component={Link} to={"/location/" + location.name} className={classes.locationName} variant="h6">{location.fullname.length > 25 ? location.fullname.slice(0, 25) + "..." : location.fullname}</Typography>
            </CardContent>
            <CardActions className={classes.footer}>
                <div className={classes.star}>
                    <Typography noWrap={false}>{getStar(location.star)}</Typography>
                    <Star className={classes.starIcon} />
                </div>
                <Button className={classes.seeMore} component={Link} to={"/location/" + location.name}>
                    Xem thêm
                </Button>
            </CardActions>
        </Card>
    )
}