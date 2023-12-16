const apiKey = import.meta.env.VITE_API_KEY;

const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const currentMonthIndex = new Date().getMonth();
const currentMonthName = months[currentMonthIndex];

export const filmPremieresFetch = () => {
  return fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=${currentMonthName}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};

export const imagesFetch = (id: string | number) => {
  return fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=STILL&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};

export const newFilmsFetch = (page: number) => {
  return fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=2023&yearTo=3000&page=${page}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};

export const topFilmsFetch = (page: number) => {
  return fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${page}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};

export const topSeriesFetch = (page: number) => {
  return fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=${page}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};
