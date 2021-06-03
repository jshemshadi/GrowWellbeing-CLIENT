import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import i18n, { t } from "../../i18n";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// import useStyles from "./style";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  termsHeader: {
    backgroundColor: theme.palette.primary.main,
    height: 140,
    color: "#FAFAFA",
  },
}));

export default function Terms(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Grid container justify={"space-around"} className={classes.termsHeader}>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          alignItems="center"
          justify="center"
          style={{
            fontWeight: "bolder",
            fontSize: "24px",
            display: "flex",
          }}
        >
          T E R M S
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          alignItems="center"
          justify="center"
          style={{
            fontWeight: "bolder",
            fontSize: "24px",
            display: "flex",
          }}
        >
          <Button
            variant="outlined"
            style={{
              color: "#FAFAFA",
              borderColor: "#FAFAFA",
              width: "100px",
              margin: "0 10px 0 0",
            }}
            onClick={() => {
              props.history.push("/login");
            }}
          >
            {t("terms_login")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              color: "#FAFAFA",
              width: "100px",
              margin: "0 0 0 10px",
            }}
            onClick={() => {
              props.history.push("/signup");
            }}
          >
            {t("terms_signup")}
          </Button>
        </Grid>
      </Grid>
      <Container style={{ marginTop: "15px", textAlign: "justify" }}>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label={t("terms_tab_gp")} {...a11yProps(0)} />
              <Tab label={t("terms_tab_school")} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {t("terms_gp")}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {t("terms_school")}
            </TabPanel>
          </SwipeableViews>
        </div>
      </Container>
    </>
  );
}
