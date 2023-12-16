import { useLocation } from "react-router-dom";
import styles from "./newfilms.module.scss";
import {
  //IFilms,
  INewFilms,
  ITopFilms,
  ITopSeries,
  useNewFilms,
  useTopFilms,
  useTopSeries,
} from "../../queries/queries";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App";

export const NewFilms = () => {
  const { page, setPage } = useContext(AppContext);
  console.log("page", page);
  const location = useLocation();
  useEffect(() => {
    setPage(1);
  }, [setPage]);
  const { title, type } = location.state || {}; // Получаем пропсы из объекта состояния

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
              <div key={film.kinopoiskId} className={styles.item}>
                <img src={film.posterUrl} alt="" />
                <p>{film.nameRu}</p>
                <p>{film.ratingKinopoisk}</p>
              </div>
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
              <div key={film.kinopoiskId} className={styles.item}>
                <img src={film.posterUrl} alt="" />
                <p>{film.nameRu}</p>
                <p>{film.ratingKinopoisk}</p>
              </div>
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
                <div key={film.kinopoiskId} className={styles.item}>
                  <img src={film.posterUrl} alt="" />
                  <p>{film.nameRu}</p>
                  <p>{film.ratingKinopoisk}</p>
                </div>
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
