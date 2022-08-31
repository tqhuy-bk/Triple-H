import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const profileStyles = makeStyles(
  theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      // display: "flex",
      // height: "100vh",
      paddingTop: '75px',
      marginBottom: 20
    },
    tabsWrap: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 50,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 0
      }
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      // width: "30%",
      marginTop: 50,
      [theme.breakpoints.down('sm')]: {
        borderRight: 'none',
        marginBottom: 20
      }
    },
    tab: {
      textAlign: 'center',
      textTransform: 'none',
      fontSize: 16,
      marginRight: 30
    },
    tabPanel: {
      flex: 1
    },
    change_background: {
      marginLeft: 10,
      width: '100%',
      height: '180px',
      position: 'relative'
    },
    change_background_upload: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      cursor: 'pointer'
    },
    change_bg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    change_wrapper: {
      padding: '0 10px',
      position: 'relative'
    },
    change_avatar: {
      width: '140px',
      height: '140px',
      marginTop: '-80px',
      // overflow: "hidden",
      position: 'relative',
      marginLeft: 30
    },
    change_avatar_upload: {
      position: 'absolute',
      bottom: 0,
      right: 0
      // transform: "translate(-50%,-50%)"
    },
    change_avatar_img: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '5px solid #fff',
      backgroundColor: color.white
    },
    change_form: {
      width: '100%',
      marginTop: 20,
      marginLeft: 20
    },
    container: {
      position: 'relative',
      maxWidth: '80%',
      height: 550,
      display: 'flex',
      marginTop: 70,
      flexDirection: 'column',
      marginBottom: -20,
      [theme.breakpoints.down('sm')]: {
        height: 450,
      }
    },
    profile_overImage: {
      backgroundColor: color.white,
      borderRadius: '10px',
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      height: '80%',
      cursor: 'pointer',
      transition: '0.8s',
      '&:hover': {
        filter: 'brightness(90%)'
      },
      [theme.breakpoints.down('sm')]: {
        height: '80%'
      }
    },
    profile_avatar__img: {
      backgroundColor: color.white,
      height: '200px',
      width: '200px',
      border: '5px solid white',
      cursor: 'pointer',
      transition: '0.8s',
      '&:hover': {
        filter: 'brightness(90%)'
      },
      [theme.breakpoints.down('sm')]: {
        height: '170px',
        width: '170px'
      }
    },
    profile_avatar: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center'
      }
    },
    profile_info: {
      position: 'absolute',
      display: 'flex',
      marginTop: 350,
      marginLeft: 40,
      [theme.breakpoints.down('sm')]: {
          marginTop: 280,
          marginLeft: 0
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
      }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    profile_button: {
      marginTop: '120px',
      marginLeft: '8vw',
      [theme.breakpoints.down('md')]: {
        marginLeft: '4vw'
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 100,
        marginLeft: 10
      }
    },
    button: {
      backgroundColor: color.turquoise,
      marginRight: '20px',
      padding: '8px',
      paddingInline: '16px',
      borderRadius: attr.borderRadius.md,
      textTransform: 'none',
      [theme.breakpoints.down('md')]: {
        marginBottom: 5
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: 10,
        paddingInline: 10,
        fontSize: 12
      }
    },
    infoUser: {
      display: 'flex',
      alignSelf: 'center',
      fontSize: "22px",
      
    },
  follow: {
    display: "flex",
    fontSize: "20px",
    color: "inherit",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      fontSize: "18px",
    },
  },
  followInfo: {
    marginRight: "20px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14
    },
  },
  change_password: {
    marginTop: 50
  },
  change_password_form: {
    margin: 30
  },
  cmnd_front: {
    width: 300,
    position: "relative",
    marginBottom: 10
  },
  cmnd_front_upload: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cmnd_front_image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  cmnd_textStrong: {
    fontWeight: "bold"
  },
  input_cmnd_number: {
    width: 550,
    marginBottom: 10
  },
  cmnd_icon_upload: {
    border: "2px solid white",
    color: "white",
  },
  confirmAccount: {
    marginTop: 20
  },
  state0: {
    color: "#ff7200",
    fontSize: 17
  },
  state1: {
    color: "#61c38e",
    fontSize: 17
  },
  state2: {
    color: "#ff0000",
    fontSize: 17
  },
  fullField: {
    width: "100%",
    marginBlock: 10
  },
  halfFeild: {
    width: "50%",
    marginBlock: 10
  },
  error: {
    fontSize: "15px",
    color: "red",
    marginInline: "20px",
    marginTop: "10px"
  },
  btnWrap: {
    display: 'flex',
    justifyContent: 'right'
  },
  updateBtn: {
    margin: 20
  },
  sizeImageChange: {
    width: 300,
    height: 200
  },
  // //Introduction
  introContainer:{
    overflow: "hidden",
    boxShadow: "0 2px 8px #00000026", 
    marginTop: 80,
    height: 380,
    width: "100%",
    borderRadius: attr.borderRadius.md,
    marginInline: 15,
    minHeight: 380
  },
  introHeader:{
    padding: "20px 0 10px 20px",
    borderBottom: "1px solid #d0d0d0"
  },
  introTabPanelItem:{
    display: "flex", 
    marginBottom: 30
  },
  introTabPanelIcon:{
    marginRight: 10
  },
  introTabPanel:{
    flex: 1,
    marginTop: 50, 
    marginLeft: 20
  },
  fullname:{
    fontSize: 25,
    fontWeight: 500,
    padding: "10px 10px 10px 0",
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    }
  },
  infoUsers:{
      alignSelf: 'center',
      fontSize: "22px",
      marginLeft: 20,
      marginTop: 60
  }

}), {index: 1});

export default profileStyles;
