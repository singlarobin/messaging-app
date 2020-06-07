import { amber, grey, teal, purple, pink } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: teal[500]
  },
  homeContent: {
    backgroundColor: amber[200],
    padding: theme.spacing(2),
    textAlign: "center",
    height: "calc(120%)"
  },
  welcome: {
    marginTop: "calc(10%)",
    color: purple[500]
  },
  content: {
    color: pink[500]
  },
  aboutContent: {
    backgroundColor: grey[400],
    padding: theme.spacing(2),
    textAlign: "center"
  },
  contactContent: {
    backgroundColor: teal[500],
    padding: theme.spacing(2),
    textAlign: "center"
  }
});
export default styles;
