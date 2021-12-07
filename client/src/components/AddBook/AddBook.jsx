import React from "react";
import "./AddBook.scss";
import x from "../../Assets/Icons/close_black_24dp.svg";

function AddBook(props) {
  return (
    <div className="addWrapper">
      <section className="addBook">
        {props.allLibraries && (
          <>
            <h2 className="addBook__title">
              Add a book?{" "}
              <img
                onClick={props.cancelAddOption}
                className="close"
                src={x}
                alt="close"
              />
            </h2>
            <form className="addBook__form" onSubmit={props.addBookInfo}>
              <label className="addBook__form--label">
                Title
                <input
                  className="addBook__form--input"
                  type="text"
                  name="title"
                  placeholder="Book Title.."
                  required
                ></input>
              </label>

              <label className="addBook__form--label">
                Author
                <input
                  className="addBook__form--input"
                  type="text"
                  name="author"
                  placeholder="Book Author.."
                  required
                ></input>
              </label>
              <label className="addBook__form--label">
                Comment
                <textarea
                  className="addBook__form--input text-area"
                  type="text"
                  name="comment"
                  placeholder="Why do you want to share.."
                  required
                ></textarea>
              </label>

              <label className="addBook__form--label">
                Library
                <select
                  className="addBook__form--input"
                  name="library"
                  defaultValue={props.activeLibrary.id}
                  required
                >
                  {props.allLibraries.map((libraries) => {
                    return (
                      <option key={libraries.id} value={libraries.id}>
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

export default AddBook;
