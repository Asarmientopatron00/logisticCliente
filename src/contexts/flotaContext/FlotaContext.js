import React, { createContext, useContext, useReducer } from "react"
import api from "../../api/api";
import { CommonContext } from "../commonContext/commonContext";
import { flotaReducer } from "./flotaReducer";

const initialState = {
  rows: [],
  light: [],
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
}

export const FlotaContext = createContext();

export const FlotaProvider = ({children}) => {
  const [state, dispatch] = useReducer(flotaReducer, initialState);
  const {fetchStart, fetchSuccess, showMessage, fetchError } = useContext(CommonContext);
  
  const getList = async ({
    page, 
    rowsPerPage,
    name
  }) => {
    try {
      fetchStart();
      const res = await api.get('flotas', {
        params: {
          page,
          limite: rowsPerPage,
          numero: name??''
        }
      });
      if(res.status === 200){
        fetchSuccess();
        dispatch({
          type: 'getList',
          payload: res.data
        });
      }
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes);
    }
  }

  const getLightList = async () => {
    try {
      fetchStart();
      const res = await api.get('flotas', {
        params: {
          ligera: true
        }
      });
      if(res.status === 200){
        fetchSuccess();
        dispatch({
          type: 'getLightList',
          payload: res.data
        });
      }
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes);
    }
  }

  const onShow = async (id) => {
    try {
      fetchStart();
      const res = await api.get('flotas/'+id);
      if(res.status === 200){
        fetchSuccess();
      }
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes);
    }
  }

  const onCreate = async (params, handleOnClose, refresh) => {
    try {
      fetchStart();
      const res = await api.post('flotas', params);
      if(res.status === 201){
        fetchSuccess();
        handleOnClose();
        refresh();
        showMessage([res.data.mensajes[0], res.data.mensajes[1]]);
      }
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes);
    }
  }

  const onUpdate = async (params, handleOnClose, refresh) => {
    try {
      fetchStart();
      const res = await api.put('flotas/'+params.id, params);
      if(res.status === 200){
        fetchSuccess();
        handleOnClose();
        refresh();
        showMessage([res.data.mensajes[0], res.data.mensajes[1]]);
      }
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes);
    }
  }

  const onDelete = async (id) => {
    try {
      fetchStart();
      const res = await api.delete('flotas/'+id);
      if(res.status === 200){
        fetchSuccess();
        showMessage([res.data.mensajes[0], res.data.mensajes[1]]);
      }
    } catch (error) {
      console.log(error)
      fetchError(error.response.data.mensajes);
    }
  }

  return (
    <FlotaContext.Provider value={{
      ...state,
      getList,
      getLightList,
      onShow,
      onCreate,
      onUpdate,
      onDelete
    }}>
      {children}
    </FlotaContext.Provider>
  );
}