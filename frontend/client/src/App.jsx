import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registra from './components/Registra';
import Reserva from './components/Reserva';
import ListaReserva from './components/ListaReserva';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registra />} />
        <Route path="/reservar" element={<Reserva />} />
        <Route path="/minhas-reservas" element={<ListaReserva />} />
      </Routes>
    </Router>
  );
}

export default App;
