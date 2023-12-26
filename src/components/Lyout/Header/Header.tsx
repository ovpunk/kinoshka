import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";

export const Header = () => {
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
          <nav className={styles.nav}>
            <ul>
              <li>
                <NavLink to={"/"}>Главное</NavLink>
              </li>
              {/*<li>
                <NavLink to={"/films"}>Фильмы</NavLink>
              </li>
              <li>
                <NavLink to={"/tvseries"}>Сериалы</NavLink>
              </li>*/}
              <li>
                <NavLink to={"/collections"}>Коллекции</NavLink>
              </li>
              <li>Поиск</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
