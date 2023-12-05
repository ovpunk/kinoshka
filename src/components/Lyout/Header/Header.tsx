import { Link } from "react-router-dom";
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
              <li>Главное</li>
              <li>Фильмы</li>
              <li>Сериалы</li>
              <li>Поиск</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
