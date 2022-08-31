import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const friendCardStyles = makeStyles(
  theme => ({
    friend: {
      marginTop: 20,
      borderRadius: attr.borderRadius.md,
      color: color.text,
      backgroundColor: color.white,
      padding: 10
    },
    tourRecommend:{
      borderRadius: attr.borderRadius.md,
      color: color.text,
      backgroundColor: color.white,
      padding: 10
    },
    friendHeader: {
      borderBottom: `1px solid ${color.gray}`,
      padding: 5
    },
    text: {
      fontSize: '1.15em'
      // fontWeight: 500,
    },
    tourRecommendTittle:{
      fontSize: 18,
      fontWeight: 500,
    },
    item: {
      borderRadius: attr.borderRadius.md,
      paddingInline: theme.spacing(4)
    },
    friendBlock: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 16,
      '& :not(:first-child)': {
        borderTop: '1px solid #e8e8e8'
      }
    },
    friendAvatar: {
      height: 40,
      width: 40,
      maxHeight: 40,
      borderRadius: '50%',
      cursor: 'pointer'
    },
    friendInfo: {
      padding: '0 10px',
      lineHeight: 1.3,
      cursor: 'pointer',
      '& :nth-child(1)': {
        fontSize: 15,
        color: '#393a4f',
        fontWeight: 500
      },
      '& :nth-child(2)': {
        fontSize: 13,
        color: '#393a4f'
      }
    },
    addFriend: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      transition: 'all 0.3s',
      cursor: 'pointer',
      marginLeft: 'auto',
      marginRight: 8
    },



    //recommend tour card
    list:{
      paddingBottom: 0
    },
    itemWrapper:{
      marginBottom: 5,
      height: 170,
      border: "1px solid #0000001f",
      borderRadius: attr.borderRadius.md
    },
    itemImage:{
      cursor: "pointer",
      position: "relative",
      height: "70%",
      overflow:"hidden"
    },
    image:{
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      objectFit: "cover",
      objectPosition: "center",
      transition: "opacity 0.35s, transform 0.35s",
       transform: "scale(1.12)",
       "&:hover": {
            opacity: 0.9,
            transform: "scale(1)",
        }
    },
    itemText:{
      left: 0,
      color: "#fff",
      bottom: 0,
      padding: 16,
      zIndex: 2,
      width:"100%",
      position: "absolute",
      fontWeight: 500,
      textShadow:"0px 1px 2px rgb(0 0 0 / 54%)",
      lineHeight: 1.75,
      fontSize: 20,
      backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0) 100%)"
    },
    username:{
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer'
    },
    subheader:{
      fontSize: '13px',
      color:"#0000008a",
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px'
      }
    }
  }),
  { index: 1 }
);

export default friendCardStyles;
