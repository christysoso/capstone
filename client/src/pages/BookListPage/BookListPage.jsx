import React from "react";
import "./BookListPage.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import search from "../../Assets/Icons/search_black_24dp.svg";
import booksImg from "../../Assets/Icons/icons8-books-48.png";
import BookListBooks from "../../components/BookListBooks/BookListBooks";

function BookListPage() {
  const [books, setBooks] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    axios.get(`http://localhost:5000/books/info/info`).then((response) => {
      setBooks(response.data);
      
    });
  }, []);

  const searchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.search.value);
  };

  const bookList = books
    .filter((book) => {
      if (searchTerm === "") {
        return book;
      } else if (
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return book;
      }
    })
    .map((book) => {
      return <BookListBooks key={book.id} book={book} />;
    });

  return (
    <>
      <Header isLibraryActive={false} isBookActive={true} />

      <article className="booksPage">
        <h2 className="booksPage__header">
          Looking for a book?
          <img className="booksPage__icon" src={booksImg} alt="books icon" />
        </h2>
        <p className="booksPage__info">
          It might be available at one of the libraries, use the search bar
          below to look for a title or by author to find out!
        </p>
      </article>

      <section className="bookSearch">
        
        <form className="bookSearch__search" onSubmit={searchSubmit}>
          <input
            className="bookSearch__search--input"
            type="text"
            placeholder="Search for a book..."
            name="search"
          />

          <button className="bookSearch__search--btn">
            <img
              className="bookSearch__search--icon"
              src={search}
              alt="search button"
            />
          </button>

          
        </form>
        <div className="bookSearch__search--bg">hello</div>
    
        <ul className="bookList">
          <h1 className="bookList__title">All Books ({bookList.length})</h1>
          {bookList.length > 0 ? bookList : "No books found"}
        </ul>
      </section>
    </>
  );
}

export default BookListPage;
