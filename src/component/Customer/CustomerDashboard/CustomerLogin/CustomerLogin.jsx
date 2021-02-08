import React, { useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import ShoppingImage from "../../../assets/2766594@2x.png";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import history from "../../../History";
import userServices from "../../../services/userServices";
import "./CustomerLogin.scss";

const SignUpLogIn = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState("logIn");
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const [nameFlag, setNameFlag] = useState(false);
  const [signUpEmailFlag, setSignUpEmailFlag] = useState(false);
  const [signUpPasswordFlag, setSignUpPasswordFlag] = useState(false);
  const [mobileNumberFlag, setMobileNumberFlag] = useState(false);
  const [logInEmailFlag, setLogInEmailFlag] = useState(false);
  const [logInPasswordFlag, setLogInPasswordFlag] = useState(false);

  const [nameHelperText, setNameHelperText] = useState(" ");
  const [signUpEmailHelperText, setSignUpEmailHelperText] = useState(" ");
  const [signUpPasswordHelperText, setSignUpPasswordHelperText] = useState(" ");
  const [mobileNumberHelperText, setMobileNumberHelperText] = useState(" ");
  const [logInEmailHelperText, setLogInEmailHelperText] = useState(" ");
  const [logInPasswordHelperText, setLogInPasswordHelperText] = useState(" ");

  const namePattern = "^[A-Za-z ]{3,}$";
  const emailPattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const passwordPattern =
    "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[*.!@$%^&(){}:;<>,?/~_+=|]).{8,}";
  const mobilePattern = "^[0-9]{10}$";

  const checkLogInAuthentication = () => {
    let logInEmailLengthFlag = true;
    let logInPasswordLengthFlag = true;
    if (logInEmail.length < 1) {
      logInEmailLengthFlag = false;
      setLogInEmailFlag(true);
      setLogInEmailHelperText("Require");
    }
    if (logInPassword.length < 1) {
      logInPasswordLengthFlag = false;
      setLogInPasswordFlag(true);
      setLogInPasswordHelperText("Require");
    }
    if (logInEmailLengthFlag && logInPasswordLengthFlag) {
      if (!logInEmailFlag && !logInPasswordFlag) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const checkSignUpAuthentication = () => {
    let nameLengthFlag = true;
    let signUpEmailLengthFlag = true;
    let signUpPasswordLengthFlag = true;
    let mobileNumberLengthFlag = true;
    if (name.length < 1) {
      nameLengthFlag = false;
      setNameFlag(true);
      setNameHelperText("Require");
    }
    if (signUpEmail.length < 1) {
      signUpEmailLengthFlag = false;
      setSignUpEmailFlag(true);
      setSignUpEmailHelperText("Require");
    }
    if (signUpPassword.length < 1) {
      signUpPasswordLengthFlag = false;
      setSignUpPasswordFlag(true);
      setSignUpPasswordHelperText("Require");
    }
    if (mobileNumber.length < 1) {
      mobileNumberLengthFlag = false;
      setMobileNumberFlag(true);
      setMobileNumberHelperText("Require");
    }
    if (
      nameLengthFlag &&
      signUpEmailLengthFlag &&
      signUpPasswordLengthFlag &&
      mobileNumberLengthFlag
    ) {
      if (
        !nameFlag &&
        !signUpEmailFlag &&
        !signUpPasswordFlag &&
        !mobileNumberFlag
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const validate = (e) => {
    if (e.target.name === "name") {
      if (e.target.value.match(namePattern)) {
        setName(e.target.value);
        setNameFlag(false);
        setNameHelperText(" ");
      } else {
        setNameFlag(true);
        setNameHelperText("3 or more char");
      }
    }
    if (e.target.name === "signUpEmail") {
      if (e.target.value.match(emailPattern)) {
        setSignUpEmail(e.target.value);
        setSignUpEmailFlag(false);
        setSignUpEmailHelperText(" ");
      } else {
        setSignUpEmailFlag(true);
        setSignUpEmailHelperText("Invalid email");
      }
    }
    if (e.target.name === "signUpPassword") {
      if (e.target.value.match(passwordPattern)) {
        setSignUpPassword(e.target.value);
        setSignUpPasswordFlag(false);
        setSignUpPasswordHelperText(" ");
      } else {
        setSignUpPasswordFlag(true);
        setSignUpPasswordHelperText(
          "Combination of upper and lower case, number & special character"
        );
      }
    }
    if (e.target.name === "mobileNumber") {
      if (e.target.value.match(mobilePattern)) {
        setMobileNumber(e.target.value);
        setMobileNumberFlag(false);
        setMobileNumberHelperText(" ");
      } else {
        setMobileNumberFlag(true);
        setMobileNumberHelperText("Should be exact 10 digit");
      }
    }
    if (e.target.name === "logInEmail") {
      if (e.target.value.match(emailPattern)) {
        setLogInEmail(e.target.value);
        setLogInEmailFlag(false);
        setLogInEmailHelperText(" ");
      } else {
        setLogInEmailFlag(true);
        setLogInEmailHelperText("Invalid email");
      }
    }
    if (e.target.name === "logInPassword") {
      if (e.target.value.match(passwordPattern)) {
        setLogInPassword(e.target.value);
        setLogInPasswordFlag(false);
        setLogInPasswordHelperText(" ");
      } else {
        setLogInPasswordFlag(true);
        setLogInPasswordHelperText(
          "Combination of upper and lower case, number & spc. char."
        );
      }
    }
  };

  const logInMe = () => {
    if (checkLogInAuthentication()) {
      let logInObj = {
        email: logInEmail,
        password: logInPassword,
      };
      userServices
        .logIn(logInObj)
        .then((responce) => {
          console.log(responce);
          if (responce.status === 200) {
            setLogInEmail("");
            setLogInPassword("");
            localStorage.setItem("user_id", responce.data.result.accessToken);
            closeSignUpLogIn();
            props.showProfile();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const registerMe = () => {
    if (checkSignUpAuthentication()) {
      let signUpObj = {
        fullName: name,
        email: signUpEmail,
        password: signUpPassword,
        phone: mobileNumber,
      };
      userServices
        .signUp(signUpObj)
        .then((responce) => {
          console.log(responce);
          setName("");
          setSignUpEmail("");
          setSignUpPassword("");
          setMobileNumber("");
          setSelectedFrom("logIn");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const selectLogInFrom = () => {
    setSelectedFrom("logIn");
  };

  const selectSignUpFrom = () => {
    setSelectedFrom("signUp");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const closeSignUpLogIn = () => {
    props.closeSignUpOrLogIn();
  };

  return (
    <>
      <Dialog
        open={props.openSignUpLogIn}
        onClose={closeSignUpLogIn}
        className="signUp-logIn-dialog"
      >
        <div className="signUp-logIn-container">
          <div className="shopping-image">
            <img src={ShoppingImage} alt="shopping" className="shop-image" />
            <Typography variant="h6" className="image-title">
              ONLINE BOOK SHOPPING
            </Typography>
          </div>
          <div className="signUp-logIn-from">
            <div className="toggle-signUp-logIn">
              <div className="logIn-select" onClick={selectLogInFrom}>
                <Typography
                  variant="h6"
                  className={clsx("logIn-h6", {
                    active: selectedFrom === "logIn",
                  })}
                >
                  LOG IN
                </Typography>
                <div
                  className={clsx("select", {
                    active: selectedFrom === "logIn",
                  })}
                />
              </div>
              <div className="signUp-select" onClick={selectSignUpFrom}>
                <Typography
                  variant="h6"
                  className={clsx("signUp-h6", {
                    active: selectedFrom === "signUp",
                  })}
                >
                  SIGN UP
                </Typography>
                <div
                  className={clsx("select", {
                    active: selectedFrom === "signUp",
                  })}
                />
              </div>
            </div>
            <div className="from">
              {selectedFrom === "logIn" ? (
                <div className="logIn-from">
                  <Typography variant="body2">Email ID</Typography>
                  <TextField
                    fullWidth
                    error={logInEmailFlag}
                    name="logInEmail"
                    margin="dense"
                    variant="outlined"
                    type="text"
                    className="logIn-email-Field"
                    helperText={logInEmailHelperText}
                    value={logInEmail}
                    onBlur={validate}
                    onChange={(e) => {
                      setLogInEmail(e.target.value);
                    }}
                  />
                  <Typography variant="body2">Password</Typography>
                  <TextField
                    fullWidth
                    error={logInPasswordFlag}
                    autoComplete="off"
                    name="logInPassword"
                    margin="dense"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    className="logIn-password-Field"
                    helperText={logInPasswordHelperText}
                    value={logInPassword}
                    onBlur={validate}
                    onChange={(e) => {
                      setLogInPassword(e.target.value);
                    }}
                    InputProps={{
                      // <-- toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className="toggle-password-eye"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className="forget-pass">
                    <Typography
                      variant="caption"
                      onClick={() => history.push("/forgetPassword")}
                    >
                      Forget Password ?
                    </Typography>
                  </div>
                  <Button fullWidth className="logIn-button" onClick={logInMe}>
                    Log In
                  </Button>
                  <div className="more-option-login-divider">
                    <div className="spacing" />
                    <Typography variant="h6" style={{ margin: " 0 10px" }}>
                      OR
                    </Typography>
                    <div className="spacing" />
                  </div>
                  <div className="more-option-login-buttons">
                    <Button className="login-with-facebook">FaceBook</Button>
                    <Button className="login-with-google">Google</Button>
                  </div>
                </div>
              ) : (
                <div className="signUp-from">
                  <Typography variant="body2">Full Name</Typography>
                  <TextField
                    fullWidth
                    error={nameFlag}
                    value={name}
                    name="name"
                    margin="dense"
                    variant="outlined"
                    type="text"
                    helperText={nameHelperText}
                    className="signUp-name-Field"
                    onBlur={validate}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Typography variant="body2">Email ID</Typography>
                  <TextField
                    fullWidth
                    error={signUpEmailFlag}
                    value={signUpEmail}
                    name="signUpEmail"
                    margin="dense"
                    variant="outlined"
                    type="text"
                    helperText={signUpEmailHelperText}
                    className="signUp-email-Field"
                    onBlur={validate}
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);
                    }}
                  />
                  <Typography variant="body2">Password</Typography>
                  <TextField
                    fullWidth
                    error={signUpPasswordFlag}
                    value={signUpPassword}
                    name="signUpPassword"
                    margin="dense"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    helperText={signUpPasswordHelperText}
                    className="signUp-password-Field"
                    onBlur={validate}
                    onChange={(e) => {
                      setSignUpPassword(e.target.value);
                    }}
                    InputProps={{
                      // <-- toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className="toggle-password-eye"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="body2">Mobile Number</Typography>
                  <TextField
                    fullWidth
                    error={mobileNumberFlag}
                    value={mobileNumber}
                    name="mobileNumber"
                    margin="dense"
                    variant="outlined"
                    type="number"
                    helperText={mobileNumberHelperText}
                    className="signUp-mobile-number-Field"
                    onBlur={validate}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
                  />
                  <Button
                    fullWidth
                    className="signUp-button"
                    onClick={registerMe}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SignUpLogIn;
