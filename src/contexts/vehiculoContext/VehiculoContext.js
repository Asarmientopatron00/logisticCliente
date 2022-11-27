import React, { createContext, useContext, useReducer } from "react"
import api from "../../api/api";
import { CommonContext } from "../commonContext/commonContext";
import { vehiculoReducer } from "./vehiculoReducer";

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

export const VehiculoContext = createContext();

export const VehiculoProvider = ({children}) => {
  const [state, dispatch] = useReducer(vehiculoReducer, initialState);
  const {fetchStart, fetchSuccess, showMessage, fetchError } = useContext(CommonContext);
  
  const getList = async ({
    page, 
    rowsPerPage,
    name
  }) => {
    try {
      fetchStart();
      const res = await api.get('vehiculos', {
        params: {
          page,
          limite: rowsPerPage,
          placa: name??''
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
      const res = await api.get('vehiculos', {
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
      const res = await api.get('vehiculos/'+id);
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
      const res = await api.post('vehiculos', params);
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
      const res = await api.put('vehiculos/'+params.id, params);
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
      const res = await api.delete('vehiculos/'+id);
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
    <VehiculoContext.Provider value={{
      ...state,
      getList,
      getLightList,
      onShow,
      onCreate,
      onUpdate,
      onDelete
    }}>
      {children}
    </VehiculoContext.Provider>
  );
}