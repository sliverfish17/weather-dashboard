export type TTemp = {
  temp: {
    max: number;
  };
  dt: number;
}[];

export type TDaily = {
  daily: {
    temp: {
      max: number;
    };
    dt: number;
  };
}[];

export type TCache = {
  lat: number;
  lon: number;
  daily: { dt: number }[];
}[];

export type TState = {
  weatherInfo: {
    cache: TCache;
  };
};

export type TUser = {
  userInfo: {
    loggedIn: boolean;
    user: {}[];
  }[];
};
