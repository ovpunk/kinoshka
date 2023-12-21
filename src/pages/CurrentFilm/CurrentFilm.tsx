import { FC } from "react";
import styles from "./currentfilms.module.scss";
import { useLocation } from "react-router-dom";
import { useCreators, useCurrentFilm, useMoney } from "../../queries/queries";

export const CurrentFilm: FC = () => {
  const location = useLocation();
  const filmId: number = location.state;

  const { currentFilmData, loadingCurrentFilm } = useCurrentFilm(filmId);
  const { creatorsData, loadingCreators } = useCreators(filmId);
  //если это фильмы то отобразить бюджет и сборы, поправить отображение остальных данных в зависимости от наличия каждого.
  const { moneyData, loadingMoney } = useMoney(filmId);
  console.log(moneyData);
  //if (moneyData?.total) {
  //  console.log("ebat");
  //}
  const directors = creatorsData?.slice(0, 3);
  //console.log(currentFilmData);
  if (loadingCurrentFilm && loadingCreators && loadingMoney) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {!!currentFilmData && (
        <div className={styles.currentfilm}>
          <img
            src={
              currentFilmData.coverUrl
                ? currentFilmData.coverUrl
                : currentFilmData.posterUrl
            }
            alt=""
            className={styles.background}
          />

          <h2 className={styles.title}>{currentFilmData.nameRu}</h2>

          <div className="container">
            <div className={styles.info}>
              <div className={styles.info_left}>
                <img src={currentFilmData.posterUrl} alt="" />
                <p>трейлер</p>
              </div>
              <div className={styles.info_right}>
                <div className={styles.info_title}>
                  <h2>
                    {currentFilmData.nameRu}({currentFilmData.year})
                  </h2>
                  <span>{currentFilmData.ratingKinopoisk}</span>
                </div>
                <h3>{currentFilmData.nameOriginal}</h3>
                <h4>
                  {currentFilmData.type === "FILM" ? "О фильме" : "О сериале"}
                </h4>
                <dl className={styles.info_table}>
                  <div className={styles.table_element}>
                    <dt>Год производства</dt>
                    <dd>{currentFilmData.year}</dd>
                  </div>
                  <div className={styles.table_element}>
                    <dt>Страна</dt>
                    <dd>
                      {`${currentFilmData.countries
                        .map((country) => country.country)
                        .join(", ")}`}
                    </dd>
                  </div>
                  <div className={styles.table_element}>
                    <dt>Жанр</dt>
                    <dd>
                      {`${currentFilmData.genres
                        .map((genre) => genre.genre)
                        .join(", ")}`}
                    </dd>
                  </div>
                  <div className={styles.table_element}>
                    <dt>Слоган</dt>
                    <dd>{currentFilmData.slogan}</dd>
                  </div>
                  <div className={styles.table_element}>
                    <dt>Режиссер</dt>
                    <dd>{`${directors
                      ?.map((director) => director.nameRu)
                      .join(", ")}...`}</dd>
                  </div>
                  <div className={styles.table_element}>
                    <dt>Возраст</dt>
                    <dd>
                      {currentFilmData.ratingAgeLimits
                        ? currentFilmData.ratingAgeLimits.replace(/\D/g, "")
                        : 0}
                      +
                    </dd>
                  </div>
                  <div className={styles.table_element}>
                    <dt>Время</dt>
                    <dd>{currentFilmData.filmLength} мин</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
