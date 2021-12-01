import React from "react";
import "./BookListPage.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";


function BookListPage() {
  const [books, setBooks] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    axios.get(`http://localhost:5000/books/info/info`).then((response) => {
      setBooks(response.data);
      console.log(response.data);
    });
  }, []);


//   searchSubmit = (event)=> {
//       event.preventDefault();
//       setSearchTerm(event.target.search.value);
//   };
  

   


  //   state = {
  //     allBooks: [],
  //     allLibraries: [],
  //   };

  //   componentDidMount() {
  //     axios
  //       .get(`http://localhost:5050/books`)
  //       .then((response) => {
  //         this.setState({
  //           allBooks: response.data,
  //         });
  //         console.log(response.data.map((id) => id.library_id));
  //         return response.data.map((id) => id.library_id);
  //       })
  //       .then((res) => {
  //         axios.get(`http://localhost:5050/libraries/`).then((res) => {
  //           this.setState({
  //             allLibraries: res.data,
  //           });
  //         });
  //       });
  //   }

  return (
    <section className="books">
        <Header isLibraryActive={false} isBookActive={true}/>

        <form>
      <input
        type="text"
        placeholder="search.."
        name="search"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>

      <button></button>

</form>

      <ul className="bookList">

        {books
          .filter((book) => {
            if (searchTerm == "") {
              return book;
            } else if (book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) { return book;
            } 
          })
          .map((book) => {
              
            return (
              <li className="bookList__container" key={book.id}>
                <div className="bookList__headers">
                  <h1 className="bookList__header">Author: {book.author}</h1>
                  <p className="bookList__name">Book:{book.title}</p>
                </div>

                <div className="bookList__headers">
                  <h1 className="bookList__header">Available At:</h1>
                  <p className="bookList__name">{book.address}</p>
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

export default BookListPage;
