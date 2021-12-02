import React from "react";
import "./GoogleMapsSingle.scss";
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
  borderRadius: "20px"

};

const center = {
  lat: 49.232951,
  lng: -123.103353,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function GoogleMapsSingle (props) {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    });
  
    // const [libraries, setLibraries] = React.useState([]);
    const [selectedLibrary, setSelectedLibrary] = React.useState(null);
    // const [libraryBooks, setLibraryBooks] = React.useState([]);
  
    // React.useEffect(() => {
    //   axios
    //     .get(`http://localhost:5000/libraries`)
    //     .then((response) => {
    //       setLibraries(response.data);
    //       return response.data[0].id;
    //       // return response.data.map((library) => library.id);
    //     })
    //     .then((response) => {
    //       axios
    //         .get(`http://localhost:5000/libraries/${response}/books`)
    //         .then((response) => {
    //           setLibraryBooks(response.data);
    //           console.log(response.data);
    //         });
    //     });
    // }, []);
  
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
    console.log(props.activeLibrary);
    return (
        
      <div className="googleMaps">
          
        <Locate panTo={panTo} />
  
          <div className="container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          
            <Marker
              key={props.activeLibrary.id}
              position={{ lat: props.activeLibrary.lat, lng: props.activeLibrary.lng} }
              onClick={() => {
                setSelectedLibrary(props.activeLibrary);
              }}
            />
          
  
          {selectedLibrary && (
            <InfoWindow
              position={{ lat: selectedLibrary.lat, lng: selectedLibrary.lng }}
              onCloseClick={() => {
                setSelectedLibrary(null);
              }}
            >
              <div>
                <h4>{selectedLibrary.name}</h4>
                <p>{selectedLibrary.address}</p>
                <p>{selectedLibrary.region}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
        </div>
  
      </div>
    );
  }
  
  function Locate({ panTo }) {
    return (
      <button
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
  export default GoogleMapsSingle;
  