import axios from "axios";
import { Dispatch } from "react";

export const setNewWeather = (cache: object) => ({
  type: "SET_WEATHER",
  payload: cache,
});

export const fetchNewWeather =
  (lat: number, lon: number) => (dispatch: Dispatch<object>) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f1892e726a46ed26fb925a16d58c408d&units=metric`
      )
      .then(({ data }) => {
        dispatch(setNewWeather(data));
      });
  };
