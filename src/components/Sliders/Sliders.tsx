import { FC } from "react";
import styles from "./sliders.module.scss";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
register();
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IFilms } from "../../queries/queries";

interface ISlidersProps {
  props: IFilms | undefined;
}

export const Sliders: FC<ISlidersProps> = ({ props }) => {
  const filteredFilms = props?.items.filter((film) =>
    film.genres.every((genre) => genre.genre.toLowerCase() !== "мультфильм")
  );

  const films = filteredFilms?.slice(5, 15);

  return (
    <>
      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation
        spaceBetween={30}
        slidesPerView={5}
      >
        {films &&
          films.map((film) => {
            return (
              <SwiperSlide key={film.kinopoiskId}>
                <div className={styles.slider_item}>
                  <div className={styles.wrapper}>
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
              </SwiperSlide>
            );
          })}
        {films && (
          <SwiperSlide>
            <div className={styles.slider_item}>
              <div className={styles.img_wrapper}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm28,0A13,13,0,1,0,16,29,13,13,0,0,0,29,16Z" />
                    <path d="M12.13,21.59,17.71,16l-5.58-5.59a1,1,0,0,1,0-1.41h0a1,1,0,0,1,1.41,0l6.36,6.36a.91.91,0,0,1,0,1.28L13.54,23a1,1,0,0,1-1.41,0h0A1,1,0,0,1,12.13,21.59Z" />
                  </g>
                </svg>
              </div>
              <p>Посмотреть все</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};
