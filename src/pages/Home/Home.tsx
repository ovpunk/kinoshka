import styles from "./home.module.scss";
import { TopSlider } from "../../components/TopSlider/TopSlider";
import { Sliders } from "../../components/Sliders/Sliders";
import {
  usePremierFilmsQuery,
  useTopFilms,
  useTopSeries,
} from "../../queries/queries";
import { IFilms } from "../../queries/queries";
import { FC } from "react";

export interface ISlider {
  title: string;
  query: IFilms | undefined;
}

export const Home: FC = () => {
  const { premierFilmsData } = usePremierFilmsQuery();
  const { topFilmsData } = useTopFilms();
  const { topSeriesData } = useTopSeries();

  const arrSliders: ISlider[] = [
    {
      title: "Новинки",
      query: premierFilmsData,
    },
    {
      title: "Топ фильмов",
      query: topFilmsData,
    },
    {
      title: "Топ сериалов",
      query: topSeriesData,
    },
  ];

  return (
    <div className={styles.home}>
      <TopSlider />
      <div className="slides-container">
        <div className={styles.sliders}>
          {arrSliders.map((slider) => {
            return (
              <div key={slider.title}>
                <h2>{slider.title}</h2>
                <Sliders props={slider.query} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
