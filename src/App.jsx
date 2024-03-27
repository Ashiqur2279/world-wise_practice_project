import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./component/City";
import CityList from "./component/CityList";
import CountryList from "./component/CountryList";
import Form from "./component/Form";
import { CityProvider } from "./contexts/CitiesContext";
import AppLayout from "./pages/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

// const BASE_URL = "http://localhost:9000";
// export const myContext = createContext();

function App() {
  return (
    <>
      {/* <myContext.Provider value={propsData}> */}
      <BrowserRouter>
        {/* <Header /> */}
        <CityProvider>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to={"cities"} />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </CityProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
