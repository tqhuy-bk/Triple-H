import { makeStyles } from '@material-ui/core';
import color from './color';
import attr from './attr';

const provinceStyles = makeStyles(
  theme => ({
    container: {
      margin: 'auto',
      width: 1300,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '0 16'
      }
    },
    img: {
      position: 'relative',
      textAlign: 'center',
      color: 'white'
    },
    image: {
      width: '100%',
      height: 700,
      // [theme.breakpoints.down("md")]: {
      //     width: "100%",
      //     height: 600,
      // },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: 300
      }
    },
    provinceName: {
      position: 'absolute',
      color: color.white,
      fontWeight: 400,
      fontSize: 100,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: color.black,
      opacity: 0.6,
      borderRadius: 100,
      padding: '20px 150px 20px 150px',
      border: '5px solid white',
      [theme.breakpoints.down('md')]: {
        fontSize: 64,
        padding: '15px 100px 15px 100px'
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 64,
        padding: '15px 100px 15px 100px'
      }
    },
    desContainer: {
      marginTop: 20,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      overflow: 'hidden',
      marginInline: 15,
      minHeight: '1050px'
    },
    title: {
      backgroundColor: color.turquoise,
      display: 'flex',
      justifyContent: 'center',
      padding: 15,
      borderRadius: `${attr.borderRadius.md}px ${attr.borderRadius.md}px 0 0`
    },
    desContent: {
      padding: 30
    },
    locationList: {
      marginBottom: 20,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      paddingBottom: 20,
      boxShadow: '0 2px 8px #00000026',
      overflow: 'hidden',
      marginInline: 15
    },
    map: {
      margin: '20px 0 20px 0',
      boxShadow: '0 2px 8px #00000026',
      marginInline: 15
    },
    patination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10
    },
    subtitleDes: {
      marginLeft: 10
    },
    ul: {
      marginLeft: 10,
      listStyleType: 'disc'
    },
    subsubtitleDes: {
      marginLeft: 30,
      whiteSpace: 'pre-line'
    },
    source: {
      display: 'flex',
      justifyContent: 'right',
      marginRight: 30,
      marginBottom: 30
    },
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 150
    },
    rightbar: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    rightWrap: {
      width: '100%',
      margin: '20px 0px 20px 0px',
      marginInlineEnd: 15
    },
    contribute: {
      display: 'flex',
      justifyContent: 'right'
    }
  }), {index: 1});

export default provinceStyles;
