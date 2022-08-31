import { makeStyles } from '@material-ui/core';
import color from './color';

const searchStyles = makeStyles(
  theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      maxWidth: '100%',
      marginBottom: 20
    },
    appBarSpacer: theme.mixins.toolbar,
    tab: {
      maxWidth: '100%',
      marginTop: 30
    },
    active: {
      backgroundColor: color.turquoise
    },
    listSearch: {
      margin: 20,
      padding: 20
    },
    itemSearch: {
      backgroundColor: color.lightgray,
      borderRadius: 10,
      marginBottom: 30,
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 50
    },
    query: {
      marginLeft: 20
    },
    avatarItem: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginRight: 20
    }
  }),
  { index: 1 }
);

export default searchStyles;
