import {
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@material-ui/icons";
import Header from "../../Header/Header";
import { connect } from "react-redux";
import { getCartBooks } from "../../../redux/action.js";

import Footer from "../Footer/Footer";
import "./Cart.scss";
import { getBooks } from "../../../redux/action.js";
import emptyCart from "../../../assets/empty-cart.png";
import bookImage from "../../../assets/Image 11.png";
import BookServices from "../../../services/bookServices.js";
import UserServices from "../../../services/userServices.js";

// export default
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantityControl: true,
      continueToAddress: false,
      orderSummeryControl: false,
      cartItems: [],
      addressType: "Home",

      addressHolderName: "",
      addressHolderNameFlag: false,
      addressHolderNamehHelperText: " ",

      addressHolderPhoneNo: "",
      addressHolderPhoneNoFlag: false,
      addressHolderPhoneNoHelperText: " ",

      addressPinCode: "",
      addressPinCodeFlag: false,
      addressPinCodeHelperText: " ",

      addressState: "",
      addressStateFlag: false,
      addressStateHelperText: " ",

      address: "",
      addressFlag: false,
      addresshelperText: " ",

      addressCity: "",
      addressCityFlag: false,
      addressCityHelperText: " ",

      addressLandmark: "",
    };
  }
  setCartItem = (newCartItem) => {
    this.setState({
      cartItems: newCartItem,
    });
  };

  componentDidMount() {
    console.log("cart length", this.props.cart.length);
    // this.getCartItems();
  }

  handleChange = (event) => {
    this.setState({
      addressType: event.target.value,
    });
  };
  continueToCustomerDetails = () => {
    this.setState({
      quantityControl: false,
      continueToAddress: true,
    });
  };
  backToAddreddControl = () => {
    this.setState({
      quantityControl: false,
      continueToAddress: true,
      orderSummeryControl: false,
    });
  };

  backToQuantityControl = () => {
    this.setState({
      quantityControl: true,
      continueToAddress: false,
    });
  };

  checkAuthentication = () => {
    let nameLengthFlag = true;
    let mobileNumberLengthFlag = true;
    let pinCodeLengthFlag = true;
    let stateLengthFlag = true;
    let addressLengthFlag = true;
    let cityLengthFlag = true;
    if (this.state.addressHolderName.length < 1) {
      nameLengthFlag = false;
      this.setState({
        addressHolderNameFlag: true,
        addressHolderNamehHelperText: "Required",
      });
    }
    if (this.state.addressHolderPhoneNo.length < 1) {
      mobileNumberLengthFlag = false;
      this.setState({
        addressHolderPhoneNoFlag: true,
        addressHolderPhoneNoHelperText: "Required",
      });
    }
    if (this.state.addressPinCode.length < 1) {
      pinCodeLengthFlag = false;
      this.setState({
        addressPinCodeFlag: true,
        addressPinCodeHelperText: "Required",
      });
    }
    if (this.state.addressState.length < 1) {
      stateLengthFlag = false;
      this.setState({
        addressStateFlag: true,
        addressPinCodeHelperText: "Required",
      });
    }
    if (this.state.address.length < 1) {
      addressLengthFlag = false;
      this.setState({
        addressFlag: true,
        addresshelperText: "Required",
      });
    }
    if (this.state.addressCity.length < 1) {
      cityLengthFlag = false;
      this.setState({
        addressCityFlag: true,
        addressCityHelperText: "Required",
      });
    }

    if (
      nameLengthFlag &&
      mobileNumberLengthFlag &&
      pinCodeLengthFlag &&
      stateLengthFlag &&
      addressLengthFlag &&
      cityLengthFlag
    ) {
      if (
        !this.state.addressHolderNameFlag &&
        !this.state.addressHolderPhoneNoFlag &&
        !this.state.addressPinCodeFlag &&
        !this.state.addressStateFlag &&
        !this.state.addressFlag &&
        !this.state.addressCityFlag
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  submitAddress = () => {
    if (this.checkAuthentication()) {
      let addressObj = {
        addressType: this.state.addressType,
        fullAddress:
          this.state.address +
          ", PIN- " +
          this.state.addressPinCode +
          ", Phn No." +
          this.state.addressHolderPhoneNo +
          ", LandMark- " +
          this.state.addressLandmark,
        city: this.state.addressCity,
        state: this.state.addressState,
      };
      console.log(addressObj);
      UserServices
        .updateAddress(addressObj)
        .then((responce) => {
          console.log(responce);
          this.setState({
            quantityControl: false,
            continueToAddress: false,
            orderSummeryControl: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //  getCartItems = () => {
  //    BookServices.getCartItem()
  //             .then((res) => {
  //               this.setCartItem(res.data.result);
  //               console.log("All cart items",res.data.result);

  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //           }

  validate = (e) => {
    const namePattern = "^[A-Za-z ]{3,}$";
    const mobilePattern = "^[0-9]{10}$";
    const pinCodePattern = "^[0-9]{6}$";
    if (e.target.name === "customerName") {
      if (e.target.value.length > 0) {
        if (e.target.value.match(namePattern)) {
          this.setState({
            addressHolderName: e.target.value,
            addressHolderNameFlag: false,
            addressHolderNamehHelperText: " ",
          });
        } else {
          this.setState({
            addressHolderNameFlag: true,
            addressHolderNamehHelperText: "3 or more char.",
          });
        }
      } else {
        this.setState({
          addressHolderNameFlag: true,
          addressHolderNamehHelperText: "Required",
        });
      }
    }
    if (e.target.name === "customerPhoneNo") {
      if (e.target.value.length > 0) {
        if (e.target.value.match(mobilePattern)) {
          this.setState({
            addressHolderPhoneNo: e.target.value,
            addressHolderPhoneNoFlag: false,
            addressHolderPhoneNoHelperText: " ",
          });
        } else {
          this.setState({
            addressHolderPhoneNoFlag: true,
            addressHolderPhoneNoHelperText: "Should be 10 digit",
          });
        }
      } else {
        this.setState({
          addressHolderPhoneNoFlag: true,
          addressHolderPhoneNoHelperText: "Required",
        });
      }
    }
    if (e.target.name === "customerPincode") {
      if (e.target.value.length > 0) {
        if (e.target.value.match(pinCodePattern)) {
          this.setState({
            addressPinCode: e.target.value,
            addressPinCodeFlag: false,
            addressPinCodeHelperText: " ",
          });
        } else {
          this.setState({
            addressPinCodeFlag: true,
            addressPinCodeHelperText: "Should be 6 digit pin",
          });
        }
      } else {
        this.setState({
          addressPinCodeFlag: true,
          addressPinCodeHelperText: "Required",
        });
      }
    }
    if (e.target.name === "customerState") {
      if (e.target.value.length > 0) {
        this.setState({
          addressState: e.target.value,
          addressStateFlag: false,
          addressPinCodeHelperText: " ",
        });
      } else {
        this.setState({
          addressStateFlag: true,
          addressPinCodeHelperText: "Required",
        });
      }
    }
    if (e.target.name === "customerAddress") {
      if (e.target.value.length > 0) {
        this.setState({
          address: e.target.value,
          addressFlag: false,
          addresshelperText: " ",
        });
      } else {
        this.setState({
          addressFlag: true,
          addresshelperText: "Required",
        });
      }
    }
    if (e.target.name === "customerCity") {
      if (e.target.value.length > 0) {
        this.setState({
          addressCity: e.target.value,
          addressCityFlag: false,
          addressCityHelperText: " ",
        });
      } else {
        this.setState({
          addressCityFlag: true,
          addressCityHelperText: "Required",
        });
      }
    }
  };

  placeOrder = () => {
    let ordersArray = [];

    for (var i = 0; i < this.props.cart.length; ++i) {
      let eachOrderObj = {};
      eachOrderObj.product_id = this.props.cart[i].product_id._id;
      eachOrderObj.product_name = this.props.cart[i].product_id.bookName;
      eachOrderObj.product_quantity = this.props.cart[i].quantityToBuy;
      eachOrderObj.product_price =
        this.props.cart[i].product_id.price -
        this.props.cart[i].product_id.discountPrice;
      ordersArray.push(eachOrderObj);
    }

    console.log(ordersArray);
    let orderObj = {
      orders: ordersArray,
    };
    UserServices
      .addOrder(orderObj)
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <>
        <div className="cart-container">
          <div className="header">
            <Header
              cartItemCount={this.props.cart.length}
              setCartItem={this.setCartItem}
              getAllData={this.props.books}
            />
          </div>
          <div className="body">
            {this.props.cart.length > 0 ? (
              <div className="cart-item-container">
                <div className="cart-items">
                  <Typography variant="h6">
                    My Cart({this.props.cart.length})
                    {/* ({this.state.cartItems.length}) */}
                  </Typography>
                  {this.state.quantityControl && (
                    <>
                      <div className="cart-book-items">
                        {/* {this.state.cartItems.product_id && this.state.cartItems.map((book) => { */}
                        {this.props.cart
                          .filter((cart) => cart.product_id != null)
                          .map((book) => {
                            return (
                              <div className="each-cart-item" key={book._id}>
                                <div className="book-image">
                                  <img
                                    src={bookImage}
                                    alt="book"
                                    className="book-pic"
                                  />
                                </div>
                                <div className="book-details">
                                  <Typography variant="body2">
                                    {book.product_id.bookName}
                                  </Typography>
                                  <Typography variant="caption">
                                    {book.product_id.author}
                                  </Typography>
                                  <Typography variant="body1">
                                    Rs.{book.product_id.price}
                                  </Typography>
                                  <div className="book-quantity">
                                    <div className="book-quantity-control">
                                      <IconButton
                                        className="book-quantity-control-button"
                                        // onClick={(e) => {
                                        //   this.addCartItemQuantity(
                                        //     e,
                                        //     book.quantityToBuy,
                                        //     book._id
                                        //   );
                                        // }}
                                      >
                                        <AddIcon />
                                      </IconButton>
                                      <input
                                        disabled
                                        value={book.quantityToBuy}
                                        className="book-no-of-unit"
                                      />
                                      <IconButton
                                        className="book-quantity-control-button"
                                        // onClick={(e) => {
                                        //   this.deleteCartItemQuantity(
                                        //     e,
                                        //     book.quantityToBuy,
                                        //     book._id
                                        //   );
                                        // }}
                                      >
                                        <RemoveIcon />
                                      </IconButton>
                                    </div>
                                    <Button
                                      fullWidth
                                      className="cart-item-remove"
                                      // onClick={() => {
                                      //   this.removeCartItem(book._id);
                                      // }}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="continue-section">
                        <Button
                          className="continue-button"
                          onClick={this.continueToCustomerDetails}
                        >
                          Place Order
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <div className="customer-details">
                  <Typography variant="h6">Customer Details</Typography>
                  {this.state.continueToAddress && (
                    <div className="customer-details-form">
                      <TextField
                        variant="outlined"
                        margin="dense"
                        name="customerName"
                        label="Name"
                        className="customer-name"
                        helperText={this.state.addressHolderNamehHelperText}
                        error={this.state.addressHolderNameFlag}
                        onChange={(e) => {
                          this.setState({ addressHolderName: e.target.value });
                        }}
                        onBlur={this.validate}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        name="customerPhoneNo"
                        label="PhoneNo"
                        className="customer-phoneNo"
                        helperText={this.state.addressHolderPhoneNoHelperText}
                        error={this.state.addressHolderPhoneNoFlag}
                        onChange={(e) => {
                          this.setState({
                            addressHolderPhoneNo: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        name="customerPincode"
                        label="PinCode"
                        className="customer-pincode"
                        helperText={this.state.addressPinCodeHelperText}
                        error={this.state.addressPinCodeFlag}
                        onChange={(e) => {
                          this.setState({ addressPinCode: e.target.value });
                        }}
                        onBlur={this.validate}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        name="customerState"
                        label="State"
                        className="customer-state"
                        helperText={this.state.addressStateHelperText}
                        error={this.state.addressStateFlag}
                        onChange={(e) => {
                          this.setState({ addressState: e.target.value });
                        }}
                        onBlur={this.validate}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        multiline
                        rowsMax="5"
                        name="customerAddress"
                        label="Address"
                        className="customer-address"
                        helperText={this.state.addresshelperText}
                        error={this.state.addressFlag}
                        onChange={(e) => {
                          this.setState({ address: e.target.value });
                        }}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        name="customerCity"
                        label="City"
                        className="customer-city"
                        helperText={this.state.addressCityHelperText}
                        error={this.state.addressCityFlag}
                        onChange={(e) => {
                          this.setState({ addressCity: e.target.value });
                        }}
                        onBlur={this.validate}
                      />
                      <TextField
                        variant="outlined"
                        margin="dense"
                        name="customerLandmark"
                        label="Landmark"
                        className="customer-landmark"
                        onChange={(e) => {
                          this.setState({ addressLandmark: e.target.value });
                        }}
                        onBlur={this.validate}
                      />
                      <div className="address-type">
                        <Typography variant="caption">Type</Typography>
                        <RadioGroup
                          aria-label="type"
                          name="type"
                          value={this.state.addressType}
                          onChange={this.handleChange}
                          className="address-type-radio-group"
                        >
                          <FormControlLabel
                            value="Home"
                            control={
                              <Radio className="address-type-radio-button" />
                            }
                            label="Home"
                            className="home"
                          />
                          <FormControlLabel
                            value="Office"
                            control={
                              <Radio className="address-type-radio-button" />
                            }
                            label="Office"
                          />
                          <FormControlLabel
                            value="Other"
                            control={
                              <Radio className="address-type-radio-button" />
                            }
                            label="Other"
                          />
                        </RadioGroup>
                      </div>
                      <div className="continue-section">
                        <Button
                          className="back-to-quantity-control"
                          onClick={this.backToQuantityControl}
                        >
                          Back
                        </Button>
                        <Button
                          className="continue-button"
                          onClick={this.submitAddress}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="order-summery">
                  <Typography variant="h6">OrderSummery</Typography>
                  {this.state.orderSummeryControl && (
                    <>
                      {this.props.cart
                        .filter((cart) => cart.product_id != null)
                        .map((book) => {
                          return (
                            <div className="each-order" key={book._id}>
                              <div className="book-image">
                                <img
                                  src={bookImage}
                                  alt="book"
                                  className="book-pic"
                                />
                              </div>
                              <div className="book-details">
                                <Typography variant="body2">
                                  {book.product_id.bookName}
                                </Typography>
                                <Typography variant="caption">
                                  {book.product_id.author}
                                </Typography>
                                <Typography variant="body1">
                                  Rs.{book.product_id.price}
                                </Typography>
                                <Typography variant="caption">
                                  Quantity: {book.quantityToBuy}
                                </Typography>
                              </div>
                            </div>
                          );
                        })}
                      <div className="continue-section">
                        <Button
                          className="back-to-address-control"
                          onClick={this.backToAddreddControl}
                        >
                          Back
                        </Button>
                        <Button
                          className="continue-button"
                          onClick={this.placeOrder}
                        >
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="no-cart-item">
                  <img
                    src={emptyCart}
                    alt="cart is empty"
                    className="empty-cart-image"
                  />
                  <Typography variant="h4">Cart Is Empty</Typography>
                </div>
              </>
            )}
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("State from store", state);
  return {
    books: state.books,
    cart: state.cart,
  };
};
export default connect(mapStateToProps, {
  getCartBooks: getCartBooks,
})(Cart);
