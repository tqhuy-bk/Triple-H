import { makeStyles} from '@material-ui/core';
import color from './color';
import attr from './attr';

const helpStyles = makeStyles(
  theme => ({
    container:{
        margin: 0,
        paddingTop: 64
    },
    helpDetailContainer:{
        maxWidth: 1280,
        flexGrow: 1, 
        padding: 0,
        margin: "0 auto",
    },
    help:{
        borderRadius: attr.borderRadius.md,
        color: color.text,
        backgroundColor: "#45d7c4",
        padding: 10
    },
    title:{
        fontSize: 20,
        fontWeight: 500,
        color: color.white
    },
    helpHeader:{
        borderBottom: `2px solid ${color.white}`,
        padding: 5,
        display: "flex",
        justifyContent: "space-between",
    },
    helpBody:{
        display: "flex"
    },
    fadeLoading:{
        width: 20,
        height: 20,
        backgroundColor: color.white,
        borderRadius: "50%",
        margin: "20 auto",
        position: "relative",
        "&::before":{
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            backgroundColor: "inherit",
            animation: "$fade 1s forwards infinite linear"
        }
    },
    "@keyframes fade": {
        "to": {
            transform: "scale(3)",
            opacity: 0,
         }
    },
    fadeLoadingCard:{
        width: 20,
        height: 20,
        backgroundColor: color.red,
        borderRadius: "50%",
        position: "relative",
        marginTop: 20,
        marginRight: 20,
        "&::before":{
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            backgroundColor: "inherit",
            animation: "$fadeCard 1s forwards infinite linear"
        }
    },
    "@keyframes fadeCard": {
        "to": {
            transform: "scale(3)",
            opacity: 0,
         }
    },
    buttonDetail:{
        color: color.white,
        borderRadius: 5,
        backgroundColor: "transparent",
        cursor: "pointer",
        fontWeight: 500,
        outline: "none",
        border: `1px solid ${color.white}`,
        fontSize: 13,
        position: "relative",
        isolation: "isolate",
        "&::before": {
            content: "''",
            height: "100%",
            width: 0,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: color.white,
            zIndex: -1,
            transition: "width 0.25s ease-in",
            color:"#45d7c4"
        },
        "&:hover::before": {
            width: "100%"
        },
        "&:hover": {
            color: "#45d7c4"
        },
    },
    cardHelpHeader:{
        paddingBottom:0
    },
    cardHelpAvatar:{
        width: 40,
        height: 40
    },
    buttonDetailCard:{
        color: "#57606f",
        borderRadius: 5,
        backgroundColor: "transparent",
        cursor: "pointer",
        fontWeight: 500,
        outline: "none",
        border: `1px solid #57606f`,
        fontSize: 13,
        position: "relative",
        isolation: "isolate",
        "&::before": {
            content: "''",
            height: "100%",
            width: 0,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#45d7c4",
            zIndex: -1,
            transition: "width 0.25s ease-in",
            color:"#45d7c4"
        },
        "&:hover::before": {
            width: "100%"
        },
        "&:hover": {
            color: color.white,
            border: `1px solid #45d7c4`,
        },
    }
}), {index: 1});

export default helpStyles;
