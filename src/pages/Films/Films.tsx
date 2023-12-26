import { FC } from "react";
import { useFilteredFilms } from "../../queries/queries";
import styles from "./films.module.scss";
import { Link } from "react-router-dom";
export const Films: FC = () => {
  const { filteredFilmsData, loadingFilteredFilms } = useFilteredFilms();
  if (loadingFilteredFilms) {
    return <p>Loading.......</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.settings}>settings</div>
        <div className={styles.films}>
          {filteredFilmsData?.items.map((film) => (
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
      </div>
    </div>
  );
};
