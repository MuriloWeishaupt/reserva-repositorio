import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registra from './components/Registra';
import Reserva from './components/Reserva';
import ListaReserva from './components/ListaReserva';
import PropTypes from 'prop-types'; 
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthProvider } from './AuthContext';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
} // Lógica para verificar se usuário está autenticado.  

PrivateRoute.propTypes = { 
  element: PropTypes.element.isRequired,
} // Aqui diz que o componente PrivateRoute deve receber obrigatoriamente a propriedade 'element'. Isso foi feito para cessar os erros de "Element is missing in props validation" do ESLint.

function App() {
  const [isActive, setIsActive] = useState(true);
  const [nome, setNome] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodificaToken = jwtDecode(token);
      setNome(decodificaToken.nome);
    }
    
    let timeout;

    const resetaLogin = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem('token');
        setIsActive(false);
      }, 1 * 600 * 1000);

      window.addEventListener('mousemove', resetaLogin);
      window.addEventListener('keydown', resetaLogin);
    };

    resetaLogin();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetaLogin);
      window.removeEventListener('keydown', resetaLogin);
    };
  }, []);

  if (!isActive) {
    return <Navigate to='/login'/>;
  }

  // Toda a lógica das rotas da aplicação. Para acessar os endpoints "reservar" e "quadro-reservas", o usuário precisa estar autenticado.
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registra />} />
          <Route path="/reservar" element={<PrivateRoute element={<Reserva />} />} />
          <Route path="/quadro-reservas" element={<PrivateRoute element={<ListaReserva nome={nome} />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
