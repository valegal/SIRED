
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
          <Route path="/datos/posgrado" element={<ProtectedRoute roles={['posgrado']}><DatosPosgrado /></ProtectedRoute>} />
          <Route path="/datos/administrador" element={<ProtectedRoute roles={['administrador']}><DatosAdmin /></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
