import { makeStyles } from '@material-ui/core';
import color from './color';
import attr from './attr';

const serviceStyles = makeStyles(
  theme => ({
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      marginBlock: 20,
      marginInline: 30
    },
    listContainer: {
      marginInline: 20,
      marginBlock: 50,
      [theme.breakpoints.down('sm')]: {
        marginInline: 0
      }
    },
    container: {
      margin: '16px 0 16px 0',
      [theme.breakpoints.down('sm')]: {
        margin: 10
      }
    },
    serviceName: {
      marginBottom: 10,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    imageReview: {
      cursor: 'pointer'
    },
    rate: {
      marginTop: 5
    },
    discount: {},
    seeReview: {
      marginInline: 30,
      marginBottom: 20,
      backgroundColor: color.turquoise
    },
    reviewContainer: {
      width: 700,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: color.cloud,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    reviewItemContainer: {
      margin: 20,
      display: 'flex'
    },
    reviewContentContainer: {
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.lightgray,
      padding: 10,
      width: '100%',
      marginInline: 30
    },
    reviewerName: {
      fontSize: 16,
      fontWeight: 500,
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    reviewContent: {
      fontSize: 14
    },
    formReview: {
      // width: "100%",
      // marginRight: 40
    },
    contentInput: {
      backgroundColor: color.lightgray,
      borderRadius: attr.borderRadius.md,
      paddingInline: 10,
      width: '100%',
      fontSize: 14
    },
    contentWrap: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    formContainer: {
      // marginInline: 20,
      width: '100%'
    },
    reviewArea: {
      // position: 'absolute',
      // bottom: 0
      marginBottom: 30
    },
    contentReview: {
      marginInline: 20
    },
    contentContainerWrap: {
      position: 'relative',
      overflowY: 'auto'
    },
    center: {
      textAlign: 'center'
    },
    reviewTitle: {
      marginLeft: 30
    },
    detailDes: {
      marginInline: 30
    },
    closeButton: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'right'
      }
    },
    titleService: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
      [theme.breakpoints.down('md')]: {
        marginTop: 50
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 80
      }
    }
  }),
  { index: 1 }
);

export default serviceStyles;
