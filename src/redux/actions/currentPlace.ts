import axios from "axios";
import { Dispatch } from "react";

export const setWeather = (weather: object) => ({
  type: "SET_WEATHER",
  payload: weather,
});

export const fetchWeather =
  (lat: string, lon: string) => (dispatch: Dispatch<any>) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=af918003566c01882ca4d94c4bf8bbb0&units=metric`
      )
      .then(({ data }) => {
        dispatch(setWeather(data));
      });
  };
