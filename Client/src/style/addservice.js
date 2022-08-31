import { makeStyles } from '@material-ui/core';
import color from './color';

const addServiceStyles = makeStyles(
  {
    root: {
      marginTop: 80,
      justifyContent: 'center',
      backgroundColor: color.white,
      paddingBottom: 30
    },
    formContainer: {
      marginBlock: 30,
      marginInline: 50
    },
    fullField: {
      width: '100%',
      marginBlock: 10
    },
    halfFeild: {
      width: '50%',
      marginBlock: 10
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: 50
    },
    itemContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBlock: 10,
      marginRight: 10,
      paddingInline: 10,
      paddingBlock: 5,
      borderRadius: 3,
      backgroundColor: color.background
    },
    formAdd: {
      width: '100%',
      marginBlock: 5,
      paddingBottom: 10
    }
  },
  { index: 1 }
);

export default addServiceStyles;
