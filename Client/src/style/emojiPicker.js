import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const emoijPickerStyles = makeStyles(
  theme => ({
    iconWrap: {
      padding: '5px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      width: '266px',
      height: '270px',
      borderRadius: attr.borderRadius.sm,
      transformOrigin: 'bottom center'
    },
    iconItem: {
      fontSize: '1.5em',
      textTransform: 'uppercase',
      padding: '5px',
      paddingInline: '7px',
      cursor: 'pointer',
      borderRadius: attr.borderRadius.sm,
      '&:hover': {
        backgroundColor: color.lightgray
      }
    }
  }),
  { index: 1 }
);

export default emoijPickerStyles;
