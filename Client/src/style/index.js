import { makeStyles } from "@material-ui/core";
import color from './color';
import attr from './attr';

import commentStyles from "./comment";
import postStyles from './post';
import leftbarStyles from "./leftbar";
import headerStyles from "./header";
import sliderStyles from "./slider";
import rightbarStyles from "./rightbar";
import inputStyles from "./input";
import feedStyles from "./feed";
import locationStyles from "./location";
import cardStyles from "./card";
import messageStyles from "./message";
import profileStyles from "./profile";
import tourdetailStyles from "./tourdetail";
import provinceStyles from "./province";
import friendCardStyles from "./friendRecommend";
import calendarStyles from "./calendar";
import mapCardStyles from "./mapCardStyle";
import notificationStyles from "./notification";
import formStyles from "./form";
import searchStyles from "./search";
import speedDialStyles from "./speeddial";
import eventStyles from "./event";
import locationCardStyles from "./locationCard";
import serviceStyles from "./service";
import modalListStyles from "./modalList";
import emojiPickerStyles from "./emojiPicker";
import modalStyles from "./modal";
import addServiceStyles from "./addservice";
import volunteerDetailStyles from "./volunteerDetail";
import authStyles from "./auth";
import adminStyles from "./adminStyles";
import volunteerStyles from "./volunteer";
import tableStyles from "./table";
import addVolunteerStyles from "./addVolunteer";
import feedReviewStyles from "./feedReview";
import helpStyles from "./help";
import myReviewStyles from "./myreview";

const useStyles = makeStyles((theme) => ({
    container:{
        margin: 0,
        paddingTop: 64
    },
    containerHome:{
        flexGrow: 1, 
        padding: 0,
        maxWidth: 1344,
        margin: "0 auto",
        width: "auto",
        [theme.breakpoints.down('md')]: {
            maxWidth: 1152
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 960
        }
    },
    containerProvince:{
        flexGrow: 1, 
        padding: 0,
        margin: "0 auto",
        width: "auto",
        marginTop: -50
    },
    wrapperProvinces:{
        marginTop: 70,
        paddingRight: 20,
        [theme.breakpoints.down('sm')]: {
            paddingRight: 0,
        }
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 200
    },
    rightbar: {
        // marginTop: 20,
        [theme.breakpoints.down('sm')]: {
            display: "none",
        }
    },
    notFoundContainer: {
        height: "100vh",
        textAlign: "center",
    },
    buttonCreate:{
        backgroundColor: color.turquoise,
        borderRadius: attr.borderRadius.md,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        width: 350,
        marginLeft: 30
    }

}), {index: 1});

export default useStyles;
export {
    commentStyles,
    postStyles,
    leftbarStyles,
    headerStyles,
    sliderStyles,
    rightbarStyles,
    inputStyles,
    feedStyles,
    locationStyles,
    cardStyles,
    messageStyles,
    profileStyles,
    tourdetailStyles,
    provinceStyles,
    friendCardStyles,
    calendarStyles,
    mapCardStyles,
    notificationStyles,
    formStyles,
    searchStyles,
    speedDialStyles,
    eventStyles,
    locationCardStyles,
    serviceStyles,
    modalListStyles,
    emojiPickerStyles,
    modalStyles,
    addServiceStyles,
    volunteerDetailStyles,
    authStyles,
    adminStyles,
    volunteerStyles,
    tableStyles,
    addVolunteerStyles,
    feedReviewStyles,
    helpStyles,
    myReviewStyles
};