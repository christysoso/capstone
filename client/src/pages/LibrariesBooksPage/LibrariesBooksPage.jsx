import React from "react";
import "./LibrariesBooksPage.scss";
import axios from "axios";
import LibraryBooksList from "../../components/LibraryBooksList/LibraryBooksList";
import GoogleMaps from "../../components/GoogleMaps/GoogleMaps";
import Header from "../../components/Header/Header";
import DeleteBook from "../../components/DeleteBook/DeleteBooks";
import address from "../../Assets/Icons/icons8-address-48.png";
class LibrariesBooksPage extends React.Component {
  state = {
    activeLibrary: null,
    bookList: [],
    isDisplayModal: false,
    modalInfo: null,
  };

  updateDeleteOption = (status, book) => {
    this.setState({ isDisplayModal: status, modalInfo: book });
  };

  cancelDeleteOption = () => {
    this.setState({ isDisplayModal: false });
  };

  deleteBook = (id, libraryID) => {
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then((response) => {
        return axios.get(`http://localhost:5050/libraries/${libraryID}/books`);
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          bookList: response.data,
          isDisplayModal: false,
        });
        return alert("Thanks for taking this book!");
      })
      .catch((error) => {
        console.log(error);
      });
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
    //   sessionStorage.setItem("currentPage", "libraryI");

    return (
      <>
        <Header isLibraryActive={true} isBookActive={false} />

        {this.state.activeLibrary && (
          <article className="library">
            <div className="library__header">
              <h1 className="library__header--title">Welcome to</h1>
              <h2 className="library__header--info">
                {this.state.activeLibrary[0].name}
              </h2>
            </div>

            <div className="library__info">
              <div className="library__info--header">
                <h3 className="library__info--about">
                  Address{" "}
                  <img src={address} alt="address icon" className="icon" />
                </h3>
                <h4 className="library__info--detail">
                  {this.state.activeLibrary[0].address},{" "}
                  {this.state.activeLibrary[0].region}
                </h4>
              </div>

              <div className="library__info--header">
                <h3 className="library__info--about">About</h3>
                <h4 className="library__info--detail">
                  {this.state.activeLibrary[0].description}
                </h4>
              </div>
            </div>

            {this.state.isDisplayModal && (
              <DeleteBook
                selectedItem={this.state.modalInfo}
                cancelDeleteOption={this.cancelDeleteOption}
                deleteBook={this.deleteBook}
              />
            )}
          </article>
        )}

        <div className="books">

            <h1 className="books__header">Book List</h1>
          {this.state.bookList.map((book) => {
            return (
                
            //   <li key={book.id}>
            //     <p>Book:{book.title}</p>
            //     <p>Author:{book.author}</p>
            //     <p>Comment:{book.comment}</p>

            //     <p
            //       onClick={() => {
            //         this.updateDeleteOption(true, book);
            //       }}
            //     >
            //       Take Book
            //     </p>
           // </li>

            <LibraryBooksList key={book.id} book={book} updateDeleteOption={this.updateDeleteOption}/>
              
            );
          })}
        </div>
      </>
    );
  }
}

export default LibrariesBooksPage;
