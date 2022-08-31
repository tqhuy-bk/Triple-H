import { makeStyles } from '@material-ui/core';

const sliderStyles = makeStyles(
  theme => ({
    container: {
      maxWidth: '100%',
      width: '100%',
      flexGrow: 1
    },
    img: {
      height: 570,
      display: 'flex',
      textAlign: 'center',
      maxWidth: '100%',
      overflow: 'hidden',
      width: '100%',
      justifyContent: 'space-between',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: "50%",
      // background: "linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.6))",
      [theme.breakpoints.down('md')]: {
        height: 400
      },
      [theme.breakpoints.down('sm')]: {
        height: 300
      }
    },
    textCover: {
      paddingTop: 180,
      [theme.breakpoints.down('md')]: {
        paddingTop: 130
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: 70
      }
    },
    button: {
      marginTop: 220,
      height: 50,
      width: 50,
      [theme.breakpoints.down('md')]: {
        marginTop: 150
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 110
      }
    },
    icon: {
      fontSize: 40
    },
    description: {
      fontSize: 16,
      fontStyle: 'italic'
    },
    title: {
      [theme.breakpoints.down('md')]: {
        fontSize: 40
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 30
      }
    },
    subtitle: {
      [theme.breakpoints.down('md')]: {
        fontSize: 36
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 24
      }
    }
  }),
  { index: 1 }
);

export default sliderStyles;
