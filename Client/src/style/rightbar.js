import { makeStyles } from '@material-ui/core';

const rightbarStyles = makeStyles(
  theme => ({
    container: {
      color: 'white',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing(10),
      position: 'sticky',
      paddingBottom: theme.spacing(4),
      marginRight: 15,
      top: 0,
      alignItems: 'center'
    }
  }),
  { index: 1 }
);

export default rightbarStyles;
