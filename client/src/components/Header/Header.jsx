import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { isLibraryActive, isBookActive } = props;
  return (
    <header className="header">
      <div className="header__logo">
        <h1 className="header__logo--name">NeighborBooks</h1>
      </div>

      <div className="header__container">
        <Link to="/libraries">
          <div className={`header__left ${
              isLibraryActive ? "header__left--library-active" : ""
            }`}>
            <h3 className="header__tab">Libraries</h3>
          </div>
        </Link>
        <Link to="/books">
          <div className={`header__right ${
              isBookActive ? "header__right--book-active" : ""
            }`}>
            <h3 className="header__tab">Books</h3>
          </div>
        </Link>
      </div>
    </header>
  );
}
