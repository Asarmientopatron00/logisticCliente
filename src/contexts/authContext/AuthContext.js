import React, { createContext, useReducer } from "react"
import api from "../../api/api";
import { authReducer } from "./authReducer";

const initialState = {
  status: 'nauth',
  access_token: null,
  user: null,
}

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  const signIn = ({username, password}) => {
    return async () => {
      const body = {username, password};
      try {
        const res = await api.post('users/token', body);
        const token = res.data.access_token;
        localStorage.setItem('token', token);
        dispatch({
          type: 'signIn',
          payload: res.data
        });
        dispatch(loadUser());
      } catch (error) {
        console.log(error)
      }
    }
  }

  const loadUser = () => {
    return async () => {
      try {
        const res = await api.get('users/current/session');
        dispatch({
          type: 'getSession',
          payload: res.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const logOut = () => {
    return () => {
      dispatch({
        type: 'logout'
      });
      localStorage.removeItem('token');
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}