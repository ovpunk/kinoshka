import { useQuery } from "@tanstack/react-query";
import {
  creatorsFetch,
  currentFilmFetch,
  filmPremieresFetch,
  moneyFetch,
  newFilmsFetch,
  seasonsFetch,
  topFilmsFetch,
  topSeriesFetch,
  trailerFetch,
  whereToWatchFetch,
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

export interface ICurrentFilm {
  countries: { country: string }[];
  coverUrl: string;
  description: string;
  filmLength: number;
  genres: { genre: string }[];
  has3D: boolean;
  kinopoiskId: number;
  nameRu: string;
  nameOriginal: string;
  posterUrl: string;
  ratingAgeLimits: string;
  ratingKinopoisk: number;
  serial: boolean;
  slogan: string;
  shortDescription: string;
  type: string;
  webUrl: string;
  year: number;
}

interface ICreator {
  nameRu: string;
  professionText: string;
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

export const useCurrentFilm = (id: number) => {
  const { data: currentFilmData, isLoading: loadingCurrentFilm } =
    useQuery<ICurrentFilm>({
      queryKey: ["getCurrentFilm", id],
      queryFn: async () => {
        const res = await currentFilmFetch(id);
        if (res.ok) {
          const response = await res.json();
          return response;
        }
        return [];
      },
    });
  return {
    currentFilmData,
    loadingCurrentFilm,
  };
};

export const useCreators = (id: number) => {
  const { data: creatorsData, isLoading: loadingCreators } = useQuery<
    ICreator[]
  >({
    queryKey: ["getCreators", id],
    queryFn: async () => {
      const res = await creatorsFetch(id);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return { creatorsData, loadingCreators };
};
type TMoneyIndicators = {
  amount: number;
  symbol: string;
  type: string;
};
interface IMoney {
  items: TMoneyIndicators[];
  total: number;
}

export const useMoney = (id: number) => {
  const { data: moneyData, isLoading: loadingMoney } = useQuery<IMoney>({
    queryKey: ["getMoney", id],
    queryFn: async () => {
      const res = await moneyFetch(id);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return { moneyData, loadingMoney };
};

type TTrailer = {
  name: string;
  site: string;
  url: string;
};
interface ITrailer {
  items: TTrailer[];
  total: number;
}

export const useTrailer = (id: number) => {
  const { data: trailerData, isLoading: loadingTrailer } = useQuery<ITrailer>({
    queryKey: ["getTrailer", id],
    queryFn: async () => {
      const res = await trailerFetch(id);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return { trailerData, loadingTrailer };
};

type TWhereToWatch = {
  logoUrl: string;
  platform: string;
  url: string;
};

interface IWhereToWatch {
  items: TWhereToWatch[];
  total: number;
}

export const useWhereToWatch = (id: number) => {
  const { data: whereWatchData, isLoading: loadingWhereWatch } =
    useQuery<IWhereToWatch>({
      queryKey: ["getWhereWatch", id],
      queryFn: async () => {
        const res = await whereToWatchFetch(id);
        if (res.ok) {
          const response = await res.json();
          return response;
        }
        return [];
      },
    });
  return { whereWatchData, loadingWhereWatch };
};

interface ISeasons {
  total: number;
}

export const useSeasons = (id: number) => {
  const { data: seasonsData, isLoading: loadingSeasons } = useQuery<ISeasons>({
    queryKey: ["getSeasons", id],
    queryFn: async () => {
      const res = await seasonsFetch(id);
      if (res.ok) {
        const response = await res.json();
        return response;
      }
      return [];
    },
  });
  return { seasonsData, loadingSeasons };
};
