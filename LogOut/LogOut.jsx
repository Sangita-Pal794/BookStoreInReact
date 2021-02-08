import React, { useState } from "react";
import "./LogOut.scss"
import { ClickAwayListener, Typography, Button} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useHistory } from "react-router";
import { IconButton as IconButton } from "@material-ui/core";
import Profile from "../../assets/Profile.jpg";
import LoginSignUp from "../Customer/CustomerLogin/CustomerLogin"


const Logout = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openSignUpLogIn, setOpenSignUpLogIn] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const showProfile = () => {
    setIsProfileClicked(!isProfileClicked);
  };

  const anchorRef = React.useRef(null);
  const history = useHistory();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const signUpOrLogIn = () => {
    setOpenSignUpLogIn(true);
  };

  const closeSignUpOrLogIn = () => {
    setOpenSignUpLogIn(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const logout = () => {
    localStorage.setItem("token", "");
    history.push("/adminlogin");
  };
  const logOut = async () => {
    localStorage.setItem("user_id", "");
    setIsProfileClicked(!isProfileClicked);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div>
          <img className="profile-pic" src={Profile} alt="" />
          <Typography variant="h6" className="name">
            Hello Sangita
          </Typography>
        </div>
        {/* <PersonOutlineIcon/> */}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <div className="a1">
                    <h4 className="Welcome">Welcome</h4>
                    <Typography variant="caption" color="inherit" className="c5">To acess account and manage orders</Typography>
                    {localStorage.getItem("user_id") &&
              localStorage.getItem("user_id").length > 0 ? (
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  className="signUp-login-button"
                  onClick={logOut}
                >
                  Log out
                </Button>
              ) : (
                    <Button
                  variant="outlined"
                  color="secondary"
                  className="signUp-login-button"
                  onClick={signUpOrLogIn}
                >
                  Log In / Sign Up
                </Button>
              )}
                    <Typography variant="caption" color="inherit" className="c5">My orders</Typography>
                    <Typography variant="caption" color="inherit" className="c5">Wish List</Typography>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <LoginSignUp
          openSignUpLogIn={openSignUpLogIn}
          closeSignUpOrLogIn={closeSignUpOrLogIn}
          showProfile={showProfile}
        />
    </>
  );
};
export default Logout;
