import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registra from './components/Registra';
import Reserva from './components/Reserva';
import ListaReserva from './components/ListaReserva';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registra />} />
        <Route path="/reservar" element={<PrivateRoute element={<Reserva />} />} />
        <Route path="/quadro-reservas" element={<PrivateRoute element={<ListaReserva />} />} />
      </Routes>
    </Router>
  );
}

export default App;
