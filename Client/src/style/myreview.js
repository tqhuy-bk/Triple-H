import { makeStyles } from '@material-ui/core';
import color from './color';
import attr from './attr';

const myReviewStyles = makeStyles(
  theme => ({
    listReview:{
        border: `1px solid ${color.darkgray}`,
        padding: 10,
        boxShadow: '0 2px 8px #00000026',
        borderRadius: attr.borderRadius.md,
    },
    title:{
        borderBottom: `1px solid ${color.darkgray}`,
        marginBottom: 5,
    },
    itemWrapper:{
        marginBottom: 5,
        marginLeft: 5,
        height: 150,
        border: "1px solid #0000001f",
        borderRadius: attr.borderRadius.md
    },
    itemImage:{
        cursor: "pointer",
        position: "relative",
        height: "100%",
        overflow:"hidden"
      },
      image:{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        objectFit: "cover",
        objectPosition: "center",
        transition: "opacity 0.35s, transform 0.35s",
         transform: "scale(1.5)",
         "&:hover": {
              opacity: 0.9,
              transform: "scale(1)",
          }
      },
      itemText:{
        left: 0,
        color: "#fff",
        bottom: 0,
        padding: 16,
        zIndex: 2,
        width:"100%",
        position: "absolute",
        fontWeight: 500,
        textShadow:"0px 1px 2px rgb(0 0 0 / 54%)",
        lineHeight: 1.75,
        fontSize: 20,
        backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0) 100%)"
      },

}), {index: 1});

export default myReviewStyles;
