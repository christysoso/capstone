import React from "react";
import "./LibrariesPage.scss";
import axios from "axios";
import GoogleMaps from "../../components/GoogleMaps/GoogleMaps";
import { Link } from "react-router-dom";


function LibrariesPage() {
    // const [books, setBooks] = React.useState([]);
    const [library, setLibrary] = React.useState([]);
  
  
    // React.useEffect(() => {
    //   axios.get(`http://localhost:5050/books`).then((response) => {
    //     setBooks(response.data);
    //     console.log(response.data);
    //   });
    // }, []);
  
    React.useEffect(() => {
      axios.get(`http://localhost:5000/libraries`).then((response) => {
        setLibrary(response.data);
        console.log(response.data);
      });
    }, []);
  

    return (
      <section className="libraries">
        <GoogleMaps />
      </section>
    );
  }
  
  export default LibrariesPage;
  