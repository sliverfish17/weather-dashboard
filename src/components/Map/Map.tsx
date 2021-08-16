import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ModalMap from "./Modal/ModalMap";
import { fetchCachedWeather, fetchWeather } from "../../redux/actions/places";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map() {
  const [map, setMap] = useState(null);

  const [modal, setModalActive] = useState(false);

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const [current, setCurrent] = useState([] as any);

  const data = useSelector((state: RootStateOrAny) => state.weatherInfo.cache);

  function distance(first, second) {
    const R = 6371;
    const rad1 = first.lan * (Math.PI / 180);
    const rad2 = second.lan * (Math.PI / 180);
    const latDifference = rad2 - rad1;
    const lonDifference = (second.lon - first.lon) * (Math.PI / 180);
    return (
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
            Math.cos(rad1) *
              Math.cos(rad2) *
              Math.sin(lonDifference / 2) *
              Math.sin(lonDifference / 2)
        )
      )
    );
  }

  function toRad(v) {
    return (v * Math.PI) / 180;
  }

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
    if (data.length === 0) {
      dispatch(fetchWeather(chosenLat, chosenLong));
      toggleModal();
    } else {
      for (let i = 0; i < data.length; i++) {
        const cached = data[i];

        const difference = distance(
          { lan: cached.lat, lon: cached.lon },
          { lan: chosenLat, lon: chosenLong }
        );
        console.log(difference);

        if (difference <= 100) {
          fetchCachedWeather(cached[i]);
          alert("cache");

          toggleModal();
          break;
        } else {
          dispatch(fetchWeather(chosenLat, chosenLong));
          toggleModal();
        }
        break;
      }
    }
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
