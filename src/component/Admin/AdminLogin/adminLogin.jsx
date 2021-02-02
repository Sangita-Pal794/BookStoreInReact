import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
  Card,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import History from "../../../History";
import "./adminLogin.scss";
import AdminServices from "../../../services/adminServices";

class LogIn extends Component {
  // constructor(props){
  //   super(props);
  // }
  state = {
    showPassword: false,
    email: "",
    passWord: "",
    emailHelperText: " ",
    passwordHelperText: " ",
    emailFlag: false,
    passWordFlag: false,
    snackbarActive: false,
    snackBarMesage: "LogIn Successfull",
    snackBarSeverity: "success",
  };

  checkEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
    const pattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if (e.target.value.match(pattern)) {
      this.setState({
        emailFlag: false,
        emailHelperText: " ",
      });
    } else {
      this.setState({
        emailHelperText: "invalid e-mail",
        emailFlag: true,
      });
    }
  };

  checkPassword = (e) => {
    this.setState({
      passWord: e.target.value,
    });
    const pattern =
      "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[*.!@$%^&(){}:;<>,?/~_+=|]).{8,}";
    if (e.target.value.match(pattern)) {
      this.setState({
        passWordFlag: false,
        passwordHelperText: " ",
      });
    } else {
      this.setState({
        passwordHelperText:
          "8 or more char with a mix of uppercase, lowercase, number and Spl. char",
        passWordFlag: true,
      });
    }
  };

  checkAuthentication = () => {
    let emailLength = true;
    let passwordLength = true;

    if (this.state.email.length < 1) {
      emailLength = false;
      this.setState({
        emailHelperText: "Require",
        emailFlag: true,
      });
    }

    if (this.state.passWord.length < 1) {
      passwordLength = false;
      this.setState({
        passwordHelperText: "Require",
        passWordFlag: true,
      });
    }

    if (emailLength && passwordLength) {
      if (!this.state.emailFlag && !this.state.passWordFlag) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  logIn = () => {
    if (this.checkAuthentication()) {
      let logInObj = {
        email: this.state.email,
        password: this.state.passWord,
      };
      AdminServices.login(logInObj)
        .then((responce) => {
          console.log(responce);
          if (responce.status === 200) {
            this.setState({
              snackbarActive: true,
            });
            localStorage.setItem("token", responce.data.result.accessToken);
            History.push("/admindashboard");
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            snackbarActive: true,
            snackBarMesage: "LogIn un-successfull",
            snackBarSeverity: "error",
          });
          console.log(error);
        });
    }
  };

  closeSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbarActive: false,
    });
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    return (
      <>
        <Card className="main-container log-in">
          <Grid container direction="row" wrap="nowrap" spacing={2}>
            <Grid container item md={12} sm={12} spacing={2}>
              <Grid item md={12} sm={12} className="heading log-in">
                <Box fontWeight="fontWeightBold" m={1} className="sub-heading">
                  Sign In
                </Box>
                <Box
                  fontWeight="fontWeightMedium"
                  m={1}
                  className="sub-heading"
                >
                  to continue to Bookstore
                </Box>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="input-field">
                <TextField
                  fullWidth
                  name="Email"
                  required={true}
                  label="Email"
                  type="email"
                  helperText={this.state.emailHelperText}
                  margin="dense"
                  variant="outlined"
                  error={this.state.emailFlag}
                  onChange={this.checkEmail}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="input-field">
                <TextField
                  fullWidth
                  name="Password"
                  required={true}
                  label="Password"
                  helperText={this.state.passwordHelperText}
                  margin="dense"
                  variant="outlined"
                  type={this.state.showPassword ? "text" : "password"}
                  error={this.state.passWordFlag}
                  onChange={this.checkPassword}
                  InputProps={{
                    // <-- toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="toggle-password-eye"
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => History.push("/forgetPassword")}
                  className="button-text"
                >
                  Forget Password
                </Button>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="button-group">
                <div>
                  <Button
                    color="primary"
                    className="crate-account-button"
                    onClick={() => History.push("/singUp")}
                  >
                    Create Account
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className="login-button"
                    onClick={this.logIn}
                  >
                    Log In
                  </Button>
                  <Snackbar
                    open={this.state.snackbarActive}
                    autoHideDuration={1000}
                    onClose={this.closeSnackbar}
                  >
                    <Alert
                      severity={this.state.snackBarSeverity}
                      onClose={this.closeSnackbar}
                    >
                      {this.state.snackBarMesage}
                    </Alert>
                  </Snackbar>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </>
    );
  }
}

export default withRouter(LogIn);
