import { makeStyles } from '@material-ui/core';
import color from './color';
import attr from './attr';

const locationStyles = makeStyles(
  theme => ({
    container: {
      width: 1500,
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '0 16'
      }
    },
    imageList: {
      marginTop: 20,
      borderRadius: attr.borderRadius.md,
      height: 400,
      padding: 0,
      display: 'flex',
      overflow: 'hidden',
      boxShadow: '0 2px 8px #00000026',
      [theme.breakpoints.down('sm')]: {
        marginInline: 15
      }
    },
    coverText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    name: {
      fontSize: 120,
      fontWeight: 400,
      color: color.black
    },
    provinceName: {
      fontWeight: 400,
      [theme.breakpoints.down('sm')]: {
        fontSize: '26px'
      }
    },
    iconProvince: {
      fontSize: 30,
      marginRight: '10px',
      color: 'black',
      [theme.breakpoints.down('sm')]: {
        fontSize: '30px'
      }
    },
    infoPanel: {
      marginInline: 15,
      marginTop: 20,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      height: 400,
      boxShadow: '0 2px 8px #00000026',
      overflow: 'hidden'
    },
    infoHeader: {
      background: `linear-gradient(90deg,${color.turquoise},#dbf8ec)`,
      display: 'flex',
      justifyContent: 'center',
      padding: 8,
      borderRadius: `${attr.borderRadius.md}px ${attr.borderRadius.md}px 0 0`
    },
    infoContent: {
      padding: 30
    },
    map: {
      height: 400,
      marginInline: 15,
      marginTop: 20,
      boxShadow: '0 2px 8px #00000026'
    },
    fullname: {
      marginTop: 100,
      display: 'flex',
      justifyContent: 'center'
    },
    provinceWrap: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 15
    },
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 150
    },
    imageLength1: {
      cursor: 'pointer',
      height: '100%',
      width: '100%',
      transition: '0.5s',
      '&:hover': {
        filter: 'brightness(85%)'
      },
      objectFit: 'cover',
      borderRight: '3px solid white'
    },
    image1: {
      cursor: 'pointer',
      height: '100%',
      width: '50%',
      transition: '0.5s',
      '&:hover': {
        filter: 'brightness(85%)'
      },
      objectFit: 'cover',
      borderRight: '3px solid white'
    },
    image2: {
      cursor: 'pointer',
      height: '50%',
      transition: '0.5s',
      '&:hover': {
        filter: 'brightness(85%)'
      },
      objectFit: 'cover',
      width: '100%'
    },
    image3: {
      cursor: 'pointer',
      height: '50%',
      transition: '0.5s',
      '&:hover': {
        filter: 'brightness(85%)'
      },
      objectFit: 'cover',
      width: '100%'
    },
    titleFullname: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 40
      }
    },
    rate: {
      marginInline: 15,
      marginTop: 20,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      position: 'sticky',
      top: '80px'
    },
    weather: {
      marginInline: 15,
      marginTop: 20,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      position: 'sticky',
      top: '80px'
    },
    review: {
      marginTop: 20,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      padding: '8px 16px',
      [theme.breakpoints.down('sm')]: {
        marginInline: 15
      }
    },
    reviewTop: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 6
    },
    overView: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      position: 'relative',
      borderRadius: 20,
      background: `linear-gradient(90deg,${color.turquoise},#dbf8ec)`
    },
    overView_image: {
      width: '30%',
      height: '100%',
      textAlign: 'center',
      position: 'relative'
    },
    overView_text: {
      flexGrow: 1,
      padding: '10px 8px'
    },
    imageMore: {
      position: 'absolute',
      top: 'auto',
      right: 'auto',
      bottom: 10,
      left: 10,
      cursor: 'pointer',
      fontSize: 16,
      opacity: 1,
      padding: '4px 10px',
      color: '#fff',
      backgroundColor: '#000000aa',
      borderRadius: attr.borderRadius.md
    }
  }),
  { index: 1 }
);

export default locationStyles;
