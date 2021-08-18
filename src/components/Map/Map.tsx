import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import ModalMap from "./Modal/ModalMap";
import { fetchNewWeather } from "../../redux/actions/places";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map() {
  const [map, setMap] = useState(null);

  const [modal, setModalActive] = useState(false);

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const [current, setCurrent] = useState(null);

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

  const toggleModal = () => {
    setModalActive((store) => !store);
  };

  const outsideClick = (e) => {
    if (e.target.className === "modal active") {
      setModalActive(false);
      setCurrent(null);
    }
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
    if (e.latLng && data) {
      toggleModal();
      const chosenLat: number = e.latLng.lat();
      const chosenLong: number = e.latLng.lng();
      if (data.length === 0) {
        dispatch(fetchNewWeather(chosenLat, chosenLong));
      } else {
        for (let i = 0; i < data.length; i++) {
          const cached = data[i];
          const difference = distance(
            { lan: cached.lat, lon: cached.lon },
            { lan: chosenLat, lon: chosenLong }
          );
          if (difference <= 30) {
            setCurrent(cached.daily);
            break;
          } else if (difference > 30 && i === data.length - 1) {
            dispatch(fetchNewWeather(chosenLat, chosenLong));
            setCurrent(data[i].daily);
            break;
          }
        }
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
  }, []);

  useEffect(() => {
    if (data.length === 1) {
      setCurrent(data[0].daily);
    }
  }, [data]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
    >
      <>
        {modal && (
          <ModalMap
            data={current}
            active={modal}
            outsideClick={outsideClick}
          ></ModalMap>
        )}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
