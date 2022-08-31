import { makeStyles } from '@material-ui/core';

const speedDialStyles = makeStyles(
  theme => ({
    speedDialWrapper: {
      zIndex: 2,
      position: 'fixed',
      bottom: '8vh',
      right: '0%'
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2)
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2)
      }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}), {index: 1});

export default speedDialStyles;
