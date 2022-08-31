import { makeStyles } from '@material-ui/core';
import color from './color';
import attr from './attr';

const cardStyles = makeStyles(
  theme => ({
    cardContainer: {
      margin: 20,
      borderRadius: attr.borderRadius.md,
      [theme.breakpoints.down('sm')]: {
        marginBlock: 10
      }
    },
    image: {
      height: 180
    },
    locationName: {
      marginInline: 20,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 20
      }
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingInline: 20,
      marginInline: 20,
      marginBottom: 10
    },
    star: {
      display: 'flex'
    },
    starIcon: {
      marginInline: 5,
      color: color.yellow
    },
    seeMore: {
      backgroundColor: color.turquoise,
      borderRadius: attr.borderRadius.md,
      paddingInline: 10,
      textTransform: 'none'
    },
    weatherCardContainer: {
      borderRadius: attr.borderRadius.md,
      marginBottom: 10
    },
    covidCardContainer: {
      marginTop: 15,
      borderRadius: attr.borderRadius.md
    },
    content: {
      padding: 10
    },
    icon: {
      width: 150,
      marginTop: 0,
      marginBottom: 0,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    weatherTitle: {
      textAlign: 'center'
    },
    temp: {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: 20,
      marginRight: 20,
      [theme.breakpoints.down('md')]: {
        marginLeft: 10,
        marginRight: 10
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginRight: 0
      }
      // [theme.breakpoints.down("xs")]: {
      //     marginLeft: 20,
      //     marginRight: 30,
      // },
    },
    detailInfo: {
      marginTop: 30,
      paddingInline: 20,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    detailInfoCovid: {
      marginTop: 30,
      paddingInline: 20,
      [theme.breakpoints.down('sm')]: {
        marginTop: 10,
        paddingInline: 5
      }
    },
    itemInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: 30,
      marginLeft: 20
    },
    value: {
      fontSize: 18
    },
    title: {
      backgroundColor: color.turquoise,
      borderRadius: attr.borderRadius.md,
      display: 'flex',
      justifyContent: 'center',
      padding: 10
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 30
    },
    chart: {
      margin: 30,
      [theme.breakpoints.down('md')]: {
        margin: 0
      }
    },
    line: {
      maxWidth: '100%',
      // marginRight: 20,
      height: 15
    },
    iconStar: {
      color: color.yellow,
      fontSize: '50px',
      marginRight: 15,
      [theme.breakpoints.down('md')]: {
        fontSize: 36
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 30
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 24
      }
    },
    starContent: {
      marginInline: 30
    },
    starContainer: {
      borderRadius: attr.borderRadius.md
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        fontSize: 16
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 8
      }
    },
    textStar: {
      [theme.breakpoints.down('md')]: {
        fontSize: 36
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 30
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 24
      }
    },
    rateLabel: {
      marginRight: 10
    },
    // center: {
    //     display: "flex",
    //     justifyContent: "center"
    // },
    button: {
      paddingInline: 20,
      backgroundColor: color.turquoise,
      marginTop: 20
    },
    locationPopper: {
      width: 300
      // height: 280,
    },
    positionContainer: {
      display: 'flex',
      width: 300
    },
    locationIcon: {
      fontSize: 24,
      color: color.red
      // fill: '#ED4956'
    },
    weatherFocastCard: {
      width: 500,
      margin: 10,
      borderRadius: 5
    },
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      margin: 50
    },
    buttonWrap: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 10
    },
    fullnameWrap: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 10
    },
    addButton: {
      backgroundColor: color.turquoise
    },
    link: {
        cursor: 'pointer',
        "&:hover": {
            textDecorationLine: 'underline'
        }
    },
    imageProvince:{
       height: 230,
       opacity: 0.5,
       transition: "opacity 0.35s, transform 0.35s",
       transform: "scale(1.12)",
       "&:hover": {
            opacity: 0.9,
            transform: "scale(1)",
        }
    },
    cardProvinceContainer:{
        margin: 8,
        borderRadius: attr.borderRadius.md,
        [theme.breakpoints.down("sm")]: {
            marginBlock: 8,
        }
    },
    buttonProvince:{
        color: "#63b696",
        borderRadius: 5,
        backgroundColor: "transparent",
        cursor: "pointer",
        fontWeight: 500,
        outline: "none",
        border: `1px solid ${color.turquoise}`,
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



    //recommend Card:

    
}), {index: 1}
);

export default cardStyles;
