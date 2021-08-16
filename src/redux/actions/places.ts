import axios from "axios";
import { Dispatch } from "react";

export const setWeather = (cache: object) => ({
  type: "SET_WEATHER",
  payload: cache,
});

export const fetchWeather =
  (lat: string, lon: string) => (dispatch: Dispatch<object>) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f1892e726a46ed26fb925a16d58c408d&units=metric`
      )
      .then(({ data }) => {
        dispatch(setWeather(data));
      });
  };

export const fetchCachedWeather = (data) => (dispatch: Dispatch<object>) => {
  dispatch(setWeather(data));
};
