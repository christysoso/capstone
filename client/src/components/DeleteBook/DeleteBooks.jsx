import React from "react";
import "./DeleteBooks.scss";
import axios from "axios";
import x from "../../Assets/Icons/close_black_24dp.svg";

function DeleteBook(props) {
    console.log(props);

    
  return (
    <section className="delete">
      <div className="delete__container">
        <h2 className="delete__title">Take this book? <img onClick={()=>{
            props.cancelDeleteOption();
        }} src={x} alt="close" className="close" /></h2>

        <p className="delete__info">
          Are you ready to take {props.selectedItem.title} by {props.selectedItem.author} with you?
        </p>

        <p className="delete__button" onClick={()=>{
            props.deleteBook(props.selectedItem.id, props.selectedItem.library_id)
        }}>Take Book</p>
       
      </div>
    </section>
  );
}

export default DeleteBook;
