export const  authReducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        status: 'auth',
        access_token: action.payload.access_token,
      }

    case "getSession": 
      return {
        ...state,
        user: action.payload.usuario,
      }
    
    case "logout":
    case "notAuthenticated":
      return {
        ...state,
        status: "nauth",
        access_token: null,
        user: null
      }

    default:
      return state;
  }
}