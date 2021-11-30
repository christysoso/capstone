import React from "react";
import "./AddBook.scss";
import axios from "axios";

class AddBook extends React.Component {
  state = {
    allLibraries: null,
    activeBooks: null,
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
        console.log(library);
        
    axios
      .post(`http://localhost:5050/books`, {
        title: title,
        author: author,
        comment: comment,
        library_id: Number(library.id)
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error)=>{
          console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5050/libraries`)
      .then((response) => {
        this.setState({
          allLibraries: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.allLibraries);
    return (
      <section>
        {this.state.allLibraries && (
          <>
            <form onSubmit={this.addBookInfo}>
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  placeholder="Book Title.."
                ></input>
              </label>

              <label>
                Author
                <input
                  type="text"
                  name="author"
                  placeholder="Book Author.."
                ></input>
              </label>
              <label>
                Comment
                <input
                  type="text"
                  name="comment"
                  placeholder="Why do you want to share.."
                ></input>
              </label>

              <label>
                Library
                <select name="library">
                  {this.state.allLibraries.map((libraries) => {
                    return (
                      <option key={libraries.id} value={libraries.id}>
                        {libraries.name}
                      </option>
                    );
                  })}
                </select>
              </label>

              <button>Add Book</button>
            </form>
          </>
        )}
      </section>
    );
  }
}

export default AddBook;
