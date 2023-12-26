import { Link, useLocation } from "react-router-dom";
import styles from "./content.module.scss";
import {
  INewFilms,
  ITopFilms,
  ITopSeries,
  useNewFilms,
  useTopFilms,
  useTopSeries,
} from "../../queries/queries";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";

export const Content = () => {
  const { page, setPage } = useContext(AppContext);
  useEffect(() => {
    setPage(1);
  }, [setPage]);
  const location = useLocation();
  const { title, type } = location.state || { title: "", type: "" }; // Получаем пропсы из объекта состояния

  let hookResult;

  if (type === "newfilms") {
    hookResult = useNewFilms;
  } else if (type === "topfilms") {
    hookResult = useTopFilms;
  } else if (type === "topseries") {
    hookResult = useTopSeries;
  }

  if (!hookResult) {
    return <p>Loading...</p>;
  }

  // Объявляем myQuery без указания типа
  let myQuery;

  // Добавляем условия для каждого значения type
  if (type === "newfilms") {
    myQuery = hookResult(page) as INewFilms;
  } else if (type === "topfilms") {
    myQuery = hookResult(page) as ITopFilms;
  } else {
    myQuery = hookResult(page) as ITopSeries;
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h1>{title}</h1>

        {myQuery && type === "newfilms" && (
          <div className={styles.films}>
            {(myQuery as INewFilms).newFilmsData?.items.map((film) => (
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
        {myQuery && type === "newfilms" && (
          <div className={styles.pagination}>
            {(myQuery as INewFilms).newFilmsData?.totalPages &&
              Array.from(
                {
                  length: ((myQuery as INewFilms).newFilmsData?.totalPages ||
                    0) as number,
                },
                (_, index) => (
                  <p
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={page === index + 1 ? styles.active : ""}
                  >
                    {index + 1}
                  </p>
                )
              )}
          </div>
        )}

        {myQuery && type === "topfilms" && (
          <div className={styles.films}>
            {(myQuery as ITopFilms).topFilmsData?.items.map((film) => (
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
        {myQuery && type === "topfilms" && (
          <div className={styles.pagination}>
            {(myQuery as ITopFilms).topFilmsData?.totalPages &&
              Array.from(
                {
                  length: ((myQuery as ITopFilms).topFilmsData?.totalPages ||
                    0) as number,
                },
                (_, index) => (
                  <p
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={page === index + 1 ? styles.active : ""}
                  >
                    {index + 1}
                  </p>
                )
              )}
          </div>
        )}

        {myQuery && type === "topseries" && (
          <div className={styles.films}>
            {(myQuery as ITopSeries).topSeriesData?.items.map((film) => {
              return (
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
              );
            })}
          </div>
        )}

        {myQuery && type === "topseries" && (
          <div className={styles.pagination}>
            {(myQuery as ITopSeries).topSeriesData?.totalPages &&
              Array.from(
                {
                  length: ((myQuery as ITopSeries).topSeriesData?.totalPages ||
                    0) as number,
                },
                (_, index) => (
                  <p
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={page === index + 1 ? styles.active : ""}
                  >
                    {index + 1}
                  </p>
                )
              )}
          </div>
        )}
      </div>
    </div>
  );
};
