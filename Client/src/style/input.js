import { makeStyles } from '@material-ui/core';
import attr from './attr';

const inputStyles = makeStyles(
  theme => ({
    writeCmtWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    writeCmtAvatar: {
      width: 40,
      height: 40,
      marginBottom: 15,
      marginLeft: 15
    },
    writeCmtAvatarIcon: {
      zIndex: 2,
      marginLeft: -18,
      marginBottom: -8,
      fontSize: 20,
      color: '#78a493'
    },
    writeCmt: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#ededed',
      margin: '0 15px 15px 10px',
      borderRadius: attr.borderRadius.lg,
      maxWidth: '100%',
      flexGrow: 1
    },
    writeCmtText: {
      paddingInline: 15,
      width: '100%'
    },
    addImageContainer: {
      display: 'flex',
      overflow: 'auto'
    },
    item: {
      margin: 20
    },
    addArea: {
      // width: 250,
      width: '100%',
      height: 200,
      margin: 20,
      border: '1px dashed #000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius: 5
    },
    addAreaHover: {
      // width: 250,
      width: '100%',
      height: 200,
      margin: 20,
      border: '2px dashed #555',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    },
    addAreaHoverTour:{
      width: '100%',
      height: 200,
      border: '2px dashed #555',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    },
    addAreaTour:{
      width: '100%',
      height: 200,
      border: '1px dashed #000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius: 5
    },
    imageItem: {
      position: 'relative'
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
}), {index: 1});

export default inputStyles;
