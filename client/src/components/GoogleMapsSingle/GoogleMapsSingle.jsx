import React from "react";
import "./GoogleMapsSingle.scss";
import libraryIcon from "../../Assets/Icons/icons8-book-shelf-48.png";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { Link } from "react-router-dom";
import locate from "../../Assets/Icons/icons8-globe-48.png";

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

function GoogleMapsSingle(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });

  const [selectedLibrary, setSelectedLibrary] = React.useState(null);

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
    // <div className="googleMaps">
    <>
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
            icon={{
              url: libraryIcon,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            key={props.activeLibrary.id}
            position={{
              lat: props.activeLibrary.lat,
              lng: props.activeLibrary.lng,
            }}
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
    </>
  );
}

function Locate({ panTo }) {
  return (
    // <div className="locateWrap">
    <button
      className="singleLocate"
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
      <img className="panImg" src={locate} alt="locate button" />
    </button>
    // </div>
  );
}
export default GoogleMapsSingle;
