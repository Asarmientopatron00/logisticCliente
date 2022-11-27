import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Bodega from './components/Bodega';
import Cliente from './components/Cliente';
import Navigation from './components/Navigation';
import PedidoTerrestre from './components/PedidoTerrestre';
import TipoProductoTerrestre from './components/TipoProductoTerrestre';
import Vehiculo from './components/Vehiculo';
import { AuthProvider } from './contexts/authContext/AuthContext';
import { BodegaProvider } from './contexts/bodegaContext/BodegaContext';
import { PuertoProvider } from './contexts/puertoContext/PuertoContext';
import { ClienteProvider } from './contexts/clienteContext/ClienteContext';
import { CommonProvider } from './contexts/commonContext/commonContext';
import { PedidoTerrestreProvider } from './contexts/pedidoTerrestreContext/PedidoTerrestreContext';
import { TipoProductoTerrestreProvider } from './contexts/tipoProductoTerrestreContext/TipoProductoTerrestreContext';
import { VehiculoProvider } from './contexts/vehiculoContext/VehiculoContext';
import { TipoProductoMaritimoProvider } from './contexts/tipoProductoMaritimoContext/TipoProductoMaritimoContext';
import { FlotaProvider } from './contexts/flotaContext/FlotaContext';
import { PedidoMaritimoProvider } from './contexts/pedidoMaritimoContext/PedidoMaritimoContext';
import Puerto from './components/Puerto/Puerto';
import TipoProductoMaritimo from './components/TipoProductoMaritimo';
import Flota from './components/Flota';
import PedidoMaritimo from './components/PedidoMaritimo';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Header from './components/Header';

const App = () => {
  const [auth, setAuth] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!auth && location.pathname !== '/signin'){
      navigate('/signin');
    }
  },[]) // eslint-disable-line

  return (
    <AppState>
      {!auth ? (
        <Routes>
          <Route exact path='/signin' element={<SignIn setAuth={setAuth} />}/>
          <Route exact path='/signup' element={<SignUp setAuth={setAuth} />}/>
        </Routes>
      ) : (
      <>
        <Header/>
        <Navigation/>
        <Routes>
          <Route exact path='/' element={<Cliente />}/>
          <Route exact path='/bodegas' element={<Bodega />}/>
          <Route exact path='/tipos-productos-terrestres' element={<TipoProductoTerrestre />}/>
          <Route exact path='/vehiculos' element={<Vehiculo />}/>
          <Route exact path='/pedidos-terrestres' element={<PedidoTerrestre />}/>
          <Route exact path='/puertos' element={<Puerto />}/>
          <Route exact path='/tipos-productos-maritimos' element={<TipoProductoMaritimo />}/>
          <Route exact path='/flotas' element={<Flota />}/>
          <Route exact path='/pedidos-maritimos' element={<PedidoMaritimo />}/>
        </Routes>
      </>
      )}
    </AppState>
  )
}

const AppState = ({children}) => {
  return (
    <CommonProvider>
      <AuthProvider>
        <ClienteProvider>
          <BodegaProvider>
            <TipoProductoTerrestreProvider>
              <VehiculoProvider>
                <PedidoTerrestreProvider>
                  <PuertoProvider>
                    <TipoProductoMaritimoProvider>
                      <FlotaProvider>
                        <PedidoMaritimoProvider>
                          {children}
                        </PedidoMaritimoProvider>
                      </FlotaProvider>
                    </TipoProductoMaritimoProvider>
                  </PuertoProvider>
                </PedidoTerrestreProvider>
              </VehiculoProvider>
            </TipoProductoTerrestreProvider>
          </BodegaProvider>
        </ClienteProvider>
      </AuthProvider>
    </CommonProvider>
  );
}

export default App;