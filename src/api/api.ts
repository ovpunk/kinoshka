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
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1`,
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
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=1`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
    }
  );
};
