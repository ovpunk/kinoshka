import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { useQueries } from "@tanstack/react-query";
import { imagesFetch } from "../../api/api";
import styles from "./topslider.module.scss";
import { usePremierFilmsQuery } from "../../queries/queries";
import { Link } from "react-router-dom";

export const TopSlider = () => {
  const { premierFilmsData } = usePremierFilmsQuery();
  //берем 4 премьеры для слайдов
  const premiers = premierFilmsData?.items.slice(6, 10);
  //запросы на получение больших изображений для слайдера
  const imageQueries =
    premiers?.map((premier) => ({
      queryKey: ["getImages", premier.kinopoiskId],
      queryFn: async () => {
        const res = await imagesFetch(premier.kinopoiskId);
        if (res.ok) {
          const response = await res.json();
          return response;
        }
        return [];
      },
    })) || [];

  const imageResults = useQueries({
    queries: imageQueries,
  });

  //Проверка загрузились ли изображения
  const isLoading = imageResults.every((result) => result.isLoading);

  return (
    <Swiper
      modules={[Pagination, Navigation, EffectFade, Autoplay]}
      className={styles.swiper}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {premiers &&
        !isLoading &&
        premiers.map((premier, i) => {
          const imageUrl = imageResults[i]?.data?.items?.[0]?.imageUrl;
          return (
            <SwiperSlide key={premier.kinopoiskId}>
              <div className={styles.slide_content}>
                <img src={imageUrl} alt="" />
                <p className={styles.title}>{premier.nameRu}</p>
                <p className={styles.info}>
                  {`
                  ${premier.year},
                  ${premier.countries
                    .map((country) => country.country)
                    .join(", ")}, ${premier.genres
                    .map((genre) => genre.genre)
                    .join(", ")}.
                  `}
                </p>
                <Link
                  to={`/film/${premier.kinopoiskId}`}
                  state={premier.kinopoiskId}
                >
                  <p className={styles.link_btn}>Подробнее</p>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
