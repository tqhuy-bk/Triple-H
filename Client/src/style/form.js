import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const formStyles = makeStyles(
  theme => ({
    addLocationContainer: {
      // borderRadius: attr.borderRadius.md,
      // padding: 20,
      // margin: 20,
      width: '100%'
    },
    paperContainer: {
      padding: 16,
      width: 550,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: attr.borderRadius.md,
      [theme.breakpoints.down('sm')]: {
        padding: 10,
        width: 400
      }
    },
    paperUpdateInfoContainer: {
      paddingTop: 16,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: "15px 0px 0px 15px",
      borderRight: "3px solid #e3ebe8",
      [theme.breakpoints.down('sm')]: {
        paddingTop: 10,
      },
      [theme.breakpoints.down('xs')]: {
        borderRight: "none",
        borderBottom: "3px solid #e3ebe8",
        borderRadius: "15px 15px 0px 0px",
      }
    },
    formContainer: {
      padding: 30
    },
    formContainerTour:{
      padding: 30, 
      [theme.breakpoints.down('sm')]: {
        padding: 16
      }
    },
    textTitle: {
      display: 'flex',
      justifyContent: 'center'
    },
    formAction: {
      display: 'flex',
      justifyContent: 'space-between'
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
    user: {
      width: '100%',
      marginBottom: 15,
      border: `1px solid ${color.background}`,
      borderRadius: attr.borderRadius.sm,
      padding: '5px 10px 5px 10px'
    },
    hashtag: {
      width: '100%',
      marginBottom: 15
    },
    postContentInput: {
      width: '100%'
      // [theme.breakpoints.down("sm")]: {
      //     width: "300px"
      // }
    },
    input: {
      backgroundColor: color.lightgray,
      width: '100%',
      padding: 15,
      borderRadius: attr.borderRadius.md,
      marginBottom: 20
    },
    formCreateReview: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 20
    },
    addLocationForm: {
      textAlign: 'center',
      padding: 10
    },
    addFormContainer: {
      paddingBottom: 30
    },
    addLocationSubmit: {
      margin: 20,
      paddingInline: 30,
      backgroundColor: color.turquoise
    },
    datepicker: {
      display: 'flex',
      justifyContent: 'center',
      // marginInline: 50,
      marginBottom: 30
    },
    tourNameInput: {
      width: '100%',
      marginBottom: 16
    },
    costTotalTour:{
      border: "1px solid #c4c4c4",
      marginBottom: 16,
      padding: 10
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    autocomplete: {
      width: '100%',
      marginTop: 10
    },
    autocompleteProvince: {
      width: '100%',
      marginRight: 5
    },
    imageInputContainer: {
      // marginInline: "20px",
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
      }
    },
    imageInput: {
      width: '150px',
      height: '150px',
      margin: '5px',
      position: 'relative',
      cursor: 'pointer',
      transition: '0.5s',
      '&:hover': {
        filter: 'brightness(80%)'
      },
      [theme.breakpoints.down('sm')]: {
        width: '100px',
        height: '100px'
      }
    },
    nameTourInput: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    error: {
      display: 'flex',
      justifyContent: 'center',
      color: 'red',
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    bodyChangeImage: {
      padding: 10,
      position: 'relative'
    },
    imageChange: {
      height: '350px',
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        height: '200px'
      }
    },
    borderDash: {
      border: '2px dashed #000',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      height: 400,
      width: 400
    },
    borderDashHover: {
      border: '3px dashed #aaa',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      height: 400,
      width: 400
    },
    buttonWrap: {
      margin: 20,
      display: 'flex',
      justifyContent: 'right'
    },
    changeContainer: {
      position: 'relative'
    },
    removeButton: {
      right: '-10px',
      top: '-10px',
      position: 'absolute'
    },
    uploadWrap: {
      // alignContent: 'center'
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    imageChangeContent: {
      display: 'block'
    },
    removeImageChange: {
      color: color.white,
      backgroundColor: color.red,
      '&:hover': {
        backgroundColor: color.darkred
      }
    },
    description: {
      margin: 10
    },
    serviceCard: {
      marginBlock: 20,
      paddingBlock: 10,
      paddingInline: 20,
      marginInline: 30,
      width: 370,
      [theme.breakpoints.down('md')]: {
        marginInline: 0,
        width: 300
      }
    },
    sizeImageBg: {
      width: '500px',
      height: '250px'
    },

    modal_header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #f1f1f1'
    },
    modal_header_closeIcon: {
      color: color.gray,
      fontSize: '20px',
      width: '25px',
      height: '25px'
    },
    create: {
      marginTop: 20,
      marginBottom: 20,
      background: '#fff',
      borderRadius: attr.borderRadius.md,
      boxShadow: 'none'
    },
    createWrapper: {
      borderRadius: attr.borderRadius.md
    },
    compose: {
      padding: '16px 10px 16px 0px',
      borderBottom: '1px solid #e8e8e8',
      height: 100
    },
    composeTour: {
      padding: '16px 10px 16px 0px',
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
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    composeIcon: {
      height: 20,
      width: 20,
      transition: 'all 0.3s',
      marginRight: 5
    },
    createText: {
      marginLeft: 15,
      width: '100%'
    },
    sizeAvatarInfo: {
      height: 300
    },
    sizeBgInfo: {
      height: 300
    },
    fullfieldInput: {
      width: '100%',
      marginBlock: 10
    },
    fieldInput: {
      marginBlock: 10
    },
    infoWrapper:{
      marginTop: 70, 
      backgroundColor: "white",
      border: `1px solid ${color.darkgray}`, 
      padding: 20,
      boxShadow: '0 2px 8px #00000026'
    },
    addDay: {
      color: 'white',
      borderRadius: 5,
      backgroundColor: "#63b191",
      cursor: 'pointer',
      fontWeight: 500,
      outline: 'none',
      border: `1px solid ${color.turquoise}`,
      fontSize: 12,
      marginTop: 10,
      textTransform: 'none',
      marginLeft: 20,
      marginBottom: 10,
      [theme.breakpoints.down('md')]: {
        marginLeft: 10
      },
      '&:hover': {
        backgroundColor: "white",
        color: 'black',
      }
    },
    addServiceContribute:{
      width: 1000,
      [theme.breakpoints.down('sm')]: {
        width: 700,
        marginTop: 70
      },
      [theme.breakpoints.down('xs')]: {
        width: 500,
        marginTop: 70
      },
    },
    addLocationContribute:{
      width: 1000,
      [theme.breakpoints.down('sm')]: {
        width: 700,
      },
      [theme.breakpoints.down('xs')]: {
        width: 500,
      },
    }
  }),
  //invite tour:
  
  { index: 1 }
);

export default formStyles;
