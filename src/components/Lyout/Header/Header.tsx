import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.logo}>
            <p>
              <span>К</span>иношка
            </p>
          </div>
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
