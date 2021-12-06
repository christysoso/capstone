import React from "react";
import { Link } from "react-router-dom";
import "./BookListBooks.scss";

export default function BookListBooks(props){
    return(
<li className="bookList__container" key={props.book.id}>
          <div className="bookList__top">
            <div className="bookList__headers">
              <h3 className="bookList__header">Book</h3>
              <h4 className="bookList__info">{props.book.title}</h4>
            </div>
            <div className="bookList__headers">
              <h3 className="bookList__header">Author</h3>
              <h4 className="bookList__info">{props.book.author}</h4>
            </div>
          </div>

          <div className="bookList__headers">
            <h3 className="bookList__header">Available At</h3>
            <h4 className="bookList__info">
              {props.book.address}, {props.book.region}
            </h4>
          </div>

          <div className="bookList__btn">
            <Link to={`/libraries/${props.book.library_id}`}>
              <p className="bookList__location">See Location</p>
            </Link>
          </div>
        </li>
    )
};

