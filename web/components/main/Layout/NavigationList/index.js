import React from "react";
import { connect } from "react-redux";
import {
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
} from "@material-ui/core";

import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import i18n, { t } from "../../../../i18n";
import style from "./style";
import { NavLink, useLocation } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = style;

export default function NavigationList(props) {
  const classes = useStyles();
  let location = useLocation();
  const userRole = localStorage.getItem("role");

  const lang = localStorage.getItem("lang");
  i18n.changeLanguage(lang ? lang : "fa");

  return (
    <List className={classes.all_text}>
      <div
        className={location.pathname === "/dashboard" ? classes.active : null}
      >
        <NavLink to="/dashboard" exact activeClassName={classes.active}>
          <ListItem button className={classes.item}>
            <Tooltip title={t("drawer_dashboard")}>
              <ListItemIcon className={classes.drawer_icons}>
                <DashboardOutlinedIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={t("drawer_dashboard")} />
          </ListItem>
        </NavLink>
      </div>

      <Divider />
      {userRole === "school" ? (
        <div
          className={
            location.pathname === "/dashboard/appointments" ||
            location.pathname.indexOf("/dashboard/appointments/") === 0
              ? classes.active
              : null
          }
        >
          <NavLink
            to="/dashboard/appointments"
            exact
            activeClassName={classes.active}
          >
            <ListItem button className={classes.item}>
              <Tooltip title={t("drawer_appointment")}>
                <ListItemIcon className={classes.drawer_icons}>
                  <MeetingRoomIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={t("drawer_appointment")} />
            </ListItem>
          </NavLink>
        </div>
      ) : (
        <div
          className={
            location.pathname === "/dashboard/GPappointments" ||
            location.pathname.indexOf("/dashboard/GPappointments/") === 0
              ? classes.active
              : null
          }
        >
          <NavLink
            to="/dashboard/GPappointments"
            exact
            activeClassName={classes.active}
          >
            <ListItem button className={classes.item}>
              <Tooltip title={t("drawer_gpappointment")}>
                <ListItemIcon className={classes.drawer_icons}>
                  <MeetingRoomIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={t("drawer_gpappointment")} />
            </ListItem>
          </NavLink>
        </div>
      )}

      <Divider />

      <NavLink to="/" exact activeClassName={classes.active}>
        <ListItem
          button
          className={classes.item}
          onClick={async () => {
            localStorage.clear();
            props.history.push("/");
          }}
        >
          <Tooltip title={t("drawer_signout")}>
            <ListItemIcon className={classes.drawer_icons}>
              <ExitToAppIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary={t("drawer_signout")} />
        </ListItem>
      </NavLink>
    </List>
  );
}
