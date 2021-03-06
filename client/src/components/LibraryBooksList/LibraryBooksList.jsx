import React from "react";
import "./LibraryBooksList.scss";

function LibraryBooksList(props) {
  return (
    <>
      <li className="books__container" key={props.book.id}>
        <div className="books__wrap">
          <div className="books__header">
            <h3 className="books__header--info">Book Title</h3>
            <h4 className="books__header--details">{props.book.title}</h4>
          </div>

          <div className="books__header">
            <h3 className="books__header--info">Author</h3>
            <h4 className="books__header--details">{props.book.author}</h4>
          </div>
        </div>

        <div className="books__header">
          <h3 className="books__header--info">Why I'm Sharing</h3>
          <h4 className="books__header--details">{props.book.comment}</h4>
        </div>

        <div className="books__btnWrapper">
          <p
            className="books__delete"
            onClick={() => {
              props.updateDeleteOption(true, props.book);
            }}
          >
            Take Book
          </p>
        </div>
      </li>
    </>
  );
}

export default LibraryBooksList;
