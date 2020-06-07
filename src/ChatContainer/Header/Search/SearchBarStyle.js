import { grey, teal, lightGreen } from "@material-ui/core/colors";
const styles = theme => ({
  root: {
    backgroundColor: teal[400],
    height: theme.spacing(75)
  },
  search: {
    position: "relative",
    backgroundColor: grey[400],
    "&:hover": {
      backgroundColor: grey[500]
    },

    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  backIcon: {
    marginLeft: theme.spacing(2)
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  noResult: {
    marginTop: theme.spacing(2)
  },
  listRoot: {
    backgroundColor: lightGreen.A100,
    overflow: "auto",
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  }
});

export default styles;
