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
  const {fetchStart, fetchSuccess, fetchError, showMessage } = useContext(CommonContext);
  
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
      fetchError(error.response.data.messages[0])
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

  const SignUp = async ({nombre, identificacion_usuario, correo_electronico, clave, redirect}) => {
    const body = {nombre, identificacion_usuario, correo_electronico, clave};
    try {
      fetchStart();
      const res = await api.post('usuarios', body);
      if(res.status === 201){
        fetchSuccess();
        showMessage([res.data.mensajes[0], res.data.mensajes[1]]);
        redirect();
      }
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
    window.location.replace('/');
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      SignUp,
      loadUser,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}