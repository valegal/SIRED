

import './index.css';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Datos from './pages/Datos';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/iniciar-sesion' element={<Login />}></Route>
        <Route path='/datos' element={<Datos />}></Route>

      </Routes>
    
    </BrowserRouter>
      

  );
}

export default App;
