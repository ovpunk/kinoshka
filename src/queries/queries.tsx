import { useQuery } from "@tanstack/react-query";
import {
  filmPremieresFetch,
  newFilmsFetch,
  topFilmsFetch,
  topSeriesFetch,
} from "../api/api";

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
  totalPages?: number;
}

export interface INewFilms {
  newFilmsData: IFilms | undefined;
  loadingNewFilms: boolean;
}

export interface ITopFilms {
  topFilmsData: IFilms | undefined;
  loadingTopFilms: boolean;
}

export interface ITopSeries {
  topSeriesData: IFilms | undefined;
  loadingTopSeries: boolean;
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

export const useNewFilms = (page: number): INewFilms => {
  const { data: newFilmsData, isLoading: loadingNewFilms } = useQuery<IFilms>({
    queryKey: ["getNewFilms", page],
    queryFn: async () => {
      const res = await newFilmsFetch(page);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return {
    newFilmsData,
    loadingNewFilms,
  };
};

export const useTopFilms = (page: number): ITopFilms => {
  const { data: topFilmsData, isLoading: loadingTopFilms } = useQuery<IFilms>({
    queryKey: ["getTopFilms", page],
    queryFn: async () => {
      const res = await topFilmsFetch(page);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return {
    loadingTopFilms,
    topFilmsData,
  };
};

export const useTopSeries = (page: number): ITopSeries => {
  const { data: topSeriesData, isLoading: loadingTopSeries } = useQuery<IFilms>(
    {
      queryKey: ["getTopSeries", page],
      queryFn: async () => {
        const res = await topSeriesFetch(page);
        if (res.ok) {
          const response = await res.json();
          return response;
        }
        return [];
      },
    }
  );
  return {
    loadingTopSeries,
    topSeriesData,
  };
};
