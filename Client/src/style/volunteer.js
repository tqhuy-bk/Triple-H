import { makeStyles } from '@material-ui/core';
import color from './color';
import attr from './attr';
const volunteerStyles = makeStyles(
  theme => ({
    root: {
      maxWidth: '100%',
      margin: "0px 10px 20px 10px",
      borderRadius: attr.borderRadius.md
    },
    media: {
      height: 200,
      position: "relative"
    },
    volunteerState:{
      position: "absolute",
      top: 0,
      right:0,
      backgroundColor: "#da5858",
      color: color.white,
      borderBottomLeftRadius: attr.borderRadius.md,
      boxShadow: "0 2px 8px #0000009c",
      padding: "10px 15px 10px 15px"
    },
    name: {
      fontWeight: 500,
      fontSize: 20,
      marginBottom: 15,
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    username: {
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
  subheader: {
    fontSize: '13px',
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    }
  },
  buttonCreate:{
    backgroundColor: color.turquoise,
    borderRadius: attr.borderRadius.md,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    width: 350,
    marginLeft: 30
  },
  menuWrap:{
    left: '-80px !important',
    [theme.breakpoints.down('sm')]: {
      left: '-60px !important'
    }
  },
  menuIcon: {
    marginRight: 5
  },
  delete: {
    backgroundColor: "red"
  },



  filterWrapper:{
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "10px 10px 20px 30px"
  },
  filterForm:{
    paddingLeft: 40,
    fontSize: 16,
    display:"flex",
    alignItems: "center"
  },
  filterCost:{
    fontWeight: 500,
    padding: "5px 30px 5px 30px",
    border:"1px solid black",
    borderRadius: attr.borderRadius.md,
    cursor:"pointer",
    marginLeft: 10,
    minWidth: 70
  },
  popoverCost:{
    width: 300,
    height: 100,
    margin: 20,
    borderRadius: attr.borderRadius.md
  },
  sliderCost:{
    padding: 20
  },
  sliderWrap:{
      padding: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      width: "250px",
      height: "50px",
      borderRadius: attr.borderRadius.sm,
      transformOrigin: 'bottom center'
  },
  buttonFilter:{
    color: color.turquoise,
    borderRadius: attr.borderRadius.md,
    marginLeft: 10,
    marginRight: 10
  }
}), {index: 1});

export default volunteerStyles;
