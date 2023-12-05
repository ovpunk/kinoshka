import { useLocation } from "react-router-dom";
import styles from "./newfilms.module.scss";
import { IFilms } from "../../queries/queries";

export const NewFilms = () => {
  const location = useLocation();
  const { query, title } = location.state || {}; // Получаем пропсы из объекта состояния

  const MyQuery = query as IFilms;
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h1>{title}</h1>

        <div className={styles.films}>
          {MyQuery.items.map((film) => {
            return (
              <div key={film.kinopoiskId} className={styles.item}>
                <img src={film.posterUrl} alt="" />
                <p>{film.nameRu}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
