import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const locationCardStyles = makeStyles(
  theme => ({
    locationCardContainer: {
      margin: 10,
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.white,
      width: 400,
      [theme.breakpoints.down('sm')]: {
        width: 200
      }
    },
    seeMoreBtn: {
      paddingInline: 10,
      backgroundColor: color.turquoise,
      margin: 10,
      [theme.breakpoints.down('sm')]: {
        margin: 2
      }
    },
    media: {
      height: 300,
      [theme.breakpoints.down('sm')]: {
        height: 150
      }
    },
    content: {
      margin: 10,
      [theme.breakpoints.down('sm')]: {
        margin: 2
      }
    },
    rate: {
      marginTop: 10,
      [theme.breakpoints.down('sm')]: {
        marginTop: 3
      }
    },
    fullname: {
      '&:hover': {
        textDecorationLine: 'underline'
      }
    }
  }),
  { index: 1 }
);

export default locationCardStyles;
