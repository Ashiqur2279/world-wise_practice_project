import React from "react";
// import { myContext } from "../App";
import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const CountryList = () => {
  // const { cities, isLoading } = useContext(myContext);
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message={`You haven't add any city yet`} />;
  }
  // console.log(cities);
  let countries = cities.reduce((array, city) => {
    if (!array.map((name) => name.country).includes(city.country)) {
      return [
        ...array,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    } else return array;
  }, []);
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </div>
  );
};

export default CountryList;
