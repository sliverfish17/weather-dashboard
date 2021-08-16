import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ModalMap from "./Modal/ModalMap";
import { fetchWeather } from "../../redux/actions/places";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map() {
  const [map, setMap] = React.useState(null);

  const [modal, setModalActive] = useState(false);

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const data = useSelector((state: RootStateOrAny) => state.weatherInfo.cache);

  const cache = data.map((e) => {
    return [e.lat, e.lon];
  });

  console.log(cache);

  function cacheCheck([lat, lon]) {}

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

  const onClick = (e) => {
    const chosenLat = e.latLng.lat();
    const chosenLong = e.latLng.lng();
    cacheCheck([chosenLat, chosenLong]);
    dispatch(fetchWeather(chosenLat, chosenLong));
    toggleModal();
  };

  const center = location;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("geolocation not supported");
    }

    function success(position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    function error(msg) {
      alert("error: " + msg);
    }
  }, [navigator.geolocation]);

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
