import { makeStyles, alpha } from '@material-ui/core';
import color from './color';
import attr from './attr';

const headerStyles = makeStyles(
  theme => ({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      // paddingTop: 5,
      // paddingBottom: 5,
      backgroundColor: '#57606F'
    },
    search: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: alpha('#000', 0.15),
      '&:hover': {
        backgroundColor: alpha('#000', 0.25)
      },
      marginLeft: 300,
      borderRadius: attr.borderRadius.md,
      width: '40%',
      padding: 3,
      [theme.breakpoints.down('md')]: {
        marginLeft: 100
      },
      [theme.breakpoints.down('sm')]: {
        display: props => (props.open ? 'flex' : 'none'),
        width: '70%',
        marginLeft: 10
      }
    },
    searchIcon: {
      marginLeft: 10
    },
    input: {
      width: '100%',
      color: 'white',
      marginLeft: theme.spacing(1)
    },
    icons: {
      alignItems: 'center',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        display: props => (props.open ? 'none' : 'flex')
      }
    },
    badge: {
      marginRight: theme.spacing(1),
      color: color.white
    },
    avatar: {
      marginRight: theme.spacing(2)
    },
    user: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(2)
    },
    userName: {
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    searchButton: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: props => (props.open ? 'none' : 'flex'),
        color: 'white'
      }
    },
    cancel: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: props => (props.open ? 'flex' : 'none'),
        cursor: 'pointer'
      }
    },
    button: {
      color: color.white,
      marginInline: 5,
      padding: 10,
      // borderRadius: attr.borderRadius.sm,
      textTransform: 'none'
    },
    arrow: {
      position: 'absolute',
      fontSize: 7,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid'
      }
    },
    logo: {
      color: '#fff'
    },
    grow: {
      transformOrigin: 'center bottom'
    },
    paperNoti: {
      width: 450,
      padding: 10,
      [theme.breakpoints.down('sm')]: {
        width: 400
      }
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    seeAll: {
      color: color.blue,
      margin: 10,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    notiTitle: {
      marginInline: 10
    },
    notiItem: {
      borderRadius: attr.borderRadius.md
    },
    unSeen: {
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.lightgray,
      marginBlock: 3
    },
    notiHeader: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    markAllRead: {
      fontSize: 14,
      cursor: 'pointer',
      color: color.blue,
      margin: 5,
      border: 'none',
      backgroundColor: 'none',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}), {index: 1});

export default headerStyles;
