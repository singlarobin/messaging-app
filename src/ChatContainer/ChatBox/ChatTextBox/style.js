const styles = theme => ({
  paper: {
    height: theme.spacing(5),
    width: "calc(100%  )"
  },
  text: {
    paddingLeft: theme.spacing(1),
    width: "calc(100% - 50px)"
  },
  sendButton: {
    color: "blue",
    cursor: "pointer",
    padding: theme.spacing(1, 1, 1, 1),
    "&:hover": {
      color: "gray"
    }
  }
});
export default styles;
