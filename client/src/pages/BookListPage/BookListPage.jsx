import React from "react";
import "./BookListPage.scss";
import axios from "axios";
import { Link } from "react-router-dom";

class BookListPage extends React.Component {
  //   const [books, setBooks] = React.useState([]);
  //   const [library, setLibrary] = React.useState([]);

  //   React.useEffect(() => {
  //     axios.get(`http://localhost:5050/books`).then((response) => {
  //       setBooks(response.data);
  //       console.log(response.data);
  //     });
  //   }, []);

  //   React.useEffect(() => {
  //     axios.get(`http://localhost:5050/libraries`).then((response) => {
  //       setLibrary(response.data);
  //       console.log(response.data);
  //     });
  //   }, []);

  state = {
    allBooks: [],
    allLibraries: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5050/books`)
      .then((response) => {
        this.setState({
          allBooks: response.data,
        });
        console.log(response.data.map((id) => id.library_id));
        return response.data.map((id) => id.library_id);
      })
      .then((res) => {
        axios.get(`http://localhost:5050/libraries/`).then((res) => {
          this.setState({
            allLibraries: res.data,
          });
        });
      });
  }

  render() {
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

          {this.state.allBooks.map((book) => {
            return (
              <li className="bookList__container" key={book.id}>
                <div className="bookList__headers">
                  <h1 className="bookList__header">Author</h1>
                  <p className="bookList__name">{book.title}</p>
                </div>

                <div className="bookList__headers">
                  <h1 className="bookList__header">Available At:</h1>
                  <p className="bookList__name">address</p>
                </div>

                <Link to={`/libraries/${book.library_id}`}>
                  <p className="bookList__location">See Location</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default BookListPage;
