import React from "react";
import "./LibrariesBooksPage.scss";
import axios from "axios";
import GoogleMaps from "../../components/GoogleMaps/GoogleMaps";

class LibrariesBooksPage extends React.Component {
  state = {
    activeLibrary: null,
    bookList: [],
  };

  componentDidMount() {
    const libraryId = this.props.match.params.id;
    console.log(libraryId);
    axios
      .get(`http://localhost:5050/libraries/${libraryId}`)
      .then((response) => {
        return response.data;
      })
      .then((res) => {
        axios
          .get(`http://localhost:5050/libraries/${libraryId}/books`)
          .then((response) => {
            this.setState({
              activeLibrary: res,
              bookList: response.data,
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevProps.bookList.length !== this.state.bookList.length) {
      const libraryId = this.props.match.params.id;
      axios
        .get(`http://localhost:5050/libraries/${libraryId}/books`)
        .then((response) => {
          this.setState({
            bookList: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    //   sessionStorage.setItem("currentPage", "libraryId");

    console.log(this.state.activeLibrary);
    return (
      <>
        {this.state.activeLibrary && (
          <div>
            <div>Library:{this.state.activeLibrary[0].name}</div>
            <div>
              Address:{this.state.activeLibrary[0].address},{" "}
              {this.state.activeLibrary[0].region}{" "}
            </div>
            <div>Description:{this.state.activeLibrary[0].description}</div>
          </div>
        )}
        <div className="books__wrapper">
          {this.state.bookList.map((book) => {
            return (

                <li key={book.id}>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.comment}</p>
                </li>
            
            );
          })}
        </div>
      </>
    );
  }
}

export default LibrariesBooksPage;
