import React from "react";
import Header from "../Header/Header";
import libraryIcon from "../../Assets/Icons/icons8-book-shelf-48.png";
import "./GoogleMaps.scss";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { Link } from "react-router-dom";

const mapContainerStyle = {
  width: "90vw",
  height: "50vh",
  borderRadius: "20px",
};

const center = {
  lat: 49.232951,
  lng: -123.103353,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function GoogleMaps(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });

  const [libraries, setLibraries] = React.useState([]);
  const [selectedLibrary, setSelectedLibrary] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/libraries`)
      .then((response) => {
        setLibraries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div className="googleMaps">
      <Header isLibraryActive={true} isBooksActive={false} />

      <article className="main">
        <h1 className="main__header">Welcome to NeighborBooks!</h1>
        <h3 className="main__info">
          Click on a bookshelf on the map to get started
        </h3>
      </article>

      <Locate panTo={panTo} />

      <div className="container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {libraries.map((library) => (
            <Marker
              icon={{
                url: libraryIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              key={library.id}
              position={{ lat: library.lat, lng: library.lng }}
              onClick={() => {
                setSelectedLibrary(library);
              }}
            />
          ))}

          {selectedLibrary && (
            <InfoWindow
              position={{ lat: selectedLibrary.lat, lng: selectedLibrary.lng }}
              onCloseClick={() => {
                setSelectedLibrary(null);
              }}
            >
              <div>
                <h4>{selectedLibrary.name}</h4>
              
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {selectedLibrary && (
        <section className="libraries">
          <div className="libraries__container">
            <div className="libraries__info">
              <div className="libraries__headers">
                <h2 className="libraries__header">Library</h2>
                <p className="libraries__details">{selectedLibrary.name}</p>
              </div>

              <div className="libraries__headers">
                <h2 className="libraries__header">Address</h2>
                <p className="libraries__details">
                  {selectedLibrary.address}, {selectedLibrary.region}
                </p>
              </div>

              <div className="libraries__btnWrapper">
                <Link className="link" to={`/libraries/${selectedLibrary.id}`}>
                  <p className="libraries__books">See Books</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null,
          options
        );
      }}
    >
      Locate
    </button>
  );
}
export default GoogleMaps;
