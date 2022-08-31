import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const authStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        backgroundImage: 'url("/login-1.jpeg")',
        height: '100vh'
      }
    },
    imageContainer: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    imageCover: {
      width: '100%',
      height: '100vh',
      backgroundImage: 'url("/login-1.jpeg")'
    },
    formLogin: {
      marginTop: 80
    },
    buttonActiveLogin: {
      color: color.white,
      // borderRight: '0.3px solid rgb(53, 189, 155)',
      backgroundColor: 'rgb(53, 189, 155)',
      borderRadius: '20px 0 0 20px'
    },
    buttonUnActiveRegister: {
      color: color.text,
      // backgroundColor: 'rgb(53, 189, 155)',
      borderRadius: '0 20px 20px 0'
    },
    buttonActiveRegister: {
      color: color.white,
      // borderRight: '0.3px solid rgb(53, 189, 155)',
      backgroundColor: 'rgb(53, 189, 155)',
      borderRadius: '0 20px 20px 0'
    },
    buttonUnActiveLogin: {
      color: color.text,
      // backgroundColor: 'rgb(53, 189, 155)',
      borderRadius: '20px 0 0 20px'
    },
    buttonSwitch: {
      display: 'flex',
      // border: '0.3px solid rgb(53, 189, 155)',
      // width: "35%",
      alignItems: 'center',
      // height: "40px",
      borderRadius: '20px',
      marginBottom: '40px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center'
    },
    formInput: {
        margin: 5,
        marginInline: "60px",
        backgroundColor: color.white,
        borderRadius: 5,
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            marginInline: "30px"
        }
    },
    loginGroup: {
        display: 'flex',
        justifyContent: 'center'
    },
    loginButton: {
      paddingInline: '30px',
      paddingBlock: '10px',
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.success
    },
    error: {
      fontSize: '15px',
      color: color.red,
      marginInline: '20px',
      marginTop: '10px'
    },
    forgotPassword: {
      opacity: 0.5,
      textDecoration: 'underline',
      cursor: 'pointer'
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    form: {
      textAlign: 'center'
    },
    registerText: {
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    forgot_wrap: {
      width: 400,
      height: 250,
      outline: 'none',
      overflow: 'hidden',
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.white,
      padding: '0px 20px'
    },
    forgot_heading: {
      display: 'flex',
      alignItems: 'center',
      padding: 8,
      justifyContent: 'space-between',
      borderBottom: '1px solid #f1f1f1'
    },
    forgot_heading_text: {
      margin: 0,
      fontSize: 20,
      fontWeight: 800,
      color: '#0f1419'
    },
    forgot_form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: 10
    },
    formInputEmail: {
      width: '100%',
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.white,
      marginBottom: 20,
      marginTop: 10
    },
    forgotButton: {
      margin: '0 auto',
      width: 200,
      borderRadius: attr.borderRadius.md,
      backgroundColor: color.success
    }
  }),
  { index: 1 }
);

export default authStyles;
