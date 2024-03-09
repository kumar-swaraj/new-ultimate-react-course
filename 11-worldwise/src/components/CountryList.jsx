import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
import styles from './CountryList.module.css';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the Map" />
    );

  const countries = cities.reduce(
    (acc, cur) =>
      acc.map((el) => el.country).includes(cur.country)
        ? acc
        : [...acc, { country: cur.country, emoji: cur.emoji }],
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
