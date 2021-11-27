import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import GoogleMaps from "./components/GoogleMaps/GoogleMaps";




function App() {
  

  return (
    <div className="App">
      
      <GoogleMaps />
    </div>
  );
}

export default App;
