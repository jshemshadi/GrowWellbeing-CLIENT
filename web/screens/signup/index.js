import React from "react";
import { useState } from "react";
import {
  Badge,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import useStyles from "./style";
import CustomizedSnackbars from "../../components/main/Snakbar";
import i18n, { t } from "../../i18n";

export default function Signup(props) {
  localStorage.clear();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });

  const [accountType, setAccountType] = useState("school");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);
  const hendleSignup = async () => {
    setLoading(true);
    const result = await utils.post("/api/users/signup", {
      accountType,
      firstName,
      lastName,
      mobile,
      email,
      username,
      password,
    });
    setLoading(false);
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        localStorage.setItem("email", email);
        props.history.push("/verifyAccount");
      } else {
        setMessage({ text: error, type: "error" });
        setOpenSnackbar(true);
      }
    } else {
      setMessage({ text: t("someThingWrong"), type: "error" });
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid container direction="row" className={classes.root}>
      {loading && <LinearProgress className={classes.customLoading} />}
      {openSnakbar && (
        <CustomizedSnackbars
          message={message}
          open={openSnakbar}
          onClose={() => setOpenSnackbar(false)}
        />
      )}
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={classes.signup_bk}
        style={{ height: isSm ? "70%" : "auto" }}
      ></Grid>
      <Grid
        item
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        style={{ margin: "50px 0" }}
      >
        <div className={classes.signup_form}>
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bolder", fontSize: "22px" }}
          >
            {t("signup_title")}
          </Typography>
          <hr
            style={{
              width: "255px",
              border: 0,
              borderTop: "1px solid #eee",
            }}
          />
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bold" }}
          >
            {t("signup_chooseAccountType")}
          </Typography>
          &nbsp;
          <div
            style={{
              display: "flex",
            }}
          >
            <Badge
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              invisible={accountType !== "gp"}
              badgeContent=" "
            >
              <div
                className={
                  accountType === "gp"
                    ? classes.signup_form_account_active
                    : classes.signup_form_account_deactive
                }
                onClick={() => {
                  setAccountType("gp");
                }}
                style={{
                  backgroundImage: `url(${"../../sources/Pic/GP.png"})`,
                  bottom: 0,
                }}
              >
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 5,
                    left: "42%",
                  }}
                >
                  {t("signup_accountType_gp")}
                </Typography>
              </div>
            </Badge>

            <Badge
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              invisible={accountType !== "school"}
              badgeContent=" "
            >
              <div
                className={
                  accountType === "school"
                    ? classes.signup_form_account_active
                    : classes.signup_form_account_deactive
                }
                onClick={() => {
                  setAccountType("school");
                }}
                style={{
                  backgroundImage: `url(${"../../sources/Pic/School.png"})`,
                  margin: "0 0 0 20px",
                }}
              >
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bold",
                    position: "absolute",
                    bottom: 5,
                    left: "30%",
                  }}
                >
                  {t("signup_accountType_school")}
                </Typography>
              </div>
            </Badge>
          </div>
          &nbsp;
          <Typography align="center" className={classes.signup_text}>
            {t("signup_message_hello")}
          </Typography>
          <Typography align="center" className={classes.signup_text}>
            {t("signup_message_fill")}
          </Typography>
          &nbsp;
          <FormControl className={classes.signup_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-firstName">
              {t("signup_firstNameHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstName"
              type={"text"}
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBoxOutlinedIcon className={classes.signup_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.signup_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lastName">
              {t("signup_lastNameHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastName"
              type={"text"}
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBoxOutlinedIcon className={classes.signup_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.signup_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">
              {t("signup_emailHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type={"text"}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlinedIcon className={classes.signup_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.signup_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-mobile">
              {t("signup_mobileHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-mobile"
              type={"text"}
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIphoneOutlinedIcon className={classes.signup_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.signup_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">
              {t("signup_usernameHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type={"text"}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <PermIdentityIcon className={classes.signup_text} />
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.signup_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {t("signup_passwordHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon className={classes.signup_text} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={classes.signup_input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-repeatPassword">
              {t("signup_repeatPasswordHelper")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-repeatPassword"
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(event) => {
                setRepeatPassword(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon className={classes.signup_text} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle repeat password visibility"
                    onClick={() => {
                      setShowRepeatPassword(!showRepeatPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={terms}
                onChange={() => {
                  setTerms(!terms);
                }}
                name="terms"
                color="primary"
              />
            }
            label={
              <>
                {t("signup_agreeTerms")}
                <Link
                  href="terms"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    margin: "0 0 0 5px",
                  }}
                >
                  {t("signup_terms")}
                </Link>
              </>
            }
          />
          &nbsp;
          <div
            className={classes.signup_input}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                disabled={
                  loading ||
                  !firstName.length ||
                  !lastName.length ||
                  !email.length ||
                  !mobile.length ||
                  !username.length ||
                  !password.length ||
                  !repeatPassword.length ||
                  !terms ||
                  password !== repeatPassword
                }
                variant="contained"
                color="primary"
                style={{ width: "130px", color: "#FAFAFA" }}
                onClick={hendleSignup}
              >
                {t("signup_signupBtn")}
              </Button>
            </div>
            <div style={{ display: "flex" }}>
              <Link
                href="login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                }}
              >
                {t("signup_signin")}
                <ArrowRightAltOutlinedIcon style={{ margin: "0 0 0 5px" }} />
              </Link>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
