export type DailyT = {
  daily: {
    dt: number;
    temp: { max: number };
  }[];
};

export type InitT = {
  cache: {
    daily: { dt: number; temp: { max: number } }[];
    lat: number;
    lon: number;
  }[];
};
