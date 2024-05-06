import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

//create the context
const CitiesContext = createContext();

//base url
const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payLoad,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      throw new Error("Unknown action type");
  }
}

//consume it
// eslint-disable-next-line react/prop-types
const CityProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // console.log(cities);
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  //load all city data
  useEffect(() => {
    (async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        const cities = data;
        dispatch({ type: "cities/loaded", payLoad: cities });
      } catch (error) {
        dispatch({
          type: "rejected",
          payLoad: "there is an error to fetch the cities",
        });
      }
    })();
  }, []);

  //load a single city data
  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) {
        return;
      }

      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        isLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payLoad: data });
      } catch (Error) {
        dispatch({
          type: "rejected",
          payLoad: `There is a error to fetching City data`,
        });
      }
    },
    [currentCity.id]
  );

  const createCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payLoad: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payLoad: "there is an error to create a new city",
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payLoad: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payLoad: "there is an error to delete a city",
      });
    }
  };

  const PropsValue = {
    cities,
    isLoading,
    getCity,
    currentCity,
    createCity,
    deleteCity,
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
