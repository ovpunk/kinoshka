import styles from "./home.module.scss";
import { TopSlider } from "../../components/TopSlider/TopSlider";
import { Sliders } from "../../components/Sliders/Sliders";
import {
  useNewFilms,
  //usePremierFilmsQuery,
  useTopFilms,
  useTopSeries,
} from "../../queries/queries";
import { IFilms } from "../../queries/queries";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";

export interface ISlider {
  title: string;
  query: IFilms | undefined;
  type: string;
}

export const Home: FC = () => {
  const { newFilmsData, loadingNewFilms } = useNewFilms();
  const { topFilmsData, loadingTopFilms } = useTopFilms();
  const { topSeriesData, loadingTopSeries } = useTopSeries();

  const arrSliders: ISlider[] = useMemo(
    () => [
      {
        title: "Новинки",
        query: newFilmsData,
        type: "newfilms",
      },
      {
        title: "Топ фильмов",
        query: topFilmsData,
        type: "topfilms",
      },
      {
        title: "Топ сериалов",
        query: topSeriesData,
        type: "topseries",
      },
    ],
    [newFilmsData, topFilmsData, topSeriesData]
  );

  //useEffect(() => {
  //  dispatch(setCollection(arrSliders));
  //}, [arrSliders, dispatch]);

  if (loadingNewFilms || loadingTopFilms || loadingTopSeries) {
    return <p>Загрузка...</p>;
  }
  return (
    <div className={styles.home}>
      <TopSlider />
      <div className="slides-container">
        <div className={styles.sliders}>
          {arrSliders.map((slider) => {
            return (
              <div key={slider.title}>
                <Link
                  to={`/${slider.type}`}
                  state={{ query: slider.query, title: slider.title }}
                >
                  <h2>{slider.title}</h2>
                </Link>
                <Sliders props={slider.query} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
