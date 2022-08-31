import React from "react";
import {
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    // Collapse
} from "@material-ui/core";
import { Link } from "react-router-dom";
// import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

import { leftbarStyles } from "../../style";
import color from "../../style/color";

export default function Menu(props) {

    const location = useLocation();
    const classes = leftbarStyles();
    const isActive = (path) => {
        // if (path === "/" && location.pathname === "/home") return true;
        // return path === location.pathname;
        if (props.menuList.prefix === "" || props.menuList.prefix === "admin") {
            return location.pathname === path;
        }
        else {
            const tmp = location.pathname.split("/");
            if (tmp.length === 3 && path === "/") return true;
            return "/" + tmp[tmp.length - 1] === path;
        }
    }

    const renderLink = (link) => {
        if (props.menuList.prefix === "" || props.menuList.prefix === "admin")
            return link;
        const tmp = location.pathname.split("/");
        if (tmp.length === 3) {
            return "../" + tmp[1] + "/" + tmp[2] + link;
        }
        return "../" + tmp[2] + link;
    }

    const menuList = props.menuList;
    // const hasMoreBtn = menuList.menu.length > 4 ? true : false;

    return (

        <List className={classes.panel}>
            {menuList.menu.map((item, index) => (
                <Link className={classes.itemLink} to={renderLink(item.link)} key={index}>
                    <ListItem
                        button
                        className={classes.item}
                        style={{
                            backgroundColor: isActive(item.link) ? color.turquoise : 'inherit',
                        }}
                        title={item.name}
                    >
                        <ListItemIcon>
                            {<item.icon className={classes.icon} 
                                style={{
                                   color: isActive(item.link) ? color.white : color.black,
                                }}
                            />}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.name}
                            classes={{ primary: classes.text }}
                            style={{
                                color: isActive(item.link) ? color.white : color.black,
                             }}
                        />
                    </ListItem>
                </Link>
            ))}

        </List>
    )
}