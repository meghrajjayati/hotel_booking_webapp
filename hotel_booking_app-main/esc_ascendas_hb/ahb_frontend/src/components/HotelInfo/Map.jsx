import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function MyComponent(props) {
  const containerStyle = {
    width: props.width,
    height: props.height,
  };
  const center = {
    lat: props.lat,
    lng: props.long,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUtqIAknQRAaBH8nTRas3119A3NXKcIJs",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={{ lat: props.lat, lng: props.long }} key={0} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
