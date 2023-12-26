import { FC, useState } from "react";
import styles from "./currentfilms.module.scss";
import { useLocation } from "react-router-dom";
import {
  useCreators,
  useCurrentFilm,
  useMoney,
  useSeasons,
  useTrailer,
  useWhereToWatch,
} from "../../queries/queries";

export const CurrentFilm: FC = () => {
  const location = useLocation();
  const filmId: number = location.state;
  const { currentFilmData, loadingCurrentFilm } = useCurrentFilm(filmId);
  const { seasonsData, loadingSeasons } = useSeasons(filmId);
  const { creatorsData, loadingCreators } = useCreators(filmId);
  const directors = creatorsData?.slice(0, 1);
  const actors = creatorsData
    ?.slice(0, 10)
    .filter((actor) => actor.professionText === "Актеры");
  const { moneyData, loadingMoney } = useMoney(filmId);
  const { whereWatchData, loadingWhereWatch } = useWhereToWatch(filmId);
  const { trailerData, loadingTrailer } = useTrailer(filmId);
  const trailer = trailerData?.items.filter((el) => el.site === "YOUTUBE")[0];

  const [visibleLinks, setVisibleLinks] = useState(false);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "BUDGET":
        return "Бюджет";
      case "RUS":
        return "Сборы в России";
      case "USA":
        return "Сборы в США";
      case "MARKETING":
        return "Маркетинг";
      case "WORLD":
        return "Сборы в мире";
      default:
        return "";
    }
  };
  //функция для преобразования числа из 10000 в 10 000
  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  if (
    loadingCurrentFilm &&
    loadingCreators &&
    loadingMoney &&
    loadingTrailer &&
    loadingWhereWatch &&
    loadingSeasons
  ) {
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
                <img
                  src={currentFilmData.posterUrl}
                  alt=""
                  className={styles.poster}
                />
                {!!trailer && (
                  <div>
                    <a href={trailer?.url}>
                      <div className={styles.trailer}>
                        <img src={currentFilmData.coverUrl} alt="" />
                        <svg
                          className={styles.trailer__play}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                      </div>
                    </a>
                    <p>{trailer?.name}</p>
                  </div>
                )}
              </div>
              <div className={styles.info_middle}>
                <div className={styles.info_title}>
                  <h2>{currentFilmData.nameRu}</h2>
                  <span>{currentFilmData.ratingKinopoisk}</span>
                </div>
                <h3>{currentFilmData.nameOriginal}</h3>

                {!!whereWatchData?.total && (
                  <div className={styles.where_to_watch}>
                    <div>
                      <p>Где смотреть</p>

                      {!visibleLinks ? (
                        <svg
                          onClick={() => setVisibleLinks(!visibleLinks)}
                          className="feather feather-chevron-down"
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
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => setVisibleLinks(!visibleLinks)}
                          className="feather feather-chevron-up"
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
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      )}
                    </div>
                    {visibleLinks && (
                      <ul>
                        {whereWatchData?.items.map((el) => {
                          return (
                            <li key={el.platform}>
                              <img
                                src={el.logoUrl}
                                alt=""
                                className={styles.watchlogo}
                              />
                              <a href={el.url}>{el.platform}</a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
                <h4>
                  {currentFilmData.type === "FILM" ? "О фильме" : "О сериале"}
                </h4>

                <dl className={styles.info_table}>
                  <div className={styles.table_element}>
                    <dt>Год производства </dt>
                    {seasonsData?.total ? (
                      <dd>
                        {currentFilmData.year} ({seasonsData.total} сезонов)
                      </dd>
                    ) : (
                      <dd>{currentFilmData.year} </dd>
                    )}
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
                  {!!currentFilmData.slogan && (
                    <div className={styles.table_element}>
                      <dt>Слоган</dt>
                      <dd>{currentFilmData.slogan}</dd>
                    </div>
                  )}
                  <div className={styles.table_element}>
                    <dt>Режиссер</dt>
                    <dd>{`${directors
                      ?.map((director) => director.nameRu)
                      .join(", ")}...`}</dd>
                  </div>

                  {!!moneyData?.total && (
                    <div>
                      {moneyData.items.map((item) => (
                        <div className={styles.table_element} key={item.type}>
                          <dt>{getTypeLabel(item.type)}</dt>
                          <dd>$ {formatNumber(item.amount)}</dd>
                        </div>
                      ))}
                    </div>
                  )}

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
              {!!actors?.length && (
                <div className={styles.info_right}>
                  <h5>В главных ролях</h5>
                  <ul className={styles.actors}>
                    {actors.map((actor) => {
                      return (
                        <li key={actor.nameRu} className={styles.actor}>
                          {actor.nameRu}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
