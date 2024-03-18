import React from "react";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
const CityList = ({ cities, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message={"Lets add some favorite place to visit"} />;
  }
  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id}></CityItem>
      ))}
    </div>
  );

  //   return (
  //     <div className={styles.cityList}>
  //       {isLoading ? (
  //         <Spinner />
  //       ) : (
  //         cities.map((city) => <CityItem city={city} key={city.id}></CityItem>)
  //       )}
  //     </div>
  //   );
};

export default CityList;
