import { makeStyles } from '@material-ui/core';
import attr from './attr';
// import attr from "./attr";
import color from './color';

const calendarStyles = makeStyles(
  theme => ({
    container: {
      backgroundColor: 'white',
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 20
    },
    paperModal: {
      width: 500,
      backgroundColor: color.white,
      borderRadius: 5,
      padding: 30,
      margin: 'auto'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 30
    },
    button: {
      padding: 10,
      paddingInline: 30,
      backgroundColor: color.turquoise
    },
    modal: {
      display: 'flex',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    tableCard: {
      padding: 2,
      borderRadius: 15
    },
    amlich: {
      borderCollapse: 'collapse',
      fontSize: '16px',
      borderRadius: attr.borderRadius.md,
      tableLayout: 'fixed',
      backgroundColor: color.turquoise,
      padding: 5
    },
    colWidth: {
      width: '47px',
      [theme.breakpoints.down(1600)]: {
        width: '40px'
      }
    },
    ngaythang: {
      cursor: 'pointer',
      borderRadius: '50%',
      padding: '8px',
      margin: 2,
      '&:hover': {
        backgroundColor: color.lightgray
      }
    },
    ngaytuan: {
      textAlign: 'center',
      color: color.text,
      backgroundColor: color.gray,
      padding: '3px',
      width: '14.286%',
      fontSize: '14px',
      fontWeight: 'bold',
      [theme.breakpoints.down(1600)]: {
        fontSize: '12px'
      }
    },
    t2t6: {
      textAlign: 'left',
      color: color.text,
      fontWeight: 'bold',
      fontSize: '16px',
      [theme.breakpoints.down(1600)]: {
        fontSize: '12px'
      }
    },
    t7: {
      fontWeight: 'bold',
      textAlign: 'left',
      color: color.blue,
      fontSize: '16px',
      [theme.breakpoints.down(1600)]: {
        fontSize: '12px'
      }
    },
    cn: {
      fontWeight: 'bold',
      textAlign: 'left',
      color: color.red,
      fontSize: '16px',
      [theme.breakpoints.down(1600)]: {
        fontSize: '12px'
      }
    },
    am: {
      textAlign: 'right',
      fontSize: '12px',
      color: color.text,
      [theme.breakpoints.down(1600)]: {
        fontSize: '10px'
      }
    },
    am2: {
      textAlign: 'right',
      fontSize: '12px',
      color: color.primary,
      fontWeight: 'bold',
      [theme.breakpoints.down(1600)]: {
        fontSize: '10px'
      }
    },
    today: {
      backgroundColor: color.silver,
      color: color.text,
      borderRadius: '50%',
      // border: '1px solid #000',
      padding: '8px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: color.lightgray
      }
    },
    leam: {
      backgroundColor: color.cloud,
      borderRadius: '50%',
      padding: '8px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: color.lightgray
      }
    },
    leduong: {
      backgroundColor: color.cloud,
      borderRadius: '50%',
      padding: '8px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: color.lightgray
      }
    },
    tet: {
      backgroundColor: color.turquoise,
      borderRadius: '50%',
      padding: '8px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: color.lightgray
      }
    },
    buttonControl: {
      cursor: 'pointer',
      padding: '10px',
      color: color.text,
      '&:hover': {
        color: color.darkgray
      },
      [theme.breakpoints.down('md')]: {
        padding: '5px'
      }
    },
    tenthang: {
      textAlign: 'center',
      padding: '6px',
      // backgroundColor: '#1e8cbe',
      color: color.text,
      fontSize: '120%',
      [theme.breakpoints.down(1600)]: {
        fontSize: '100%'
      }
    },
    navi: {
      textAlign: 'center',
      padding: '5px',
      // backgroundColor: '#1e8cbe',
      color: color.white,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        padding: '0px'
      }
    }
  }),
  { index: 1 }
);

export default calendarStyles;
