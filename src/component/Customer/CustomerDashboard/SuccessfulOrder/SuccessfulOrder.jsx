import React from "react";
import Header from "../../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import orderSuccessful from "../../../assets/order-success.PNG";
import "./SuccessfulOrder.scss";
import { Typography } from "@material-ui/core";

const SuccessfulOrder = (props) => {
  return (
    <>
      <div className="success-order-container">
        <div className="header">
          <Header
            // cartItemCount={props.cartItemCount}
          />
        </div>
        <div className="body">
          <div className="body-container">
            <img
              src={orderSuccessful}
              alt="order-successful"
              className="order-successful-image"
            />
            <Typography variant="h6" className="successful-text">
              hurray!!! your order is confirmed
            </Typography>
            <Typography variant="h6" className="successful-text">
              the order ID is #123456. Save the order ID for further
              comunication...
            </Typography>
            <div className="contact-details">
              <div className="contact-details-header">
                <Typography variant="h6" className="successful-text email">
                  email us
                </Typography>
                <Typography variant="h6" className="successful-text contact">
                  contact us
                </Typography>
                <Typography variant="h6" className="successful-text address">
                  address
                </Typography>
              </div>
              <div className="contact-details-body">
                <Typography variant="body2" className="successful-text email">
                  admin@ bookstore .com
                </Typography>
                <Typography variant="body2" className="successful-text contact">
                  +91 8765432109
                </Typography>
                <Typography variant="body2" className="successful-text address">
                42, 14th Main, 15th Cross, Sector 4, opp. to BDA complex, near Kumarakom resturant, HSR Layout, Bangalore - 560034
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SuccessfulOrder;