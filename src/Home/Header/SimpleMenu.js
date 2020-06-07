import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withContext } from "../context";

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    //console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, value) => {
    setAnchorEl(null);
    props.handleButtonFunction(value);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={e => handleClose(e, "Home")}
      >
        <MenuItem onClick={e => handleClose(e, "home")}>Home</MenuItem>
        <MenuItem onClick={e => handleClose(e, "about")}>About</MenuItem>
        <MenuItem onClick={e => handleClose(e, "contactUs")}>
          Contact Us
        </MenuItem>
      </Menu>
    </div>
  );
}
export default withContext(SimpleMenu);
