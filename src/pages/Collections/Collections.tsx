import { FC, useEffect, useState } from "react";
import { useCollections } from "../../queries/queries";
import styles from "./collection.module.scss";
import { Link } from "react-router-dom";

export const Collections: FC = () => {
  const [collection, setCollection] = useState("TOP_POPULAR_ALL");
  const [page, setPage] = useState(1);
  const { collectionsData, loadingCollections } = useCollections(
    collection,
    page
  );
  useEffect(() => {
    setPage(1);
  }, [collection]);

  const collections = [
    { id: "TOP_POPULAR_ALL", label: "Все" },
    { id: "TOP_POPULAR_MOVIES", label: "Топ популярных фильмов" },
    { id: "TOP_250_TV_SHOWS", label: "Топ сериалов" },
    { id: "TOP_250_MOVIES", label: "Топ фильмов" },
    { id: "FAMILY", label: "Для семейного просмотра" },
    { id: "LOVE_THEME", label: "Про любовь" },
    { id: "CATASTROPHE_THEME", label: "Катастрофы" },
    { id: "KIDS_ANIMATION_THEME", label: "Мультфильмы" },
  ];

  const totalPages: number = (collectionsData?.totalPages as number) || 0;
  const pagesToShow = 10; // Количество страниц для отображения

  const generatePages = (currentPage: number, total: number): number[] => {
    const pagesArray: number[] = [];

    if (total <= pagesToShow) {
      // Если общее количество страниц меньше или равно количеству страниц для отображения,
      // отобразим все страницы
      return Array.from({ length: total }, (_, index) => index + 1);
    }
    let startPage = currentPage - Math.floor(pagesToShow / 2);
    startPage = Math.max(startPage, 1);
    let endPage = startPage + pagesToShow - 1;
    if (endPage > total) {
      // Если конечная страница превышает общее количество страниц,
      // установим конечную страницу в общее количество страниц
      endPage = total;
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  };
  const pages = generatePages(page, totalPages);

  return (
    <div className="container">
      <div className={styles.collections}>
        <ul>
          {collections.map((el) => (
            <li
              key={el.id}
              onClick={() => setCollection(el.id)}
              className={el.id === collection ? styles.active_collection : ""}
            >
              {el.label}
            </li>
          ))}
        </ul>
        <div className={styles.wrapper}>
          {loadingCollections ? (
            <p>Loading....</p>
          ) : (
            <div className={styles.films}>
              {collectionsData?.items.map((film) => (
                <Link
                  to={`/film/${film.kinopoiskId}`}
                  state={film.kinopoiskId}
                  key={film.kinopoiskId}
                >
                  <div className={styles.item}>
                    <div className={styles.poster}>
                      <img src={film.posterUrl} alt="" />
                      <span
                        className={`${styles.rating} ${
                          film.ratingKinopoisk && film.ratingKinopoisk > 8
                            ? styles.highRating
                            : film.ratingKinopoisk && film.ratingKinopoisk > 7
                            ? styles.mediumRating
                            : styles.lowRating
                        }`}
                      >
                        {film.ratingKinopoisk}
                      </span>
                    </div>
                    <p>{film.nameRu}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        <ul>
          {page > 1 && !loadingCollections && (
            <svg
              onClick={() => setPage(page - 1)}
              className="feather feather-chevron-left"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          )}
          {pages.map((num) => (
            <li
              onClick={() => setPage(num)}
              className={num === page ? styles.active_page : ""}
            >
              {num}
            </li>
          ))}
          {page < totalPages && !loadingCollections && (
            <svg
              onClick={() => setPage(page + 1)}
              className="feather feather-chevron-right"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </ul>
      </div>
    </div>
  );
};
