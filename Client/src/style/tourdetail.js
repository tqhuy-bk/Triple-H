import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const tourdetailStyles = makeStyles(
  theme => ({
    coverTitle: {
      textAlign: 'center'
      // paddingTop: 30,
    },
    seeDetail: {
      marginBottom: 20,
      marginInline: 30,
      backgroundColor: color.turquoise,
      borderRadius: attr.borderRadius.md,
      paddingInline: 20
    },
    hiddenSmall: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    cardContainer: {
      marginBlock: 15,
      width: '100%',
      // borderRadius: attr.borderRadius.sm,
      [theme.breakpoints.down('md')]: {
        marginInline: 3
      },
      [theme.breakpoints.down('sm')]: {
        marginInline: 4
      },
      [theme.breakpoints.down('xs')]: {
        marginInline: 1
      }
    },
    serviceContainer: {
      marginTop: 10,
      width: '100%',
      borderRadius: attr.borderRadius.sm
    },
    detailInfo: {
      // marginTop: 30
    },
    imgContainer: {
      padding: 20,
      justifyContent: 'center',
      display: 'flex'
    },
    img: {
      height: '100%',
      width: '100%',
      objectFit: 'cover'
    },
    locationContentContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 10
    },
    reviewBtn: {
      marginRight: 5,
      color: '#63b696',
      borderRadius: 5,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontWeight: 500,
      outline: 'none',
      border: `1px solid ${color.turquoise}`,
      fontSize: 12,
      position: 'relative',
      isolation: 'isolate',
      '&::before': {
        content: "''",
        height: '100%',
        width: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#63b696',
        zIndex: -1,
        transition: 'width 0.25s ease-in',
        color: color.white
      },
      '&:hover::before': {
        width: '100%'
      },
      '&:hover': {
        color: color.white
      }
    },
    locationName: {
      fontSize: 20,
      fontWeight: 500,
      cursor: 'pointer'
    },
    activeTimeline: {
      backgroundColor: '#98aed3',
      color: 'white',
      marginBottom: 5,
      [theme.breakpoints.down('sm')]: {
        marginInline: 20,
        paddingInline: 10
      },
      '&:hover': {
        backgroundColor: '#6f87af'
      }
    },
    unactiveTimeline: {
      color: 'black',
      border: '1px solid #98aed3',
      marginBottom: 5,
      [theme.breakpoints.down('sm')]: {
        marginInline: 20
      }
    },
    timelineTour: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex'
      }
    },
    activeDot: {
      backgroundColor: '#52BEDB !important'
    },
    unactiveDot: {
      color: 'gray'
    },
    addContainerSmall: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20
      }
    },
    addContainerLarge: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    tourHeader: {
      display: 'flex',
      justifyContent: 'right'
    },
    addTour: {
      fontSize: 16,
      textTransform: 'none',
      padding: 5,
      paddingInline: 10,
      backgroundColor: color.turquoise,
      margin: 10,
      borderRadius: attr.borderRadius.md
    },
    likeIcon: {
      color: color.like
    },
    marginIcon: {
      marginLeft: 20
    },
    numLike: {
      marginRight: 30
    },
    review: {
      marginInline: 30
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addDay: {
      color: 'white',
      borderRadius: 5,
      backgroundColor: '#63b191',
      cursor: 'pointer',
      fontWeight: 500,
      outline: 'none',
      border: `1px solid ${color.turquoise}`,
      fontSize: 12,
      marginTop: 10,
      textTransform: 'none',
      marginLeft: 20,
      marginBottom: 10,
      [theme.breakpoints.down('md')]: {
        marginLeft: 10
      },
      '&:hover': {
        backgroundColor: 'white',
        color: 'black'
      }
    },
    addDayCustom: {
      color: 'white',
      borderRadius: 5,
      backgroundColor: '#63b191',
      cursor: 'pointer',
      fontWeight: 500,
      outline: 'none',
      border: `1px solid ${color.turquoise}`,
      fontSize: 12,
      marginTop: 20,
      textTransform: 'none',
      marginLeft: 10,
      marginBottom: 10,
      width: 120,
      marginRight: 5,
      height: 35,
      [theme.breakpoints.down('md')]: {
        marginLeft: 10
      },
      '&:hover': {
        backgroundColor: 'white',
        color: 'black'
      }
    },
    content: {
      marginLeft: 10
    },
    info: {
      marginInline: 100
    },
    itemInfo: {
      marginTop: 10,
      display: 'flex',
      justifyContent: 'center'
    },
    hashtagWrap: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10
    },
    hashtag: {
      display: 'inline',
      marginRight: 5,
      color: color.brightgreek,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    imageLocation: {
      minHeight: 160,
      maxHeight: 160,
      [theme.breakpoints.down('xs')]: {
        display: 'none'
      }
    },
    image: {
      objectFit: 'cover',
      cursor: 'pointer',
      height: '100%',
      borderRadius: attr.borderRadius.md
    },
    tabsMenu: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20
    },
    addHeader: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 10
    },
    mapRight: {
      height: 500,
      margin: 30,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    delete: {
      backgroundColor: color.red,
      '&:hover': {
        backgroundColor: color.darkred
      }
    },
    paperAddService: {
      padding: 5
    },
    headerService: {
      display: 'flex',
      justifyContent: 'right'
    },
    addServiceContent: {
      padding: 20
    },
    addDayWrap: {
      marginLeft: 50,
      [theme.breakpoints.down('md')]: {
        marginLeft: 20
      },
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center'
      }
    },
    editButton: {
      textTransform: 'none',
      backgroundColor: color.turquoise,
      marginInline: 20,
      borderRadius: attr.borderRadius.md,
      paddingInline: 10
    },
    removeButton: {
      textTransform: 'none',
      backgroundColor: color.red,
      marginInline: 20,
      borderRadius: attr.borderRadius.md,
      paddingInline: 10,
      color: color.white,
      '&:hover': {
        color: color.black
      }
    },
    center: {
      display: 'flex',
      justifyContent: 'center'
    },
    feedTour: {
      [theme.breakpoints.down('sm')]: {
        marginTop: 30
      }
    },
    cost: {
      cursor: 'pointer'
    },
    servicePaper: {
      padding: 10,
      width: 400
    },
    serviceList: {
      maxHeight: 500,
      overflow: 'hidden',
      overflowY: 'scroll'
    },
    line: {
      width: '80%'
    },
    fullField: {
      width: '100%',
      marginBlock: 10
    },
    btnWrap: {
      display: 'flex',
      justifyContent: 'center'
    },
    descriptionInput: {
      width: '100%',
      marginBlock: 10,
      backgroundColor: '#ddd',
      padding: 10,
      borderRadius: attr.borderRadius.xs
    },
    imageDetail: {
      [theme.breakpoints.down(1050)]: {
        display: 'none'
      }
    },
    paperDetail: {
      width: 1000,
      [theme.breakpoints.down(1050)]: {
        width: 600
      },
      [theme.breakpoints.down('xs')]: {
        width: 400
      }
    },
    closeBtn: {
      display: 'flex',
      justifyContent: 'right'
    },
    timeline: {
      maxHeight: 400,
      overflowY: 'auto',
      marginBlock: 20,
      marginLeft: 50,
      [theme.breakpoints.down('md')]: {
        marginLeft: 20
      },
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        marginBottom: 15
      }
    },
    timelineItem: {
      marginBlock: 10,
      [theme.breakpoints.down('sm')]: {
        marginBlock: 0
      }
    },
    paperDetailDate: {
      width: '100%'
    },
    detailDateTittle: {
      fontSize: 16,
      fontWeight: 500,
      padding: 5,
      borderBottom: '1px solid #a9a9a9',
      borderRight: '1px solid #a9a9a9',
      backgroundColor: color.background
    },
    reactQuillTour: {
      width: '100%',
      height: 150,
      paddingBottom: 40,
      backgroundColor: 'white'
    },
    tourDateWrapper: {
      padding: 10,
      [theme.breakpoints.down('sm')]: {
        border: '1px solid #a9a9a9'
      }
    },
    locationImages: {
      padding: 10,
      height: 250,
      overflow: 'hidden'
    },

    container: {
      margin: 0,
      paddingTop: 64
    },
    tourDetailContainer: {
      maxWidth: 1280,
      flexGrow: 1,
      padding: 0,
      margin: '0 auto'
    },
    tourInfos: {
      maxWidth: 1280,
      padding: 0,
      flexGrow: 1,
      marginTop: 16,
      marginInline: 16
    },
    tourInfoLeftImage: {
      height: 500,
      width: '100%'
    },
    tourRecommend: {
      margin: '0 0 20px 10px',
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      backgroundColor: color.white,
      maxHeight: 770,
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        margin: '10px 0 0 0'
      }
    },
    tourLeftInfo: {
      marginTop: 10,
      padding: 10,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      backgroundColor: color.white
    },
    tourName: {
      fontWeight: 500,
      fontSize: 25,
      letterSpacing: 1
    },

    tourTime: {
      padding: 8,
      display: 'flex',
      borderBottom: '1px solid #0000001f',
      marginBottom: 20
    },
    timeItem: {
      width: '50%',
      textAlign: 'center'
    },
    timeItemTitle: {
      fontWeight: 500,
      fontSize: 18
    },
    connectLine: {
      position: 'relative',
      '&::before': {
        top: 24,
        left: 'calc(-44%)',
        width: 'calc(100% - 50px)',
        content: "''",
        display: 'inline-block',
        position: 'absolute',
        borderBottom: '3px dotted #e0e0e0'
      }
    },
    iconStart: {
      color: '#63B191',
      border: '1px solid #63B191',
      margin: '4px 0px',
      backgroundColor: color.white,
      borderRadius: '50%',
      padding: 6
    },
    iconEnd: {
      color: '#f44336',
      border: '1px solid #f44336',
      margin: '4px 0px',
      backgroundColor: color.white,
      borderRadius: '50%',
      padding: 6
    },
    timeItemDate: {
      fontWeight: 500,
      fontSize: 16,
      color: '#0000008a'
    },
    timeItemLocation: {
      fontWeight: 400,
      fontSize: 16
    },

    tourDates: {
      padding: 0,
      flexGrow: 1,
      marginTop: 10,
      marginInline: 16
    },
    map: {
      position: 'sticky',
      top: 74,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      margin: '0 0 0 10px',
      overflow: 'hidden'
    },
    datesWrapper: {
      borderRadius: attr.borderRadius.md,
      marginBottom: 50
    },
    username: {
      fontSize: 18,
      fontWeight: 500,
      cursor: 'pointer',
      '&:hover': {
        textDecorationLine: 'underline'
      }
    },
    subheader: {
      fontSize: '13px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px'
      }
    },
    menuIcon: {
      marginRight: 5
    },
    cardInfoUser: {
      margin: '0 0 10px 10px',
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      [theme.breakpoints.down('sm')]: {
        margin: '10px 0 0 0'
      }
    },

    //createTour
    tourInfoGeneral: {
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026',
      marginTop: 16,
      backgroundColor: color.white,
      marginInline: 10,
      width: '100%'
    },
    tourRight: {
      marginTop: 16,
      marginRight: 10,
      [theme.breakpoints.down('sm')]: {
        marginTop: 10,
        marginInline: 10
      }
    },
    createTourDates: {
      padding: 0,
      flexGrow: 1,
      marginTop: 10,
      marginInline: 10,
      marginBottom: 50,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026'
    },
    tourButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: color.white,
      borderTopLeftRadius: attr.borderRadius.md,
      borderTopRightRadius: attr.borderRadius.md,
      padding: 5
    },
    button: {
      position: 'relative',
      isolation: 'isolate',
      backgroundColor: color.turquoise,
      padding: 10,
      paddingInline: 20,
      borderRadius: attr.borderRadius.md,
      [theme.breakpoints.down('sm')]: {
        padding: 5,
        paddingInline: 10,
        marginBlock: 10
      },
      '&::before': {
        content: "''",
        height: '100%',
        width: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#77a694',
        zIndex: -1,
        borderRadius: attr.borderRadius.md,
        transition: 'width 0.25s ease-in'
      },
      '&:hover::before': {
        width: '100%'
      },
      '&:hover': {
        color: color.white
      },
      transition: 'color 0.25s ease-in'
    },
    servicesWrapper: {
      height: 520,
      overflow: 'hidden',
      overflowY: 'auto',
      padding: 10
    },
    servicesWrapperMaxHeight: {
      maxHeight: 520,
      overflow: 'hidden',
      overflowY: 'auto'
    },
    serviceRecommendWrapper: {
      display: 'flex'
    },
    root: {
      maxWidth: 345
    },
    media: {
      height: 160
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: -10,
      padding: 0
    },
    serviceName: {
      cursor: 'pointer'
    },
    infoTourDate: {
      width: '100%'
    },
    buttonChat: {
      marginLeft: 0,
      color: 'white',
      height: 40,
      width: 40,
      backgroundColor: '#63b191'
    },
    generalDate: {
      border: '1px solid #d2d2d2',
      borderRadius: 15,
      backgroundColor: color.background
    },
    detailDate: {
      border: '1px solid #d2d2d2',
      borderRadius: 15,
      marginTop: 10,
      padding: 10,
      backgroundColor: color.background,
      paddingBottom: 16
    },
    listCmt: {
      maxHeight: 300,
      overflow: 'hidden',
      overflowY: 'auto'
    },
    invitation: {
      padding: 0,
      flexGrow: 1,
      marginTop: 10,
      backgroundColor: color.white,
      borderRadius: attr.borderRadius.md,
      boxShadow: '0 2px 8px #00000026'
    },
    costTotalTour: {
      border: '1px solid #c4c4c4',
      padding: 10,
      backgroundColor: color.white,
      marginTop: 10
    }
  }),
  { index: 1 }
);

export default tourdetailStyles;
