import React from "react";
import "./AddBook.scss";
import axios from "axios";
import x from "../../Assets/Icons/close_black_24dp.svg";

class AddBook extends React.Component {
//   state = {
//     allLibraries: null,
//     activeBooks: null,
//   };

//   addBookInfo = (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const title = form.title.value;
//     const author = form.author.value;
//     const comment = form.comment.value;
//     const library = this.state.allLibraries.find(
//       (libraries) => Number(form.library.value) === libraries.id
//     );
//         console.log(library);
        
//     axios
//       .post(`http://localhost:5000/books`, {
//         title: title,
//         author: author,
//         comment: comment,
//         library_id: Number(library.id)
//       })
//       .then((response) => {
//           this.SetState({
//             bookList:response.data
//           })
        
//       })
//       .catch((error)=>{
//           console.log(error);
//       });
//   };

//   componentDidMount() {
//     axios
//       .get(`http://localhost:5000/libraries`)
//       .then((response) => {
//         this.setState({
//           allLibraries: response.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
 
  render() {
   
    
    return (
      <div className="addWrapper">
      <section className="addBook">
        {this.props.allLibraries && (
          <>
           <h2 className="addBook__title">Add a book? <img onClick={this.props.cancelAddOption} className="close" src={x} alt="close"/></h2>
            <form className="addBook__form" onSubmit={this.props.addBookInfo}>
             
              <label className="addBook__form--label">
                Title
                <input className="addBook__form--input"
                  type="text"
                  name="title"
                  placeholder="Book Title.."
                  required
                ></input>
              </label>

              <label className="addBook__form--label">
                Author
                <input className="addBook__form--input"
                  type="text"
                  name="author"
                  placeholder="Book Author.."
                  required
                ></input>
              </label>
              <label className="addBook__form--label">
                Comment
                <textarea className="addBook__form--input text-area"
                  type="text"
                  name="comment"
                  placeholder="Why do you want to share.."
                  required
                ></textarea>
              </label>

              <label className="addBook__form--label">
                Library
                <select className="addBook__form--input" name="library" defaultValue={this.props.activeLibrary.id} required>
                  {this.props.allLibraries.map((libraries) => {
                    return (
                      <option  key={libraries.id} value={libraries.id} >
                        {libraries.name}
                      </option>
                    );
                  })}
                </select>
              </label>

              <button className="addBook__form--btn">+ Add Book</button>
             
            </form>
          </>
        )}
      </section>
      </div>
    );
  }
}

export default AddBook;
