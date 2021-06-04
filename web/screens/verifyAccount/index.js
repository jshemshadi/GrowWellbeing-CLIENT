import React from "react";
import { useState } from "react";
import {
  Button,
  Grid,
  LinearProgress,
  Typography,
  Link,
} from "@material-ui/core";
import ReactCodeInput from "react-verification-code-input";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import useStyles from "./style";
import CustomizedSnackbars from "../../components/main/Snakbar";
import i18n, { t } from "../../i18n";

export default function VerifyAccount(props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ isSm });

  const email = localStorage.getItem("email");
  if (!email) {
    props.history.push("/signup");
  }

  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [openSnakbar, setOpenSnackbar] = useState(false);
  const hendleVerifyAccount = async () => {
    if (verificationCode.length === 4) {
      setLoading(true);
      const result = await utils.post("/api/users/verifyAccount", {
        email,
        verificationCode,
      });
      setLoading(false);
      if (result && result && result.data) {
        const { isSuccess, data, msg, error, unauthorized } = result.data;
        if (isSuccess) {
          const { username, firstName, lastName, mobile, guid, token } = data;
          localStorage.setItem("username", username);
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("mobile", mobile);
          localStorage.setItem("guid", guid);
          localStorage.setItem("token", token);
          props.history.push("/dashboard");
        } else {
          setMessage({ text: error, type: "error" });
          setOpenSnackbar(true);
        }
      } else {
        setMessage({ text: t("someThingWrong"), type: "error" });
        setOpenSnackbar(true);
      }
    }
  };

  const handleResend = async () => {
    setLoading(true);
    const result = await utils.post(
      "/api/users/resendAccountVerificationCode",
      { email }
    );
    setLoading(false);
    if (result && result && result.data) {
      const { isSuccess, data, msg, error, unauthorized } = result.data;
      if (isSuccess) {
        setMessage({ text: t("successful"), type: "success" });
        setOpenSnackbar(true);
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
        className={classes.verifyAccount_bk}
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
        <div className={classes.verifyAccount_form}>
          <Typography
            align="center"
            color={"primary"}
            style={{ fontWeight: "bolder", fontSize: "22px" }}
          >
            {t("verifyAccount_title")}
          </Typography>
          <hr
            style={{
              width: "255px",
              border: 0,
              borderTop: "1px solid #eee",
            }}
          />
          <Typography align="center" className={classes.verifyAccount_text}>
            {t("verifyAccount_message_fill")}
          </Typography>
          &nbsp;
          <Typography align="center">{email}</Typography>
          &nbsp;
          <ReactCodeInput
            type="number"
            fields={4}
            onChange={(code) => {
              setVerificationCode(code);
            }}
            values={verificationCode}
          />
          &nbsp;
          <div style={{ display: "flex" }}>
            <Typography className={classes.verifyAccount_text}>
              {t("verifyAccount_didentGet")}
            </Typography>
            <Link
              onClick={handleResend}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: theme.palette.primary.main,
                margin: "0 0 0 5px",
              }}
            >
              {t("verifyAccount_resend")}
            </Link>
          </div>
          &nbsp;
          <div
            className={classes.verifyAccount_input}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <Link
                href="signup"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                }}
              >
                <ArrowRightAltOutlinedIcon
                  style={{
                    margin: "0 5px 0 0",
                    transform: "rotate(180deg)",
                  }}
                />
                {t("verifyAccount_goBack")}
              </Link>
            </div>
            <div>
              <Button
                disabled={loading || verificationCode.length !== 4}
                variant="contained"
                color="primary"
                style={{ width: "130px", color: "#FAFAFA" }}
                onClick={hendleVerifyAccount}
              >
                {t("verifyAccount_verifyAccountBtn")}
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
