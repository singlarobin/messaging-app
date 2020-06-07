import { lightGreen } from "@material-ui/core/colors";
const styles = theme => ({
  chatPaper: {
    backgroundColor: lightGreen.A100,
    height: theme.spacing(70)
  },
  list: {
    backgroundColor: lightGreen.A100,
    overflow: "auto"
  },
  content: {
    paddingTop: theme.spacing(10)
  },
  messageIcon: {
    marginLeft: "calc(62%)"
  }
});
export default styles;
