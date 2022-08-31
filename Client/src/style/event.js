import { makeStyles } from '@material-ui/core';
import color from './color';

const eventStyles = makeStyles(
  theme => ({
    eventCardContainer: {
      width: 400,
      margin: 20,
      [theme.breakpoints.down('sm')]: {
        width: 300
      }
    },
    media: {
      height: 300,
      [theme.breakpoints.down('sm')]: {
        height: 200
      }
    },
    imgBg: {
      backgroundImage: `url(https://toquoc.mediacdn.vn/2018/12/25/cau-vang-ba-na-3-15457134861131150541874.jpg)`,
      height: 700,
      display: 'flex',
      textAlign: 'center',
      maxWidth: '100%',
      overflow: 'hidden',
      width: '100%',
      justifyContent: 'space-between',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    coverText: {
      paddingTop: 120
      // textAlign: 'center !important'
    },
    content: {
      width: '60%',
      marginBottom: 30
    },
    paperContent: {
      margin: 20
      // paddingTop: 20,
    },
    cardContent: {
      padding: 20,
      marginTop: 50,
      marginInline: 30
    },
    time: {
      marginTop: 10,
      display: 'flex',
      color: 'black'
    },
    name: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 18
      },
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    province: {
      marginBottom: 10,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 5,
        fontSize: 16
      }
    },
    timedes: {
      marginBottom: 10,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 5,
        fontSize: 14
      }
    },
    arrow: {
      marginTop: 180
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    fullname: {
      color: color.black,
      [theme.breakpoints.down('md')]: {
        fontSize: 32
      }
    },
    provinceName: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10
    },
    locationIcon: {
        fontSize: "40px",
        marginRight: "10px",
        color: color.black
    },
}), {index: 1});


export default eventStyles;
