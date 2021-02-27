import { Typography } from "@material-ui/core";
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Typography variant="body2" className="footer-text">
          Copyright © 2020,Bookstore Private Limites. All right reserved.
        </Typography>
      </div>
    </>
  );
};

export default Footer;
