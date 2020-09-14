import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import InfoIcon from "@material-ui/icons/Info";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { logoutUser } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  leftNavMenu: {
    width: "45%",
    textAlign: "right",
  },
  avatar: {
    display: "inline-flex",
    margin: 7,
  },
  username: {
    display: "inline-block",
  },
  links: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="TravelsUp" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {[
          isAuthenticated
            ? { title: "Profile", path: "/me", icon: <AccountBoxIcon /> }
            : null,
          isAuthenticated
            ? {
                title: "My Bookings",
                path: "/bookings",
                icon: <FeaturedPlayListIcon />,
              }
            : null,
          { title: "Contact Us", path: "/", icon: <ContactPhoneIcon /> },
          { title: "About Us", path: "/", icon: <InfoIcon /> },
        ]
          .filter((e) => e !== null)
          .map((link) => (
            <ListItem button key={link.title}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <Link to={link.path} className={classes.links}>
                <ListItemText primary={link.title} />
              </Link>
            </ListItem>
          ))}
        {isAuthenticated ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : null}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            Travels Up
          </Typography>
          <div className={classes.leftNavMenu}>
            {isAuthenticated ? (
              <Hidden>
                <Avatar
                  className={classes.avatar}
                  alt={user.names}
                  src="/static/images/avatar/1.jpg"
                />
                <Hidden xsDown>
                  <h4 className={classes.username}>{user.names}</h4>
                </Hidden>
              </Hidden>
            ) : (
              <>
                <Link to="/signup" style={{ padding: 10 }}>
                  <Button variant="contained" color="primary">
                    Signup
                  </Button>
                </Link>
                <Link to="/login" style={{ padding: 10 }}>
                  <Button variant="contained" color="primary">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
