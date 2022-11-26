import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cliente from './components/Cliente';
import { AuthProvider } from './contexts/authContext/AuthContext';
import { ClienteProvider } from './contexts/clienteContext/ClienteContext';
import { CommonProvider } from './contexts/commonContext/commonContext';

const App = () => {
  return (
    <AppState>
      <Routes>
        <Route exact path='/' element={<Cliente />}/>
      </Routes>
    </AppState>
  )
}

const AppState = ({children}) => {
  return (
    <AuthProvider>
      <CommonProvider>
        <ClienteProvider>
          {children}
        </ClienteProvider>
      </CommonProvider>
    </AuthProvider>
  );
}

export default App;