import { makeStyles, alpha } from '@material-ui/core';
import color from './color';
import attr from './attr';

const feedStyles = makeStyles(
  theme => ({
    container: {
      paddingTop: 60,
      paddingLeft: 10,
      paddingRight: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 20
    },
    create: {
      marginTop: 20,
      marginBottom: 20,
      border: '1px solid #e8e8e8',
      background: '#fff',
      borderRadius: attr.borderRadius.md,
      boxShadow: 'none'
    },
    createWrapper: {
      borderRadius: attr.borderRadius.md
    },
    compose: {
      padding: 16,
      borderBottom: '1px solid #e8e8e8',
      height: 60
    },
    composeForm: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    },
    composeFormImage: {
      height: 42,
      width: 42,
      borderRadius: '50%'
    },
    composeOptions: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 8,
      borderRadius: `0 0 ${attr.borderRadius.md}px ${attr.borderRadius.md}px`,
      background: color.white,
      cursor: 'pointer'
    },
    composeOption: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '6px 16px',
      marginRight: 10,
      background: '#f7f7f7',
      borderRadius: 500,
      fontSize: 15,
      color: '#888da8',
      transition: 'all 0.3s'
    },
    composeIcon: {
      height: 20,
      width: 20,
      transition: 'all 0.3s',
      marginRight: 5
    },
    createTourContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      position: 'relative',
      isolation: 'isolate',
      backgroundColor: color.turquoise,
      padding: 10,
      paddingInline: 20,
      borderRadius: attr.borderRadius.md,
      [theme.breakpoints.down('sm')]: {
        padding: 5,
        paddingInline: 10,
        marginBlock: 10
      },
      '&::before': {
        content: "''",
        height: '100%',
        width: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#77a694',
        zIndex: -1,
        borderRadius: attr.borderRadius.md,
        transition: 'width 0.25s ease-in'
      },
      '&:hover::before': {
        width: '100%'
      },
      '&:hover': {
        color: color.white
      },
      transition: 'color 0.25s ease-in'
    },
    contentSubNavList: {
      backgroundColor: color.background,
      borderRadius: `0 0 ${attr.borderRadius.md}px ${attr.borderRadius.md}px`,
      justifyContent: 'space-evenly'
    },
    createTour: {
      position: 'relative',
      isolation: 'isolate',
      backgroundColor: color.turquoise,
      borderRadius: attr.borderRadius.md,
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 10,
      width: '100%',
      '&::before': {
        content: "''",
        height: 0,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#77a694',
        zIndex: -1,
        borderRadius: attr.borderRadius.md,
        transition: 'height 0.25s ease-in'
      },
      '&:hover::before': {
        height: '100%'
      },
      '&:hover': {
        color: color.white
      },
      transition: 'color 0.25s ease-in'
    },
    contentSubNav: {
      position: 'sticky',
      zIndex: 2,
      top: 64,
      marginBottom: 10,
      boxShadow: '0px 5px 25px 0px #08070717',
      backgroundColor: color.background,
      borderRadius: `0 0 ${attr.borderRadius.md}px ${attr.borderRadius.md}px`
    },
    containerText: {
      // width: "90%",
      // width: "100%",
      marginInline: 20,
      display: 'flex',
      alignSelf: 'center',
      backgroundColor: color.white,
      paddingInline: theme.spacing(5),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: attr.borderRadius.md,
      border: '1px solid rgba(47, 53, 66, 0.5)',
      '&:hover': {
        backgroundColor: alpha('#aaa', 0.15)
      }
    },
    createText: {
      marginLeft: 20,
      width: '100%'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    event: {
      // paddingTop: 50,
    },
    hot: {
      paddingTop: 50
    },
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 50
    },
    filterContainer: {
      position: 'sticky',
      top: 64,
      marginTop: 20,
      borderRadius: attr.borderRadius.md,
      color: color.text,
      backgroundColor: color.white,
      padding: 10,
      marginLeft: 10
    },
    filterHeader: {
      borderBottom: `1px solid ${color.gray}`,
      padding: 5
    },
    filterBody: {
      overflow: 'hidden',
      width: '100%'
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    filterTour: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    hashtagContainer: {
      marginTop: 120,
      width: '60%',
      [theme.breakpoints.down('md')]: {
        width: '80%'
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  }),
  { index: 1 }
);

export default feedStyles;
