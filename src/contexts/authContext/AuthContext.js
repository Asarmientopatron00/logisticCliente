import React, { createContext, useContext, useReducer } from "react"
import api from "../../api/api";
import { CommonContext } from "../commonContext/commonContext";
import { authReducer } from "./authReducer";

const initialState = {
  status: 'nauth',
  access_token: null,
  user: null,
}

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {fetchStart, fetchSuccess, fetchError } = useContext(CommonContext);
  
  const signIn = async ({username, password, setAuth, navigate}) => {
    const body = {username, password};
    try {
      fetchStart();
      const res = await api.post('users/token', body);
      fetchSuccess();
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      dispatch({
        type: 'signIn',
        payload: res.data
      });
      dispatch(loadUser(setAuth, navigate));
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes)
    }
  }

  const loadUser = async (setAuth, navigate) => {
    try {
      const res = await api.get('users/current/session');
      dispatch({
        type: 'getSession',
        payload: res.data
      })
      setAuth(true);
      navigate('/');
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes)
    }
  }

  const logOut = () => {
    dispatch({
      type: 'logout'
    });
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      loadUser,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}