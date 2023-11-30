const apiKey = import.meta.env.VITE_API_KEY;

export const filmPremieresFetch = () => {
  return fetch(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=NOVEMBER",
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

export const topFilmsFetch = () => {
  return fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=FILM&ratingFrom=8&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};

export const topSeriesFetch = () => {
  return fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=TV_SERIES&ratingFrom=8&ratingTo=10&yearFrom=1000&yearTo=3000&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};
