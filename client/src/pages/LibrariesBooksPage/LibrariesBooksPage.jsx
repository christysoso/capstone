import React from "react";
import "./LibrariesBooksPage.scss";
import axios from "axios";
import LibraryBooksList from "../../components/LibraryBooksList/LibraryBooksList";
import GoogleMaps from "../../components/GoogleMaps/GoogleMaps";
import Header from "../../components/Header/Header";
import DeleteBook from "../../components/DeleteBook/DeleteBooks";
import address from "../../Assets/Icons/icons8-address-48.png";
import GoogleMapsSingle from "../../components/GoogleMapsSingle/GoogleMapsSingle";
import AddBook from "../../components/AddBook/AddBook";

class LibrariesBooksPage extends React.Component {
  state = {
    activeLibrary: null,
    bookList: [],
    allLibraries: null,
    isDeleteDisplayModal: false,
    modalInfoDelete: null,

    isAddDisplayModal: false,
    modalInfoAdd: null,
  };

  updateDeleteOption = (status, book) => {
    this.setState({ isDeleteDisplayModal: status, modalInfoDelete: book });
  };

  updateAddOption = (status, library) => {
    this.setState({ isAddDisplayModal: status, modalInfoAdd: library });
  };

  cancelDeleteOption = () => {
    this.setState({ isDeleteDisplayModal: false });
  };

  cancelAddOption = () => {
    this.setState({ isAddDisplayModal: false });
  };

  deleteBook = (id, libraryID) => {
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then((response) => {
        return axios.get(`http://localhost:5000/libraries/${libraryID}/books`);
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          bookList: response.data,
          isDeleteDisplayModal: false,
        });
        return alert("Thanks for taking this book!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addBookInfo = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const comment = form.comment.value;
    const library = this.state.allLibraries.find(
      (libraries) => Number(form.library.value) === libraries.id
    );

    
    const libraryId = this.props.match.params.id;
        console.log(libraryId);

    axios
      .post(`http://localhost:5000/books`, {
        title: title,
        author: author,
        comment: comment,
        library_id: Number(library.id),
      })
      .then((response) => {
        axios.get(`http://localhost:5000/libraries/${libraryId}/books`)
      .then((result) => {
        console.log(result);
        this.setState({ bookList: result.data, isAddDisplayModal: false });
      })})
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const libraryId = this.props.match.params.id;
    console.log(libraryId);

    axios
      .get(`http://localhost:5000/libraries/${libraryId}`)
      .then((response) => {
        return response.data;
      })
      .then((res) => {
        axios
          .get(`http://localhost:5000/libraries/${libraryId}/books`)
          .then((response) => {
            this.setState({
              activeLibrary: res,
              bookList: response.data,
            });
          });
      })
      .then((response) => {
        axios.get(`http://localhost:5000/libraries`).then((result) => {
          this.setState({
            allLibraries: result.data,
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
        .get(`http://localhost:5000/libraries/${libraryId}/books`)
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
          <>
            <GoogleMapsSingle activeLibrary={this.state.activeLibrary[0]} />
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
            </article>
          </>
        )}

        <div className="books">
          {this.state.isAddDisplayModal && (
            <AddBook
              selectedItem={this.state.modalInfoAdd}
              cancelAddOption={this.cancelAddOption}
              allLibraries={this.state.allLibraries}
              addBookInfo={this.addBookInfo}
            />
          )}

          {this.state.isDeleteDisplayModal && (
            <DeleteBook
              selectedItem={this.state.modalInfoDelete}
              cancelDeleteOption={this.cancelDeleteOption}
              deleteBook={this.deleteBook}
            />
          )}

          <h1 className="books__header">Book List</h1>
          <p onClick={this.updateAddOption}>Add book</p>

          {this.state.bookList.map((book) => {
            return (
              <LibraryBooksList
                key={book.id}
                book={book}
                updateDeleteOption={this.updateDeleteOption}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default LibrariesBooksPage;
