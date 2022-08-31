import { makeStyles } from '@material-ui/core';
import color from './color';

const addVolunteerStyles = makeStyles(
  theme => ({
    root: {
      marginTop: 80,
      justifyContent: 'center',
      backgroundColor: color.white,
      paddingBottom: 30
    },
    formContainer: {
      marginBlock: 30,
      marginInline: 50
    },
    fullField: {
      width: '100%',
      marginBlock: 10
    },
    halfFeild: {
      width: '45%',
      marginBlock: 10,
      marginRight: 10
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: 50
    },
    itemContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBlock: 10,
      marginRight: 10,
      paddingInline: 10,
      paddingBlock: 5,
      borderRadius: 3,
      backgroundColor: color.background
    },
    formAdd: {
      width: '100%',
      marginBlock: 5,
      paddingBottom: 10
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
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
  { index: 1 }
);

export default addVolunteerStyles;
