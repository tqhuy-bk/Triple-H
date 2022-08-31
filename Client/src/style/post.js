import { makeStyles } from '@material-ui/core';

import color from './color';
import attr from './attr';

const postStyles = makeStyles(
  theme => ({
    cardContainer: {
      marginBottom: 15,
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.white,
      position: 'relative'
    },
    userName: {
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    line: {
      width: '80%'
    },
    listCmt: {
      marginTop: 20
    },
    title: {
      paddingBottom: 20,
      color: color.text,
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    location: {
      padding: 5,
      cursor: 'pointer',
      color: color.text
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    hashtagWrap: {
      marginTop: 10
    },
    hashtag: {
      display: 'inline',
      marginRight: 5,
      color: color.brightgreek,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    image: {
      cursor: 'pointer',
      transition: '0.8s',
      '&:hover': {
        filter: 'brightness(90%)'
      }
    },
    imageTour:{
        cursor: 'pointer',
        transition: '0.8s',
        width: "100%",
        height: 450,
        objectFit: "cover",
        '&:hover': {
          filter: 'brightness(90%)'
        },
        [theme.breakpoints.down('sm')]: {
          height: 300,
        }
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    contentWrap: {
      paddingTop: 100,
      width: '70%',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    subheader: {
      cursor: 'pointer',
      fontSize: '13px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px'
      }
    },
    delete: {
      backgroundColor: color.red,
      '&:hover': {
        backgroundColor: color.darkred
      }
    },
    loadMoreComment: {
      color: "#8e8e8e",
      marginInline: 20,
      cursor: 'pointer',
      fontWeight: 500,
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    loadingComment: {
      marginInline: 20,
      cursor: 'wait'
    },
    errorComment: {
      marginInline: 20
    },
    menuWrap: {
      left: '-80px !important',
      [theme.breakpoints.down('sm')]: {
        left: '-60px !important'
      }
    },
    menuIcon: {
      marginRight: 5
    },
    reportWrap: {
      width: 548,
      height: 760,
      boxShadow: '0 2px 8px #00000026',
      backgroundColor: color.white,
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'hidden',
      borderRadius: attr.borderRadius.md,
      maxWidth: 548
    },
    reportHeader: {
      height: 60,
      borderBottom: `1px solid ${color.gray}`,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between'
    },
    reportHeader_text: {
      paddingLeft: '40%'
    },
    reportBody: {
      padding: 20
    },
    reportList: {
      width: '100%',
      overflowY: 'scroll',
      height: 500
    },
    reportListForm: {
      display: 'inline-block',
      width: '100%'
    },
    reportListItem: {
      width: '100%'
    },
    reportListItemRadio: {
      width: '100%'
    },
    input: {
      width: '100%',
      height: 80,
      backgroundColor: color.cloud,
      marginTop: 10,
      padding: 10
    },
    reportIcon: {
      marginLeft: '45%',
      backgroundColor: color.cloud,
      marginTop: 5,
      '&:hover': {
        backgroundColor: color.blue
      }
    },
    cardHeader: {
      padding: '16px 16px 0 16px'
    },

    //images
    postImage: {
      width: "100%",
      position: 'relative',
      margin: '10px 0'
    },
    masonryGrid: {
      position: 'relative',
      // display: 'flex',
      alignItems: 'center'
    },

    //iconPost
    iconButton: {
      color: 'white',
      // backgroundColor: "#a5dec8",
      cursor: 'pointer',
      fontSize: 20,
      margin: 10,
      transition: '0.5s',
      animation: 'bouncy 0.6s',
      '&:hover': {
        fontSize: 25
      },
      '&:active': {
        fontSize: 25
      }
    },

    likedIcon: {
      color: 'white',
      cursor: 'pointer',
      margin: 10,
      fontSize: 15,
      animation: 'bouncy 0.6s',
      '&:active': {
        fontSize: 15
      }
    },
    likeWrapper: {
      position: 'absolute',
      bottom: -18,
      right: 10,
      maxHeight: 54,
      cursor: 'pointer'
    },
    commentWrapper: {
      position: 'absolute',
      bottom: -18,
      right: 58,
      maxHeight: 50,
      cursor: 'pointer'
    },
    shareWrapper: {
      position: 'absolute',
      bottom: -18,
      right: 105,
      maxHeight: 50,
      cursor: 'pointer'
    },
    likeButton: {
      position: 'relative',
      width: 43,
      height: 43,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0px 5px 43px #00000026',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto',
      textDecoration: 'none',
      opacity: '1 !important',
      overflow: 'hidden',
      transition: 'all 0.3s'
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 16
    },
    likers: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    liker: {
      height: 30,
      width: 30,
      borderRadius: '50%',
      border: '3px solid #fff',
      '&:not(:first-child)': {
        marginLeft: -12
      }
    },
    likersText: {
      marginLeft: 10,
      lineHeight: 1.4,
      color: '#888da8',
      fontSize: 13
    },
    socialCount: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'stretch'
    },
    likeCount: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '0 3px'
    },
    postActions: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: -40,
      flexDirection: 'row-reverse',
      marginRight: 10
    },
    likeWrapperNotImage: {
      margin: '0 2px'
    },
    commentWrapperNotImage: {
      margin: '0 2px'
    },
    shareWrapperNotImage: {
      margin: '0 2px'
    }
}), {index: 1});

export default postStyles;
