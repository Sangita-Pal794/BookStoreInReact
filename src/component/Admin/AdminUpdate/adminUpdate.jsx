import { Button, Dialog, InputBase } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AdminServices from "../../../services/adminServices";
import "./adminUpdate.scss"

const EditBookDetails = (props) => { 
    console.log(props,"hhhhd")   
  const [editBookName, setEditBookName] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editPrice, setEditPrice] = useState("");

  

  useEffect(() => {
    setEditBookName(props.currentBookDetails.bookName);
    setEditAuthor(props.currentBookDetails.author);
    setEditPrice(props.currentBookDetails.price);
    }, [props.currentBookDetails]);
  

  



  const editProduct = (book) => {
    console.log("calling edit product:", props.currentBookDetails._id);

    let updateNoteObject = {       
      "bookName": editBookName,
      "author": editAuthor,
      "price": editPrice
      };
      console.log(updateNoteObject);
      AdminServices.updateBooks(updateNoteObject,props.currentBookDetails._id)
      .then((response) => {
        console.log(response);
        props.getAllBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
      <Dialog onClose={props.closeEdit} open={props.isEdit} className="edit-modal">
        <div className="edit-record-from">
          <div className="edit-record-input">
            <InputBase
              fullWidth
              margin="dense"
              multiline
              rowsMax={2}
              value={editBookName}
              onChange={(e) => {
                setEditBookName(e.target.value);
              }}
              className="edit-record-title"
            />
            <InputBase
              fullWidth
              margin="dense"
              multiline
              rowsMax={10}
              value={editAuthor}
              onChange={(e) => {
                setEditAuthor(e.target.value);
              }}
              className="edit-record-description"
            />
            <InputBase
              fullWidth
              margin="dense"
              multiline
              rowsMax={10}
              value={editPrice}
              onChange={(e) => {
                setEditPrice(e.target.value);
              }}
              className="edit-record-description"
            />
          </div>
          <div className="items">
            <Button className="close-button" onClick={editProduct}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default EditBookDetails;
