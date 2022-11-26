import React, { createContext, useContext, useReducer } from "react"
import api from "../../api/api";
import { CommonContext } from "../commonContext/commonContext";
import { clienteReducer } from "./clienteReducer";

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

export const ClienteContext = createContext();

export const ClienteProvider = ({children}) => {
  const [state, dispatch] = useReducer(clienteReducer, initialState);
  const {fetchStart, fetchSuccess, showMessage, fetchError } = useContext(CommonContext);
  
  const getList = async ({
    page, 
    rowsPerPage,
    name
  }) => {
    try {
      fetchStart();
      const res = await api.get('clientes', {
        params: {
          page,
          limite: rowsPerPage,
          nombre: name??''
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
      fetchError(error);
    }
  }

  const getLightList = async () => {
    try {
      fetchStart();
      const res = await api.get('clientes', {
        params: {
          ligera: true
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
      fetchError(error);
    }
  }

  const onShow = async (id) => {
    try {
      fetchStart();
      const res = await api.get('clientes/'+id);
      if(res.status === 200){
        fetchSuccess();
      }
    } catch (error) {
      console.log(error)
      fetchError(error);
    }
  }

  const onCreate = async (params, handleOnClose, refresh) => {
    try {
      fetchStart();
      const res = await api.post('clientes', params);
      if(res.status === 201){
        fetchSuccess();
        handleOnClose();
        refresh();
        showMessage([res.data.mensajes[0], res.data.mensajes[1]]);
      }
    } catch (error) {
      console.log(error)
      fetchError(error);
    }
  }

  const onUpdate = async (params, handleOnClose, refresh) => {
    try {
      fetchStart();
      const res = await api.put('clientes/'+params.id, params);
      if(res.status === 200){
        fetchSuccess();
        handleOnClose();
        refresh();
        showMessage([res.data.mensajes[0], res.data.mensajes[1]]);
      }
    } catch (error) {
      console.log(error)
      fetchError(error);
    }
  }

  const onDelete = async (id) => {
    try {
      fetchStart();
      const res = await api.delete('clientes/'+id);
      if(res.status === 200){
        fetchSuccess();
        showMessage([res.data.mensajes[0], res.data.mensajes[1]]);
      }
    } catch (error) {
      console.log(error)
      fetchError(error);
    }
  }

  return (
    <ClienteContext.Provider value={{
      ...state,
      getList,
      getLightList,
      onShow,
      onCreate,
      onUpdate,
      onDelete
    }}>
      {children}
    </ClienteContext.Provider>
  );
}