import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { height: "100%" },
  customLoading: {
    width: "100%",
    position: "absolute",
    top: "64px",
    left: "0px",
    "& > * + *": {
      marginTop: 0,
    },
  },
  signup_bk: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${"../../sources/Pic/Signup.png"})`,
  },
  signup_form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  signup_form_account_active: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid",
    borderRadius: "5px",
    height: "150px",
    width: "150px",
    borderColor: theme.palette.primary.main,
    position: "relative",
    boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
  },
  signup_form_account_deactive: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid",
    borderRadius: "5px",
    height: "150px",
    width: "150px",
    borderColor: theme.palette.info.main,
    position: "relative",
  },
  signup_text: {
    color: theme.palette.grey.main,
  },
  signup_input: { width: "80%", margin: "10px" },
}));

export default useStyles;
