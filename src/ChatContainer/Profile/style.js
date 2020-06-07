import { teal } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    backgroundColor: teal[500],
    height: "calc(120%)"
  },
  paper: {
    backgroundColor: teal[500],
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  gridList: {
    justifyContent: "space-around",
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(12)
    }
  },
  profileImage: {
    height: "400px",
    width: "400px"
  },
  text: {
    margin: theme.spacing(0, 0, 1.5, 0)
  },
  button: {
    backgroundColor: teal[500]
  }
});
export default styles;
