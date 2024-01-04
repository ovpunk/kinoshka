import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import { useEffect, useRef, useState } from "react";
import { useClickOutSide } from "../../../hooks/useClickOutside";
import { useAppDispatch } from "../../../hooks/hooks";
import { useDebounce } from "../../../hooks/useDebounce";
import { changeSearchValue } from "../../../redux/slices/searchSlice";
import { useSearch } from "../../../queries/queries";

export const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const { searchData, loadingSearch } = useSearch(debounceValue);
  const foundMovies = searchData?.films.slice(0, 10);
  console.log(foundMovies);
  const dispatch = useAppDispatch();
  const [field, setField] = useState(false);
  const fieldref = useRef<HTMLInputElement | null>(null);

  useClickOutSide(fieldref, () => {
    if (field) setTimeout(() => setField(false), 50);
  });

  useEffect(() => {
    if (field) {
      dispatch(changeSearchValue(debounceValue));
    }
  }, [debounceValue, dispatch, field]);

  //console.log("searchData", searchData);
  console.log("loadingSearch", loadingSearch);
  //console.log(debounceValue);
  return (
    <header>
      <div className="container">
        <div className={styles.header}>
          <Link to={"/"}>
            <div className={styles.logo}>
              <p>
                <span>К</span>иношка
              </p>
            </div>
          </Link>
          {!field ? (
            <nav className={styles.nav}>
              <ul>
                <li>
                  <NavLink to={"/"}>Главное</NavLink>
                </li>

                <li>
                  <NavLink to={"/collections"}>Коллекции</NavLink>
                </li>

                <li>
                  <svg
                    onClick={() => setField(true)}
                    enableBackground="new 0 0 32 32"
                    id="Glyph"
                    version="1.1"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                      id="XMLID_223_"
                    />
                  </svg>
                </li>
              </ul>
            </nav>
          ) : (
            <div className={styles.search_wrapper}>
              <input
                ref={fieldref}
                type="text"
                placeholder="Введите запрос"
                className={styles.search_input}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              {debounceValue && foundMovies?.length ? (
                <div className={styles.search_result}>
                  {foundMovies?.length &&
                    foundMovies.map((film) => (
                      <Link
                        key={film.filmId}
                        to={`/film/${film.filmId}`}
                        state={film.filmId}
                      >
                        <div className={styles.found_movie}>
                          <img
                            src={film.posterUrl}
                            alt=""
                            className={styles.found_movie__img}
                          />
                          <div className={styles.found_movie__info}>
                            <p className={styles.found_movie__title}>
                              {film.nameRu}
                            </p>
                            <div>
                              {film.rating !== "null" && (
                                <span
                                  className={`${styles.rating} ${
                                    film.rating && Number(film.rating) > 8
                                      ? styles.highRating
                                      : film.rating && Number(film.rating) > 7
                                      ? styles.mediumRating
                                      : styles.lowRating
                                  }`}
                                >
                                  {film.rating}
                                </span>
                              )}
                              <p>{film.year}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
