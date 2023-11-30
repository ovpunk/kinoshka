import { useQuery } from "@tanstack/react-query";
import { filmPremieresFetch, topFilmsFetch, topSeriesFetch } from "../api/api";

export interface IFilms {
  items: {
    countries: { country: string }[];
    duration: string | number;
    genres: { genre: string }[];
    kinopoiskId: number;
    nameRu: string;
    posterUrl: string;
    posterUrlPreview: string;
    premiereRu: string;
    year: number;
    ratingKinopoisk?: number;
    type?: string;
  }[];
  total: number;
}

export const usePremierFilmsQuery = () => {
  const { data: premierFilmsData } = useQuery<IFilms>({
    queryKey: ["getPremierFilms"],
    queryFn: async () => {
      const res = await filmPremieresFetch();
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return {
    premierFilmsData,
  };
};

export const useTopFilms = () => {
  const { data: topFilmsData } = useQuery<IFilms>({
    queryKey: ["getTopFilms"],
    queryFn: async () => {
      const res = await topFilmsFetch();
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return {
    topFilmsData,
  };
};

export const useTopSeries = () => {
  const { data: topSeriesData } = useQuery<IFilms>({
    queryKey: ["getTopSeries"],
    queryFn: async () => {
      const res = await topSeriesFetch();
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return {
    topSeriesData,
  };
};
