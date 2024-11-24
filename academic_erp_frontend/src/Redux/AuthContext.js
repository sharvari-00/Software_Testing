import React, { createContext, useContext, useEffect, useReducer } from "react";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };
    case "INITIALIZE":
      return action.payload;
    default:
      return state;
  }
};

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = createStore(persistedAuthReducer);
export const persistor = persistStore(store);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("authState"));
    if (storedState && storedState.isAuthenticated) {
      dispatch({ type: "INITIALIZE", payload: storedState });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
