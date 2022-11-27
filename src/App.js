import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Bodega from './components/Bodega';
import Cliente from './components/Cliente';
import Navigation from './components/Navigation';
import PedidoTerrestre from './components/PedidoTerrestre';
import TipoProductoTerrestre from './components/TipoProductoTerrestre';
import Vehiculo from './components/Vehiculo';
import { AuthProvider } from './contexts/authContext/AuthContext';
import { BodegaProvider } from './contexts/bodegaContext/BodegaContext';
import { ClienteProvider } from './contexts/clienteContext/ClienteContext';
import { CommonProvider } from './contexts/commonContext/commonContext';
import { PedidoTerrestreProvider } from './contexts/pedidoTerrestreContext/PedidoTerrestreContextContext';
import { TipoProductoTerrestreProvider } from './contexts/tipoProductoTerrestreContext/TipoProductoTerrestreContext';
import { VehiculoProvider } from './contexts/vehiculoContext/VehiculoContext';

const App = () => {
  return (
    <AppState>
      <Navigation/>
      <Routes>
        <Route exact path='/' element={<Cliente />}/>
        <Route exact path='/bodegas' element={<Bodega />}/>
        <Route exact path='/tipos-productos-terrestres' element={<TipoProductoTerrestre />}/>
        <Route exact path='/vehiculos' element={<Vehiculo />}/>
        <Route exact path='/pedidos-terrestres' element={<PedidoTerrestre />}/>
      </Routes>
    </AppState>
  )
}

const AppState = ({children}) => {
  return (
    <AuthProvider>
      <CommonProvider>
        <ClienteProvider>
          <BodegaProvider>
            <TipoProductoTerrestreProvider>
              <VehiculoProvider>
                <PedidoTerrestreProvider>
                  {children}
                </PedidoTerrestreProvider>
              </VehiculoProvider>
            </TipoProductoTerrestreProvider>
          </BodegaProvider>
        </ClienteProvider>
      </CommonProvider>
    </AuthProvider>
  );
}

export default App;