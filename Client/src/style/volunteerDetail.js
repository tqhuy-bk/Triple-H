import { makeStyles } from '@material-ui/core';
import color from './color';

const volunteerDetailStyles = makeStyles(
  theme => ({
    volunteerDetailTitle: {
      // fontWeight: 400,
      // fontSize: "30px"
      marginBottom: 20
    },
    volunteerInfo: {
      marginTop: '20px',
      maxWidth: '80%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
      }
    },
    scheduleItem: {
      maxWidth: '75%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
      }
    },
    timeline: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    smallTimeline: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20
      }
    },
    timelineWrap: {
      display: 'flex',
      overflow: 'auto'
    },
    listTitle: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex'
      },
      [theme.breakpoints.down('xs')]: {
        display: 'block'
      }
    },
    username: {
      fontWeight: 500,
      fontSize: 18,
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    activeTimeline: {
      backgroundColor: '#52BEDB',
      color: 'black',
      textTransform: 'none',
      [theme.breakpoints.down('sm')]: {
        marginInline: 20,
        paddingInline: 10
      }
    },
    unactiveTimeline: {
      color: 'black',
      textTransform: 'none',
      [theme.breakpoints.down('sm')]: {
        marginInline: 20
      }
    },
    activeDot: {
      backgroundColor: '#52BEDB !important'
    },
    unactiveDot: {
      color: 'gray'
    },
    volunteerRegister: {
      marginTop: 20,
      marginBottom: 30
    },
    registerAll: {
      marginTop: 10,
      marginBottom: 20
    },
    registerTable: {
      width: '80%',
      border: '1px solid #888',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    registerTableTitle: {
      padding: '10px 15px',
      borderRight: '1px solid #888',
      borderBottom: '1px solid #888'
    },
    registerTableData: {
      padding: '10px 15px',
      borderRight: '1px solid #888'
    },
    registerTableBooking: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    registerTableBookingButton: {
      // height: 50,
      // marginTop: 10,
      backgroundColor: '#a5dec8',
      [theme.breakpoints.down('sm')]: {
        height: 35,
        fontSize: 11
      }
    },
    registerItemBooking: {
      display: 'flex',
      backgroundColor: 'white',
      width: '400px',
      padding: '10px 15px',
      justifyContent: 'space-around'
    },
    registerItemBookingButton: {
      // height: 50,
      marginTop: 20,
      backgroundColor: '#a5dec8'
    },
    volunteerOther: {
      maxWidth: '80%'
    },

    comments: {
      width: '75%',
      boxShadow: '0 2px 8px #00000026',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      [theme.breakpoints.down('md')]: {
        width: '90%'
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    line: {
      width: '80%',
      color: 'black'
    },
    listCmt: {
      marginTop: 20
    },
    buttonShowCmt: {
      fontSize: 20
    },
    wrapInput: {
      width: '100%'
    },
    infoVolunteer: {
      margin: '0 auto',
      boxShadow: '0 2px 8px #00000026',
      backgroundColor: '#fff',
      borderRadius: 10,
      [theme.breakpoints.down('sm')]: {
        marginTop: '20px'
      }
    },

    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      width: '600px',
      height: '650px',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '15px',
      overflow: 'hidden',
      padding: '2px',
      // boxShadow: theme.shadows[5]
      [theme.breakpoints.down('sm')]: {
        width: '360px',
        height: '460px'
      }
    },
    modal_header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: '1px solid #f1f1f1'
    },
    modal_header_left: {
      fontSize: '22px',
      fontWeight: 800,
      color: '#0f1419'
    },
    modal_header_closeIcon: {
      color: color.gray,
      fontSize: '20px',
      width: '25px',
      height: '25px'
    },
    modal_body: {
      maxHeight: '590px',
      height: '590px',
      overflowY: 'auto'
    },
    modal_body_user: {
      cursor: 'initial',
      minHeight: '90px',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #f1f1f1',
      zIndex: 8,
      transition: 'all .15s linear',
      [theme.breakpoints.down('sm')]: {
        minHeight: '60px'
      }
    },
    userWrap: {
      display: 'flex'
    },
    avatar: {
      // width: "10%"
      marginTop: '25px',
      marginLeft: '25px',
      marginRight: '25px',
      [theme.breakpoints.down('sm')]: {
        height: '30px',
        width: '30px',
        marginRight: '15px',
        marginTop: '15px'
      }
    },
    fullnameWrap: {
      marginTop: '30px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '20px'
      }
    },
    fullname: {
        fontSize: "20px",
        cursor: "pointer",
        "&:hover": {
            textDecorationLine: 'underline',
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
        },
    },
    reviewBtn: {
      marginRight: 5,
      color: "#63b696",
      borderRadius: 5,
      backgroundColor: "transparent",
      cursor: "pointer",
      fontWeight: 500,
      outline: "none",
      border: `1px solid ${color.turquoise}`,
      fontSize: 12,
      position: "relative",
      isolation: "isolate",
      "&::before": {
          content: "''",
          height: "100%",
          width: 0,
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#63b696",
          zIndex: -1,
          transition: "width 0.25s ease-in",
          color:color.white
      },
      "&:hover::before": {
          width: "100%"
      },
      "&:hover": {
          color: color.white
      },
    },
}), {index: 1})

export default volunteerDetailStyles;
