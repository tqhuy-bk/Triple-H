import { makeStyles, alpha } from '@material-ui/core';
import color from './color';
import attr from './attr';

const feedReviewStyles = makeStyles(
  theme => ({
    title: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 20
    },
    create: {
      margin: '15px 0 15px 0'
    },
    createTourContainer: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 20,
      marginBottom: 30
    },
    createTour: {
      backgroundColor: color.turquoise,
      borderRadius: attr.borderRadius.md,
      padding: 10,
      display: 'flex',
      justifyContent: 'center'
      // paddingInline: 30,
    },
    containerText: {
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
      width: '100%'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    event: {
      paddingTop: 50
    },
    hot: {
      paddingTop: 50
    },
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 50
    },
    feedContent: {
      marginInline: 30,
      [theme.breakpoints.down('lg')]: {
        marginInline: 10
      },
      [theme.breakpoints.down('md')]: {
        marginInline: 5
      }
    }
}), {index: 1});

export default feedReviewStyles;
