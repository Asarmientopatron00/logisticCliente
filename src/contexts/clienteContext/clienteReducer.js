export const  clienteReducer = (state, action) => {
  switch (action.type) {
    case "getList":
      return {
        ...state,
        rows: action.payload.datos,
        desde: action.payload.desde,
        hasta: action.payload.hasta,
        por_pagina: action.payload.por_pagina,
        pagina_actual: action.payload.pagina_actual,
        ultima_pagina: action.payload.ultima_pagina,
        total: action.payload.total,
      }

    case "getLighList": 
      return {
        ...state,
        ligera: action.payload.data,
      }

    default:
      return state;
  }
}