import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 49.232951,
  lng: -123.103353,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function GoogleMaps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });

  const [libraries, setLibraries] = React.useState([]);
  const [selectedLibrary, setSelectedLibrary] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost:5050/libraries`).then((response) => {
      setLibraries(response.data);
      console.log(response.data);
    });
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div className="App" style={{ width: "200vh", height: "100vh" }}>
      <Locate panTo={panTo}/>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {libraries.map((library) => (
          <Marker
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
              <p>{selectedLibrary.address}</p>
              <p>{selectedLibrary.region}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
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
export default GoogleMaps;
