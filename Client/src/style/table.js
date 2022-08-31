import { makeStyles } from '@material-ui/core';

const tableStyles = makeStyles(
  theme => ({
    container: {
      marginTop: 120,
      marginBottom: 30
    },
    paper: {
      display: 'flex',
      justifyContent: 'center'
    },
    admin_location_header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: '20px',
      paddingRight: '20px',
      marginBottom: 20
    },
    addBtn: {
      backgroundColor: '#179250',
      borderRadius: '10px',
      textTransform: 'none'
    },
    appBarSpacer: {
      marginTop: 140
    },
    cardInfo: {
      margin: 20,
      padding: 20,
      borderRadius: 10,
      width: '300px',
    },
    cardValue: {
      marginTop: 10
    },
    cardIcon: {
      fontSize: "37px",
      marginRight: 30,
    },
    containerReport: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cardPost: {
      width: "600px",
      margin: 20,
      padding: 20,
      borderRadius: 10,
      backgroundColor: "#a5dec8"
    },
    cardReport: {
      margin: 20,
      padding: 20,
      borderRadius: 10,
      width: "400px",
      backgroundColor: "#a5dec8",
      height: '300px'
    },
    textReport: {
      margin: 10,
    },
    btnReport: {
      justifyItems: "center",
      justifyContent: "space-between",
      display: 'flex',
      marginTop: 50,
      marginLeft: 50,
      marginRight: 50,
    },
    formSearch: {
      justifyItems: "center",
      justifyContent: "space-between",
      display: "flex",
      margin: 50,
    },
    autocompleteProvince: {
      width: '200%',
      marginRight: 5
    },
    sreachBtn: {
      backgroundColor: '#179250',
      borderRadius: '10px',
      textTransform: 'none'
    }
  }),
  { index: 1 }
);

export default tableStyles;
