import React from "react";
import "./DeleteBooks.scss";
import axios from "axios";

function DeleteBook(props) {
    console.log(props);

    
  return (
    <section className="delete">
      <div className="delete__container">
        <h2 className="delete__title">Take this book?</h2>

        <p className="delete__info">
          Are you ready to take {props.selectedItem.title} by {props.selectedItem.author} with you?
        </p>

        <p onClick={()=>{
            props.deleteBook(props.selectedItem.id, props.selectedItem.library_id)
        }}>Take Book</p>
        <p onClick={()=>{
            props.cancelDeleteOption();
        }}>Cancel</p>
      </div>
    </section>
  );
}

export default DeleteBook;
