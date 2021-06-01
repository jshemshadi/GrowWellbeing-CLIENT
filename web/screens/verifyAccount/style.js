import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { height: "100%" },
  customLoading: {
    width: "100%",
    position: "absolute",
    "& > * + *": {
      marginTop: 0,
    },
  },
  verifyAccount_bk: {
    opacity: "0.9",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${"../../sources/Pic/Verify.png"})`,
  },
  verifyAccount_form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  verifyAccount_form_account_active: {
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
  verifyAccount_form_account_deactive: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid",
    borderRadius: "5px",
    height: "150px",
    width: "150px",
    borderColor: theme.palette.info.main,
    position: "relative",
  },
  verifyAccount_text: {
    color: theme.palette.grey.main,
  },
  verifyAccount_input: { width: "80%", margin: "10px" },
}));

export default useStyles;
