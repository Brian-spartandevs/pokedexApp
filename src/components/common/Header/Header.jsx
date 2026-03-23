import { Link } from 'react-router-dom';
import styles from './Header.module.css';

/**
 * Barra de navegación superior con temática Pokédex.
 * Responsabilidad: renderizar la cabecera de la aplicación.
 */
const Header = () => (
  <header className={styles.header}>
    <div className={styles.header__inner}>
      <div className={styles.header__leds}>
        <span className={`${styles.header__led} ${styles['header__led--blue']}`} />
        <div className={styles.header__leds_small}>
          <span className={`${styles.header__led} ${styles['header__led--red']}`} />
          <span className={`${styles.header__led} ${styles['header__led--yellow']}`} />
          <span className={`${styles.header__led} ${styles['header__led--green']}`} />
        </div>
      </div>

      <div className={styles.header__divider} />

      <Link to="/" className={styles.header__brand}>
        <span className={styles.header__title}>Pokédex</span>
        <span className={styles.header__subtitle}>Edición Nacional</span>
      </Link>
    </div>
  </header>
);

export default Header;
