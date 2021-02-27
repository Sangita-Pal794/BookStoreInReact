import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Header from "../../Header/Header.jsx";
import "./forgetPassword.scss";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
// const UserService = require("../../services/user_service");

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const changeEmail = (event) => {
    let emailPattern = "^([a-zA-Z0-9_.$*&!+-]+)@([a-z0-9]+).([a-z.]{2,7})$";
    if (event.target.value.match(emailPattern)) {
      setEmail(event.target.value);
      setEmailFlag(false);
      setEmailHelperText("");
    } else if (event.target.value.length < 1) {
      setEmailFlag(true);
      setEmailHelperText("required");
    } else {
      setEmailFlag(true);
      setEmailHelperText("Invalid email");
    }
  };

  // const forgetFunc = () => {
  //   if (email.length === 0) {
  //     setEmailHelperText("required");
  //     setEmailFlag(true);
  //   }
  //   if (email.length > 0) {
  //     if (!emailFlag) console.log("Forget password successful");
  //   }
  //   let obj = {
  //     service: "advance",
  //     email: email,
  //   };
  //   UserService.forgot(obj)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="c1">
      <div className="c2">
        <Header/>
        {/* <ColoredFundoo /> */}
        <div className="c4">Forget Your Password?</div>
        <div>
          <Typography variant="caption" color="inherit" className="c5">Enter your email address and we 'll send you</Typography>
        <Typography variant="caption" color="inherit" className="c5"> a link to reset your password</Typography>
        </div>
      </div>
      <Typography variant="caption" color="inherit" className="c6">Email id</Typography>
      <TextField
        fullWidth
        autoComplete="off"
        error={emailFlag}
        // label="email"
        variant="outlined"
        margin="dense"
        helperText={emailHelperText}
        required={true}
        name="email"
        onChange={changeEmail}
        color="secondary"
        className="c10"
      />
      <div className="c3">
        <Link className="um7" to="/resetpassword"></Link>
        <Button variant="contained" color="secondary" className="c7">
          Reset Password
        </Button>
      </div>
    </div>
  );
};
export default ForgetPassword;
