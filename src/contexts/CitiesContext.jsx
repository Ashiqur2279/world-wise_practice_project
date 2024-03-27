import { createContext, useContext, useEffect, useState } from "react";

//create the context
const CitiesContext = createContext();

//base url
const BASE_URL = "http://localhost:9000";

//consume it
// eslint-disable-next-line react/prop-types
const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        const cities = data;
        // console.log(cities);
        setCities(cities);
      } catch (error) {
        console.log("the error was happen", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const PropsValue = {
    cities: cities,
    isLoading: isLoading,
  };
  return (
    //create the provider with value
    <CitiesContext.Provider value={PropsValue}>
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  // console.log(context);
  if (context === undefined)
    throw new Error(
      "you have tried to access the props outside of CityProvider."
    );
  return context;
}

export { CityProvider, useCities };
