import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import InicioSer from './paginas/InicioSer'
import Ruta1 from './paginas/Ruta1'
import Ruta2 from './paginas/Ruta2'
import ActualizarDatos from './paginas/ActualizarDatos'
import ListaProyectos from './paginas/ListaProyectos'
import Noticias from './paginas/Noticias'

import { AuthProvider } from './context/AuthProvider'


function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='registrar' element={<Registrar />} />
          <Route path='olvide-password' element={<OlvidePassword />} />
          <Route path='olvide-password/:token' element={<NuevoPassword />} />
          <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
        </Route>
        <Route path='/inicioSer' element={<RutaProtegida />}>
          <Route index element={<InicioSer />}/>
        </Route>
        <Route path='/ruta1' element={<RutaProtegida />}>
          <Route index element={<Ruta1 />}/>
        </Route>
        <Route path='/ruta2' element={<RutaProtegida />}>
          <Route index element={<Ruta2 />}/>
        </Route>
        <Route path='/actualizardatos' element={<RutaProtegida />}>
          <Route index element={<ActualizarDatos />}/>
        </Route>
        <Route path='/listaproyectos' element={<RutaProtegida />}>
          <Route index element={<ListaProyectos />}/>
        </Route>
        <Route path='/noticias' element={<RutaProtegida />}>
          <Route index element={<Noticias />}/>
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
