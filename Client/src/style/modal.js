import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const modalStyles = makeStyles(
  {
    container: {
      height: '80%',
      width: '80%',
      margin: 'auto',
      marginTop: 50,
      padding: 20
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    boxScroll: {
      overflow: 'hidden',
      overflowY: 'scroll'
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    contentCovid: {
      width: '70%',
      margin: 'auto',
      marginBottom: 40
    },
    tableContainer: {
      width: '70%',
      margin: 'auto',
      marginBottom: 40
    },
    weatherContainer: {
      margin: 30,
      marginTop: 50,
      borderRadius: 10,
      padding: 15
    },
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px 30px 30px 30px',
      background:
        'linear-gradient(45deg, rgb(49 137 90 / 80%) 0%, rgb(8 113 126 / 80%) 100%)',
      color: 'white',
      minWidth: 500
    },
    loginFormText: {
      margin: 20,
      color: 'white'
    },
    loginFormButton: {
      width: '90%',
      height: '50px',
      marginLeft: 20,
      backgroundColor: 'white',
      color: 'black'
    },
    loginHeader: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between'
    },
    loginHeaderIcon: {
      color: 'white'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%'
    },
    loginTitle: {
      display: 'flex',
      alignSelf: 'center',
      marginLeft: '25%'
    },
    centerMarginTop: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 30
    },
    link: {
      textDecorationLine: 'underline',
      color: 'white'
    },
    title: {
      fontSize: 20
    },
    paperHelp: {
      width: 700,
      padding: 10,
      height: '70vh',
      overflowY: 'auto'
    },
    modal_header: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    explainText: {
      textAlign: 'center'
    },
    form: {
      padding: 20
    },
    formItem: {
      marginBlock: 20
    },
    input: {
      backgroundColor: color.lightgray,
      width: '100%',
      padding: 10,
      borderRadius: attr.borderRadius.md
    },
    autocomplete: {
      width: '100% !important'
    },
    button: {
      display: 'flex',
      justifyContent: 'right'
    }
  },
  { index: 1 }
);

export default modalStyles;
