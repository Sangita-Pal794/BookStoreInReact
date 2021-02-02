import React, { Component } from "react";
import Header from "../../Header/Header.jsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AdminServices from "../../../services/adminServices";
import TestImage from "../../../assets/Image 11@2x.png";
import TestImage1 from "../../../assets/Image 36@2x.png";
import AddBook from "../AdminAddBook/addBook.jsx";
import EditBook from "../AdminUpdate/adminUpdate.jsx";
import "./adminDashboard.scss";

class Dashboard extends Component {
  state = {
    Books: [],
    open: false,
    isEdit: false,
    currentBookDetails:""
  };

  editBookOpen = (book) => {
    console.log("Edit book reached", book);
    this.setState({IsEdit: true});
    this.setState({currentBookDetails: book});
  };

  handleClickOpen = () => {
    console.log("add book calling");
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.getAllBooks();
  }
  getAllBooks = () => {
    console.log(" all book calling");
    AdminServices.getAllBooks()
      .then((res) => {
        console.log(res);
        console.log(res.data.result);
        this.setState({ Books: res.data.result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBook = (book) => {
    console.log("calling delete book:", book);

    AdminServices.deleteBooks(book)
      .then((response) => {
        console.log(response);
        this.getAllBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div>
          <Header />
        </div>
        <div className="addBookBtn">
          <h1 className="heading">Books</h1>
          <AddBook open={this.handleClickOpen} close={this.handleClose} openState={this.state.open} getAllBooks={this.getAllBooks} />

          <Button
            onClick={this.handleClickOpen}
            variant="outlined"
            id="addBook"
            color="primary"
          >
            Add Book
          </Button>
        </div>
        {/* <EditBook
        isEdit={this.isEdit}
        currentProductDetails={this.currentProductDetails}

        /> */}
        <div className="body-content">
          <div className="displayCard">
            {this.state.Books.map((book, index) => (
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
                    <Button id="update" variant="contained"
                    onClick={(e) => this.editBookOpen(book)}>
                      Update
                    </Button>
                    <Button
                      id="delete"
                      variant="outlined"
                      className="blackFont"
                      onClick={() => this.deleteBook(book)}
                    >
                      Delete
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
export default Dashboard;
