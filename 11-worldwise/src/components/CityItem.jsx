import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({
  city: {
    cityName,
    date,
    emoji,
    id,
    position: { lat, lng },
  },
}) {
  const { currentCity } = useCities();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
