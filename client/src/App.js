import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import BookListPage from "./pages/BookListPage/BookListPage";
import GoogleMaps from "./components/GoogleMaps/GoogleMaps";
import LoginPage from "./components/LoginPage/LoginPage";
import LibrariesPage from "./pages/LibrariesPage/LibrariesPage";
import LibrariesBooksPage from "./pages/LibrariesBooksPage/LibrariesBooksPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect exact from="/" to="/libraries" />
          <Route
            path="/books"
            exact
            render={(routerProps) => <BookListPage {...routerProps} />}
          />

          <Route
            path="/libraries"
            exact
            render={(routerProps) => <LibrariesPage {...routerProps} />}
          />
          <Route
            path="/libraries/:id"
            exact
            render={(routerProps) => <LibrariesBooksPage {...routerProps} />}
          />

        

          {/* <GoogleMaps /> */}
          {/* <LoginPage /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
