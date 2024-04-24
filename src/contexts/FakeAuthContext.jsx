import { createContext, useContext, useReducer } from "react";

// create a auth
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return console.error("the unknown  state is found");
  }
};

//fake user data
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
// create the provider
const AuthProvider = ({ children }) => {
  //create state
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };
  const logout = () => {
    console.log("ete asche");
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//consume the provider
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("The auth is outside of the context");
  }
  return context;
};

export { AuthProvider, useAuth };
