// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import { useUrlPosition } from "../hooks/useUrlPosition";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  if (countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

function Form() {
  const [city, setCity] = useState({});
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [emoji, setEmoji] = useState(null);
  const [isLoadingGeoCoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(() => {
    if (!lat && !lng) {
      return;
    }
    (async () => {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        // console.log(data);
        setCity(data);
      } catch (error) {
        console.log(
          `there is an error to fetch the city data. The error is`,
          error
        );
      } finally {
        setIsLoadingGeocoding(false);
      }
    })();
  }, [lat, lng]);

  useEffect(() => {
    // if (!city.countryCode) {
    //   throw new Error(
    //     "The city details is not found. Try to choose another city."
    //   );
    //   }
    try {
      if (city.countryCode) {
        setCityName(city.city || city.locality || "");
        setCountry(city.countryName);
        setEmoji(convertToEmoji(city.countryCode));
        setGeoCodingError("");
      } else {
        throw new Error(
          "The city details is not found. Please, try to select another one😊"
        );
      }
    } catch (error) {
      // console.log(error.message);
      setGeoCodingError(error.message);
    }
  }, [city]);

  // console.log(city);
  // console.log(emoji);

  // console.log(geoCodingError);

  //return code........................................................

  if (isLoadingGeoCoding) {
    <Spinner />;
  }
  if (!lat && !lng) {
    return <Message message="Please click somewhere on the map" />;
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          // type="date"
          // onChange={(e) => setDate(new Date(e.target.value))}
          // value={date.toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
