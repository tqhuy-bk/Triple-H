import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const notificationStyles = makeStyles(
  theme => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    fixWidth: {
      maxWidth: '60%',
      backgroundColor: color.white,
      paddingBottom: '1px',
      [theme.breakpoints.down('md')]: {
        maxWidth: '100%'
      }
    },
    list: {
      margin: 50
    },
    itemContainer: {
      cursor: 'pointer',
      marginTop: 30,
      paddingTop: 20,
      paddingBottom: 20,
      paddingInline: 70,
      backgroundColor: color.lightgray,
      height: 100,
      borderRadius: attr.borderRadius.md,
      transition: '0.5s',
      '&:hover': {
        backgroundColor: color.silver
      },
      [theme.breakpoints.down('sm')]: {
        paddingInline: 20
      }
    },
    unSeen: {
      cursor: 'pointer',
      marginTop: 30,
      paddingTop: 20,
      paddingBottom: 20,
      paddingInline: 70,
      height: 100,
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.gray,
      [theme.breakpoints.down('sm')]: {
        paddingInline: 20
      }
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 150
    },
    seeAll: {
      color: color.blue,
      margin: 10,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    avatar: {
      marginRight: theme.spacing(2)
    },
    fullname: {
      marginRight: '5px',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14
      }
    },
    timeAgo: {
      color: color.timeAgoGray,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    },
    content: {
      whiteSpace: 'pre-line',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14
      }
    }
  }),
  { index: 1 }
);
export default notificationStyles;
