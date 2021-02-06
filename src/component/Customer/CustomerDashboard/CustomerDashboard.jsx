import React, { Component } from "react";
import Header from "../../Header/Header.jsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TestImage from "../../../assets/Image 11@2x.png";
import TestImage1 from "../../../assets/Image 36@2x.png";
import "./CustomerDashboard.scss";
import Dropdown from "./dropdown"
import { connect } from "react-redux";
import { getBooks } from "../../../redux/action.js";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Books: [],
      open: false,
      isEdit: false,
      currentBookDetails: "",
    };
  }



  render() {
    return (
      <>
        <div>
          <Header />
        </div>
        <div className="addBookBtn">
          <h1 className="heading">Books</h1>          
            <div className="add"><Dropdown /></div>
        </div>
        <div className="body-content">
          <div className="displayCard">
            {this.props.books.map((book, index) => (
              <Card key={book._id}>
                <CardContent id="imageCard">
                  <div id="imageContain">
                    <img
                      src={index % 2 === 1 ? TestImage : TestImage1}
                      alt="No"
                      id="imgdescription"
                    />
                  </div>
                </CardContent>
                <CardContent id="detailsCard">
                  <p id="name">{book.bookName}</p>
                  <p id="author">{book.author}</p>
                  <p id="price">Rs. {book.price}</p>
                  <div className="btnContainer">
                    <Button
                      id="update"
                      variant="outlined"
                    >
                      ADD To BAG
                    </Button>
                    <Button
                      id="delete"
                      variant="outlined"
                      className="blackFont"
                    >
                      WISHLIST
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>          
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("State from store",state)
  return {
    books: state.books
  };
};
// export default Dashboard;
export default connect(mapStateToProps, {
  getBooks: getBooks,
})(Dashboard);
