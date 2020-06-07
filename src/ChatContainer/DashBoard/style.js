import { lightGreen, teal } from "@material-ui/core/colors";
const styles = theme => ({
  root: {
    backgroundColor: teal[400]
  },
  contentGrid: {
    height: theme.spacing(75)
  },
  noChatPaper: {
    backgroundColor: lightGreen.A100,
    height: theme.spacing(70)
  },
  content: {
    paddingTop: theme.spacing(10)
  }
});
export default styles;
