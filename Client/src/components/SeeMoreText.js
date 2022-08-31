import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    moreButton: {
        marginInline: 10,
        fontWeight: 500,
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        }
    },
    text:{
        wordBreak: "break-word"
    }
}))

export function SeeMoreText(props) {
    const [more, setMore] = useState(false);

    const classes = useStyles();

    const handleShowMore = () => {
        setMore(state => !state);
    }

    const { maxText, text, variant } = props;

    return (
        <Typography className={classes.text} variant={variant} noWrap={false}>
            {text?.length < maxText ? text :
                (
                    <>
                        <span>{text?.slice(0, maxText)}</span>
                        {more ? <span>{text?.slice(maxText)}</span> : <span>...</span>}
                        {<span onClick={handleShowMore} className={classes.moreButton}>{more ? "Thu gọn" : "Xem thêm"}</span>}
                    </>
                )
            }
        </Typography>
    )
}