import { lightGreen, yellow, orange } from "@material-ui/core/colors";
const styles = theme => ({
  root: {
    backgroundColor: lightGreen.A100,
    overflow: "auto",
    height: theme.spacing(65)
  },
  noConversationPaper: {
    backgroundColor: lightGreen.A100,
    height: theme.spacing(65)
  },
  conversationPaper: {
    backgroundColor: lightGreen.A100
  },
  content: {
    paddingTop: theme.spacing(5)
  },
  rightText: {
    textAlign: "right",
    backgroundColor: orange[300],
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: theme.spacing(2),
    marginLeft: "calc(40%)",
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1)
  },
  leftText: {
    textAlign: "left",
    backgroundColor: yellow[300],
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: theme.spacing(2),
    marginRight: "calc(40%)",
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1, 1, 1, 1)
  },
  tickIcon: {
    padding: theme.spacing(1, 1, 1, 0)
  }
});
export default styles;
