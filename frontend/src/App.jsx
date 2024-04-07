
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Datos from './pages/Datos';
import DatosPregrado from './pages/DatosPregrado';
import DatosPosgrado from './pages/DatosPosgrado';
import DatosAdmin from './pages/DatosAdmin';
import NotFound from './pages/extras/NotFound';
import ProtectedRoute from './components/utils/ProtectedRoute';
import MedicionesAdmin from './pages/administrador/MedicionesAdmin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />

          <Route path="/datos" element={<ProtectedRoute roles={['pregrado','posgrado','administrador']}><Datos /></ProtectedRoute>} />  
          <Route path="/datos/pregrado" element={<ProtectedRoute roles={['pregrado']}><DatosPregrado /></ProtectedRoute>} />
          <Route path="/datos/pregrado/mediciones" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/pregrado/indicadores" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/pregrado/equipos" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/pregrado/grupos" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />

          <Route path="/datos/posgrado" element={<ProtectedRoute roles={['posgrado']}><DatosPosgrado /></ProtectedRoute>} />
          <Route path="/datos/posgrado/mediciones" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/posgrado/indicadores" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/posgrado/equipos" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/posgrado/grupos" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />

          <Route path="/datos/administrador" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/administrador/mediciones" element={<ProtectedRoute roles={['administrador']}><MedicionesAdmin /></ProtectedRoute>} />
          <Route path="/datos/administrador/indicadores" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/administrador/equipos" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />
          <Route path="/datos/administrador/grupos" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
