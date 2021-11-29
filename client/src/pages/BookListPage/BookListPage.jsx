import React from "react";
import "./BookListPage.scss";
import axios from "axios";

function BookListPage() {
  const [books, setBooks] = React.useState([]);
  const [library, setLibrary] = React.useState([]);


  React.useEffect(() => {
    axios.get(`http://localhost:5050/books`).then((response) => {
      setBooks(response.data);
      console.log(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(`http://localhost:5050/libraries`).then((response) => {
      setLibrary(response.data);
      console.log(response.data);
    });
  }, []);






  return (
    <section className="books">
      <ul className="bookList">
        {/* {libraries.map((library) => (
          <Marker
            key={library.id}
            position={{ lat: library.lat, lng: library.lng }}
            onClick={() => {
              setSelectedLibrary(library);
            }}
          />
        ))} */}

        {books.map((book) => {
            return(
          <li className="bookList__container" key={book.id}>
            <div className="bookList__headers">
              <h1 className="bookList__header">Author</h1>
              <p className="bookList__name">{book.title}</p>
            </div>

            <div className="bookList__headers">
              <h1 className="bookList__header">Available At:</h1>
              <p className="bookList__name">address</p>
            </div>


            <p className="bookList__location">See Location</p>



          </li>
            )
        })}
        
      </ul>
    </section>
  );
}

export default BookListPage;
