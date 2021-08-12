import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../redux/actions/currentPlace";
import ModalMap from "./Modal/ModalMap";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 50.450001,
  lng: 30.523333,
};

function Map() {
  const [map, setMap] = React.useState(null);

  const [modal, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive((store) => !store);
  };

  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDKUOTYFRX-klXSpKZ5ZzLt56AveLg6jGg",
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onClick = (e: any) => {
    toggleModal();
    const chosenLat = e.latLng.lat();
    const chosenLong = e.latLng.lng();
    dispatch(fetchWeather(chosenLat, chosenLong));
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
    >
      <>
        {modal && (
          <ModalMap active={modal} setModalActive={setModalActive}></ModalMap>
        )}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
