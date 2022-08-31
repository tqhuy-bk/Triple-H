import { makeStyles } from '@material-ui/core';

import color from './color';

const commentStyles = makeStyles(
  theme => ({
    comment: {
      display: 'flex',
      marginTop: 10,
      marginBottom: 15,
      marginInline: 15
    },
    avatar: {
      marginRight: 10
    },
    // cmtInfo: {
    //     maxWidth: "70%",
    //     [theme.breakpoints.down("md")]: {
    //         maxWidth: 500,
    //     },
    //     [theme.breakpoints.down("sm")]: {
    //         maxWidth: 300,
    //     }
    // },
    content: {
      backgroundColor: color.background,
      padding: 10,
      borderRadius: 10,
      marginRight: 10,
      overflow: 'auto',
      maxWidth: '100%',
      display: 'block',
      minWidth: '50%'
    },
    cmtSubinfo: {
      display: 'flex',
      marginTop: 5
    },
    smallText: {
      fontSize: '12px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px'
      }
    },
    dateComment: {
      fontSize: '12px',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    dateCommentShort: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        fontSize: '10px'
      }
    },
    like: {
      marginInline: 10,
      display: 'flex'
    },
    time: {
      marginInline: 10
    },
    likeIcon: {
      fontSize: '15px'
    },
    likeBtn: {
      color: props => (props.like ? theme.palette.primary.main : 'black'),
      fontWeight: props => (props.like ? 600 : 400),
      marginInline: 5,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    userName: {
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    menuItem: {
      fontSize: 12
    },
    cancelBtn: {
      cursor: 'pointer',
      color: color.blue,
      fontSize: 14,
      marginLeft: 20,
      '&:hover': {
        textDecorationLine: 'underline'
      }
    }
  }),
  { index: 1 }
);

export default commentStyles;
