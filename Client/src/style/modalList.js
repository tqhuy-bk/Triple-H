import { makeStyles } from '@material-ui/core';
import color from './color';

const modalListStyles = makeStyles(
  theme => ({
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
    modal_body_user_button: {
      textTransform: 'none',
      color: color.darkgray,
      marginTop: '27px',
      marginRight: '25px',
      // width: "30%",
      paddingInline: '20px',
      transition: '0.2s',
      '&:hover': {
        backgroundColor: color.darkgray,
        color: 'white'
        // border: "none",
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
        paddingInline: '5px',
        marginTop: '17px'
      }
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
      fontSize: '20px',
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px'
      }
    },
    imageList: {
      width:"100%"
      // margin: 20,
      // height: '100%'
      // [theme.breakpoints.down("md")]: {
      //     height: 400,
      // },
      // [theme.breakpoints.down("sm")]: {
      //     height: 200,
      // },
    },
    imageItem: {
      cursor: 'pointer',
      transition: '0.5s',
      '&:hover': {
        filter: 'brightness(85%)'
      }
    },
    image:{
      left: "50%",
      height: "100%",
      position: "relative",
      transform: "translateX(-50%)"
    },
    more: {
      cursor: 'pointer',
      transition: '0.5s',
      '&:hover': {
        filter: 'brightness(85%)'
      },
      filter: 'brightness(90%)'
    },
    textCenter: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white'
    },
    userWrap: {
      display: 'flex'
    }
}), {index: 1});

export default modalListStyles;
